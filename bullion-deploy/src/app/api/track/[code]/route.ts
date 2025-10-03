import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  const code = params.code.toUpperCase();

  if (!code) {
    return NextResponse.json({ error: "Tracking code is required" }, { status: 400 });
  }

  try {
    const shipment = await prisma.shipment.findUnique({
      where: { trackingCode: code },
      select: {
        trackingCode: true,
        status: true,
        service: true,
        createdAt: true,
        expectedDeliveryDate: true,
        fromAddress: {
          select: { city: true, country: true },
        },
        toAddress: {
          select: { city: true, country: true },
        },
      },
    });

    if (!shipment) {
      return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
    }

    return NextResponse.json(shipment);
  } catch (error) {
    console.error(`Failed to fetch tracking info for ${code}:`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
