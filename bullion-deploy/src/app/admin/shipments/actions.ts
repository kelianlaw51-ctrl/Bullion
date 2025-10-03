"use server";

import { prisma } from "@/lib/prisma";
import { validateParcel } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customAlphabet } from 'nanoid';
import type { Prisma } from '@prisma/client';

const generateTrackingCode = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);

// Update existing shipment and addresses
export async function updateShipment(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  console.log("Form data received:", rawData);
  const id = String(rawData.id || "");
  if (!id) redirect(`/admin/shipments?error=${encodeURIComponent('Missing shipment id')}`);

  // Parse core numbers
  const weightKg = Number(rawData.weightKg);
  const l = Number(rawData.dimL) || 0;
  const w = Number(rawData.dimW) || 0;
  const h = Number(rawData.dimH) || 0;
  const dimSumM = (l + w + h) / 100;
  const amountMajor = Number(rawData.amount);
  const amountMinor = Math.round(amountMajor * 100);
  const numberOfPieces = rawData.numberOfPieces ? Number(rawData.numberOfPieces) : undefined;
  const packagingType = (rawData.packagingType as string) || undefined;
  const countryOfOrigin = (rawData.countryOfOrigin as string) || undefined;
  const pickupDate = rawData.pickupDate ? new Date(String(rawData.pickupDate)) : undefined;
  const expectedDeliveryDate = rawData.expectedDeliveryDate ? new Date(String(rawData.expectedDeliveryDate)) : undefined;

  // Crates
  let cratesJson: Array<{ l: number; w: number; h: number }> | undefined;
  if (rawData.crates && String(rawData.crates).trim().length > 0) {
    const lines = String(rawData.crates).split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
    const parsed: Array<{ l: number; w: number; h: number }> = [];
    for (const line of lines) {
      const m = line.match(/^(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)$/);
      if (!m) {
        redirect(`/admin/shipments/${id}/edit?error=${encodeURIComponent(`Invalid crate line: "${line}". Use LxWxH in cm, e.g., 120x80x100`)}`);
      }
      const cl = Number(m![1]);
      const cw = Number(m![2]);
      const ch = Number(m![3]);
      if (![cl, cw, ch].every((v) => Number.isFinite(v) && v > 0)) {
        redirect(`/admin/shipments/${id}/edit?error=${encodeURIComponent('Crate dimensions must be positive numbers.')}`);
      }
      parsed.push({ l: cl, w: cw, h: ch });
    }
    cratesJson = parsed;
  }

  const parcelErrors = validateParcel({ weightKg, dimSumM });
  if (parcelErrors.length > 0) {
    redirect(`/admin/shipments/${id}/edit?error=${encodeURIComponent(parcelErrors.join(' '))}`);
  }

  if (!rawData.fromLine1 || !rawData.fromPostcode || !rawData.fromCountry || !rawData.toLine1 || !rawData.toPostcode || !rawData.toCountry) {
    redirect(`/admin/shipments/${id}/edit?error=${encodeURIComponent('Sender and Recipient address fields are required.')}`);
  }

  if (numberOfPieces !== undefined) {
    if (!Number.isInteger(numberOfPieces) || numberOfPieces <= 0) {
      redirect(`/admin/shipments/${id}/edit?error=${encodeURIComponent('Number of pieces must be a positive integer.')}`);
    }
  }
  if (cratesJson && numberOfPieces !== undefined && cratesJson.length !== numberOfPieces) {
    redirect(`/admin/shipments/${id}/edit?error=${encodeURIComponent('Crate count does not match number of pieces.')}`);
  }
  if (pickupDate && expectedDeliveryDate && pickupDate > expectedDeliveryDate) {
    redirect(`/admin/shipments/${id}/edit?error=${encodeURIComponent('Expected delivery date must be on or after pickup date.')}`);
  }
  if (packagingType && !['CRATE', 'PALLET', 'BOX', 'OTHER'].includes(packagingType)) {
    redirect(`/admin/shipments/${id}/edit?error=${encodeURIComponent('Invalid packaging type.')}`);
  }

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Load shipment for address ids
      const current = await tx.shipment.findUnique({ where: { id }, select: { fromAddressId: true, toAddressId: true } });
      if (!current) redirect(`/admin/shipments?error=${encodeURIComponent('Shipment not found')}`);

      // Update addresses
      await tx.address.update({
        where: { id: current!.fromAddressId },
        data: {
          line1: rawData.fromLine1 as string,
          city: rawData.fromCity as string,
          postcode: rawData.fromPostcode as string,
          country: rawData.fromCountry as string,
        },
      });
      await tx.address.update({
        where: { id: current!.toAddressId },
        data: {
          line1: rawData.toLine1 as string,
          city: rawData.toCity as string,
          postcode: rawData.toPostcode as string,
          country: rawData.toCountry as string,
        },
      });

      // Handle status updates
      const updates: any[] = [];
      for (const key in rawData) {
        const match = key.match(/^updates\[(\d+)\]\[(\w+)\]$/);
        if (match) {
          const [, index, field] = match;
          const i = parseInt(index, 10);
          if (!updates[i]) updates[i] = {};
          updates[i][field] = rawData[key];
        }
      }

      // Process status updates if any exist
      let latestStatus: string | undefined;
      if (updates.length > 0) {
        for (const update of updates) {
          if (update.id && update.status && update.timestamp) {
            try {
              await tx.statusUpdate.update({
                where: { id: update.id },
                data: {
                  status: update.status as any, // Allow ON_HOLD even if not in enum
                  timestamp: new Date(update.timestamp),
                  notes: update.notes || null,
                },
              });
              console.log(`Successfully updated status update ${update.id} to ${update.status}`);
            } catch (updateError) {
              console.error(`Failed to update status update ${update.id}:`, updateError);
              // Don't throw, continue with other updates
            }
          }
        }

        // Find the latest status from updates
        const validUpdates = updates.filter(u => u.timestamp);
        if (validUpdates.length > 0) {
          latestStatus = validUpdates.reduce((latest, current) => 
            new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest
          ).status;
        }
      }

      // Update shipment
      await tx.shipment.update({
        where: { id },
        data: {
          service: rawData.service as 'same_day' | 'next_day' | 'international',
          weightKg,
          dimSumM,
          amountMinor,
          currency: rawData.currency as 'EUR' | 'USD',
          senderContactName: (rawData.senderContactName as string) || null,
          senderPhone: (rawData.senderPhone as string) || null,
          recipientContactName: (rawData.recipientContactName as string) || null,
          recipientPhone: (rawData.recipientPhone as string) || null,
          declaredValueMinor: rawData.declaredValue ? Math.round(Number(rawData.declaredValue) * 100) : null,
          declaredCurrency: (rawData.declaredCurrency as 'EUR' | 'USD') || null,
          contentsDescription: (rawData.contentsDescription as string) || null,
          hsCode: (rawData.hsCode as string) || null,
          incoterm: (rawData.incoterm as string) || null,
          shipperCompany: (rawData.shipperCompany as string) || null,
          shipperEmail: (rawData.shipperEmail as string) || null,
          shipperEori: (rawData.shipperEori as string) || null,
          consigneeCompany: (rawData.consigneeCompany as string) || null,
          consigneeEmail: (rawData.consigneeEmail as string) || null,
          consigneeEinTaxId: (rawData.consigneeEinTaxId as string) || null,
          pickupDate: pickupDate || null,
          expectedDeliveryDate: expectedDeliveryDate || null,
          numberOfPieces: numberOfPieces ?? null,
          packagingType: (packagingType as any) || null,
          countryOfOrigin: countryOfOrigin || null,
          crates: cratesJson ? (cratesJson as unknown as any) : null,
          ...(latestStatus && { status: latestStatus as any }),
        },
      });
    });
  } catch (error) {
    console.error("Failed to update shipment:", error);
    redirect(`/admin/shipments/${id}/edit?error=${encodeURIComponent('Database error: Could not update shipment.')}`);
  }

  revalidatePath(`/admin/shipments`);
  revalidatePath(`/track/[code]`, 'page');
  redirect(`/admin/shipments`);
}


