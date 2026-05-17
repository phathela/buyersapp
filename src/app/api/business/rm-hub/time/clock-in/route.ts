import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function POST(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const { employeeId, locationLat, locationLng, dealId } = await req.json();

  const employee = await prisma.employee.findFirst({
    where: { id: employeeId, businessId },
  });
  if (!employee) return NextResponse.json({ error: "Employee not found" }, { status: 404 });

  const entry = await prisma.timeEntry.create({
    data: {
      employeeId,
      clockIn: new Date(),
      locationLat,
      locationLng,
      dealId,
    },
  });
  return NextResponse.json(entry, { status: 201 });
}
