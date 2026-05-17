import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lng = parseFloat(searchParams.get("lng") || "0");
  const radius = parseInt(searchParams.get("radius") || "50");
  const category = searchParams.get("category");

  try {
    const where: any = { active: true };
    if (category) where.category = category;

    const deals = await prisma.deal.findMany({
      where,
      include: { business: { select: { name: true, businessProfile: true } } },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    // Simulate distance calculation for MVP
    const dealsWithDistance = deals.map((deal) => ({
      ...deal,
      distance: Math.random() * radius,
    }));

    return NextResponse.json({ deals: dealsWithDistance });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 });
  }
}