// Create a new shipment
export async function createShipment(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  // 1. Prepare and validate data
  const weightKg = Number(rawData.weightKg);
  const l = Number(rawData.dimL) || 0;
  const w = Number(rawData.dimW) || 0;
  const h = Number(rawData.dimH) || 0;
  const dimSumM = (l + w + h) / 100; // cm to m
  const amountMajor = Number(rawData.amount);
  const amountMinor = Math.round(amountMajor * 100);
  const numberOfPieces = rawData.numberOfPieces ? Number(rawData.numberOfPieces) : undefined;
  const packagingType = (rawData.packagingType as string) || undefined;
  const countryOfOrigin = (rawData.countryOfOrigin as string) || undefined;

  // Dates
  const pickupDate = rawData.pickupDate ? new Date(String(rawData.pickupDate)) : undefined;
  const expectedDeliveryDate = rawData.expectedDeliveryDate ? new Date(String(rawData.expectedDeliveryDate)) : undefined;

  // Parse crates textarea lines (e.g., 120x80x100)
  let cratesJson: Array<{ l: number; w: number; h: number }> | undefined;
  if (rawData.crates && String(rawData.crates).trim().length > 0) {
    const lines = String(rawData.crates).split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
    const parsed: Array<{ l: number; w: number; h: number }> = [];
    for (const line of lines) {
      const m = line.match(/^(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)\s*[xX]\s*(\d+(?:\.\d+)?)$/);
      if (!m) {
        redirect(`/admin/shipments/new?error=${encodeURIComponent(`Invalid crate line: "${line}". Use LxWxH in cm, e.g., 120x80x100`)}`);
      }
      const cl = Number(m![1]);
      const cw = Number(m![2]);
      const ch = Number(m![3]);
      if (![cl, cw, ch].every((v) => Number.isFinite(v) && v > 0)) {
        redirect(`/admin/shipments/new?error=${encodeURIComponent('Crate dimensions must be positive numbers.')}`);
      }
      parsed.push({ l: cl, w: cw, h: ch });
    }
    cratesJson = parsed;
  }

  const parcelErrors = validateParcel({ weightKg, dimSumM });
  if (parcelErrors.length > 0) {
    redirect(`/admin/shipments/new?error=${encodeURIComponent(parcelErrors.join(' '))}`);
  }

  // Basic address validation
  if (!rawData.fromLine1 || !rawData.fromPostcode || !rawData.fromCountry || !rawData.toLine1 || !rawData.toPostcode || !rawData.toCountry) {
    redirect(`/admin/shipments/new?error=${encodeURIComponent('Sender and Recipient address fields are required.')}`);
  }

  // Additional validations
  if (numberOfPieces !== undefined) {
    if (!Number.isInteger(numberOfPieces) || numberOfPieces <= 0) {
      redirect(`/admin/shipments/new?error=${encodeURIComponent('Number of pieces must be a positive integer.')}`);
    }
  }
  if (cratesJson && numberOfPieces !== undefined && cratesJson.length !== numberOfPieces) {
    redirect(`/admin/shipments/new?error=${encodeURIComponent('Crate count does not match number of pieces.')}`);
  }
  if (pickupDate && expectedDeliveryDate && pickupDate > expectedDeliveryDate) {
    redirect(`/admin/shipments/new?error=${encodeURIComponent('Expected delivery date must be on or after pickup date.')}`);
  }
  if (packagingType && !['CRATE', 'PALLET', 'BOX', 'OTHER'].includes(packagingType)) {
    redirect(`/admin/shipments/new?error=${encodeURIComponent('Invalid packaging type.')}`);
  }

  // 2. Create records in a transaction
  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const fromAddress = await tx.address.create({
        data: {
          line1: rawData.fromLine1 as string,
          city: rawData.fromCity as string,
          postcode: rawData.fromPostcode as string,
          country: rawData.fromCountry as string,
        },
      });

      const toAddress = await tx.address.create({
        data: {
          line1: rawData.toLine1 as string,
          city: rawData.toCity as string,
          postcode: rawData.toPostcode as string,
          country: rawData.toCountry as string,
        },
      });

      await tx.shipment.create({
        data: {
          trackingCode: `BC-${generateTrackingCode()}`,
          service: rawData.service as 'same_day' | 'next_day' | 'international',
          fromAddressId: fromAddress.id,
          toAddressId: toAddress.id,
          weightKg,
          dimSumM,
          amountMinor,
          currency: rawData.currency as 'EUR' | 'USD',
          // Optional contacts
          senderContactName: (rawData.senderContactName as string) || null,
          senderPhone: (rawData.senderPhone as string) || null,
          recipientContactName: (rawData.recipientContactName as string) || null,
          recipientPhone: (rawData.recipientPhone as string) || null,
          // Optional customs
          declaredValueMinor: rawData.declaredValue ? Math.round(Number(rawData.declaredValue) * 100) : null,
          declaredCurrency: (rawData.declaredCurrency as 'EUR' | 'USD') || null,
          contentsDescription: (rawData.contentsDescription as string) || null,
          hsCode: (rawData.hsCode as string) || null,
          incoterm: (rawData.incoterm as string) || null,
          // Business details
          shipperCompany: (rawData.shipperCompany as string) || null,
          shipperEmail: (rawData.shipperEmail as string) || null,
          shipperEori: (rawData.shipperEori as string) || null,
          consigneeCompany: (rawData.consigneeCompany as string) || null,
          consigneeEmail: (rawData.consigneeEmail as string) || null,
          consigneeEinTaxId: (rawData.consigneeEinTaxId as string) || null,
          // Scheduling & packaging
          pickupDate: pickupDate || null,
          expectedDeliveryDate: expectedDeliveryDate || null,
          numberOfPieces: numberOfPieces ?? null,
          packagingType: (packagingType as any) || null,
          countryOfOrigin: countryOfOrigin || null,
          // Store parsed crate dimensions as JSON
          crates: cratesJson ? (cratesJson as unknown as any) : null,
        },
      });
    });
  } catch (error) {
    console.error("Failed to create shipment:", error);
    redirect(`/admin/shipments/new?error=${encodeURIComponent('Database error: Could not create shipment.')}`);
  }

  // 3. Revalidate and redirect
  revalidatePath("/admin/shipments");
  redirect("/admin/shipments");
}

