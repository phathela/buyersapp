import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      where: { active: true },
      include: { business: { select: { name: true, businessProfile: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ deals });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 });
  }
}
