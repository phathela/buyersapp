import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function POST(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const { employeeId } = await req.json();

  const openEntry = await prisma.timeEntry.findFirst({
    where: { employeeId, clockOut: null, employee: { businessId } },
    orderBy: { clockIn: "desc" },
  });
  if (!openEntry) return NextResponse.json({ error: "No open time entry" }, { status: 400 });

  const updated = await prisma.timeEntry.update({
    where: { id: openEntry.id },
    data: { clockOut: new Date() },
  });
  return NextResponse.json(updated);
}
