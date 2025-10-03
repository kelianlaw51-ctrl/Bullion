import { prisma } from "@/lib/prisma";

// Server-side data fetchers (no server action directives required)
export async function getShipments() {
  try {
    const shipments = await prisma.shipment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        fromAddress: true,
        toAddress: true,
        statusUpdates: {
          orderBy: { timestamp: 'desc' },
          take: 1, // Only get the latest status update
        },
      },
    });
    return { shipments };
  } catch (error) {
    console.error("Failed to fetch shipments:", error);
    return { error: "Could not fetch shipments." };
  }
}

export async function getShipment(id: string) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: { id },
      include: {
        fromAddress: true,
        toAddress: true,
        statusUpdates: {
          orderBy: { timestamp: 'asc' },
        },
      },
    });
    if (!shipment) return { error: "Shipment not found" };
    return { shipment };
  } catch (error) {
    console.error("Failed to fetch shipment:", error);
    return { error: "Could not fetch shipment." };
  }
}
