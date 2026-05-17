import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("employeeId");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const where: any = { employee: { businessId } };
  if (employeeId) where.employeeId = employeeId;
  if (from || to) {
    where.clockIn = {};
    if (from) where.clockIn.gte = new Date(from);
    if (to) where.clockIn.lte = new Date(to);
  }

  const entries = await prisma.timeEntry.findMany({
    where,
    orderBy: { clockIn: "desc" },
    include: { employee: { select: { firstName: true, lastName: true } } },
  });
  return NextResponse.json(entries);
}
