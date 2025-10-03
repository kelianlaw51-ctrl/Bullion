import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const service = String(body.service || "");
    const sender = String(body.sender || "");
    const recipient = String(body.recipient || "");
    const pickupDate = body.pickupDate ? new Date(String(body.pickupDate)) : null;
    const pickupTime = String(body.pickupTime || "");
    const weightKg = Number(body.weightKg || 0);
    const dimSumM = body.dimSumM !== undefined ? Number(body.dimSumM) : null;
    const notes = body.notes ? String(body.notes) : null;

    if (!service || !sender || !recipient || !pickupDate || !pickupTime) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!Number.isFinite(weightKg) || weightKg <= 0) {
      return NextResponse.json({ error: "weightKg must be a positive number." }, { status: 400 });
    }

    const created = await prisma.pickupRequest.create({
      data: {
        service: service as any,
        sender,
        recipient,
        pickupDate,
        pickupTime,
        weightKg,
        dimSumM: dimSumM ?? undefined,
        notes: notes ?? undefined,
      },
      select: { id: true, status: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, request: created });
  } catch (err) {
    console.error("Pickup request API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
