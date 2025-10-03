"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getRates() {
  try {
    const rates = await prisma.rate.findMany({
      orderBy: { service: 'asc' },
    });
    return { rates };
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    return { error: "Could not fetch rates." };
  }
}

export async function upsertRate(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const service = rawData.service as string;
  const rateMajor = Number(rawData.rate);
  const rateMinor = Math.round(rateMajor * 100);
  const currency = rawData.currency as string;

  if (!service || !rateMajor || !currency) {
    return { error: "Service, Rate, and Currency are required." };
  }

  try {
    await prisma.rate.upsert({
      where: { service },
      update: { rateMinor, currency: currency as any },
      create: { service: service as any, rateMinor, currency: currency as any },
    });
    revalidatePath("/admin/rates");
    return { success: true };
  } catch (error) {
    console.error(`Failed to upsert rate for ${service}:`, error);
    return { error: "Database error: Could not save rate." };
  }
}