// Delete a shipment
export async function updateShipmentStatus(shipmentId: string, status: string) {
  "use server";

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // 1. Update the shipment's current status
      await tx.shipment.update({
        where: { id: shipmentId },
        data: { status: status as any },
      });

      // 2. Log this change in the StatusUpdate table
      await tx.statusUpdate.create({
        data: {
          shipmentId,
          status: status as any,
          // notes: "Updated by admin", // Optional: Add notes later
        },
      });
    });

    revalidatePath("/admin/shipments");
    revalidatePath(`/track/[code]`); // Revalidate the public tracking page
    return { success: true };
  } catch (error) {
    console.error(`Failed to update status for shipment ${shipmentId}:`, error);
    return { error: "Database error: Could not update status." };
  }
}

export async function deleteShipment(shipmentId: string) {
  try {
    // Note: This leaves orphaned addresses. A cleanup job or more complex logic would be needed in production.
    await prisma.shipment.delete({ where: { id: shipmentId } });
    revalidatePath("/admin/shipments");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete shipment:", error);
    return { error: "Database error: Could not delete shipment." };
  }
}

export async function putShipmentOnHold(shipmentId: string, action: 'add' | 'remove') {
  "use server";

  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id: shipmentId },
      select: { id: true, status: true }
    });

    if (!shipment) {
      return { error: "Shipment not found." };
    }

    if (action === 'add') {
      // Add a special status update with HOLD marker in notes
      await prisma.statusUpdate.create({
        data: {
          shipmentId,
          status: 'IN_TRANSIT', // Use existing valid status
          notes: '⚠️ HOLD: Shipment on Hold - Requires Customs Clearance',
        },
      });
    } else {
      // Add status update to indicate hold is removed
      await prisma.statusUpdate.create({
        data: {
          shipmentId,
          status: 'IN_TRANSIT',
          notes: '✅ HOLD REMOVED: Shipment resumed',
        },
      });
    }

    revalidatePath("/admin/shipments");
    revalidatePath(`/track/[code]`, 'page');
    return { success: true };
  } catch (error) {
    console.error(`Failed to ${action} hold for shipment ${shipmentId}:`, error);
    return { error: `Database error: Could not ${action} hold status.` };
  }
}

