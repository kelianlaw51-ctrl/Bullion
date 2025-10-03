import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Simple estimator: flat rate per service from Rate table
// Optional surcharge: +1 unit per kg over 20kg
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const service = String(body.service || "");
    const weightKg = Number(body.weightKg || 0);
    const currencyPref = (body.currency as string | undefined) ?? undefined;

    if (!service) {
      return NextResponse.json({ error: "Service is required" }, { status: 400 });
    }
    if (!Number.isFinite(weightKg) || weightKg <= 0) {
      return NextResponse.json({ error: "Valid weightKg is required" }, { status: 400 });
    }

    // Fetch base rate
    const rate = await prisma.rate.findUnique({ where: { service: service as any } });
    if (!rate) {
      return NextResponse.json({ error: `No rate configured for service: ${service}` }, { status: 404 });
    }

    let amountMinor = rate.rateMinor;

    // Simple weight surcharge rule
    const overweight = Math.max(0, Math.ceil(weightKg - 20));
    amountMinor += overweight * 100; // +1.00 per kg over 20

    const currency = currencyPref ?? rate.currency;

    return NextResponse.json({
      price: {
        amount_minor: amountMinor,
        currency,
      },
      service,
      notes: overweight > 0 ? `Includes overweight surcharge for ${overweight} kg over 20kg.` : undefined,
    });
  } catch (error) {
    console.error("Quote estimate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
