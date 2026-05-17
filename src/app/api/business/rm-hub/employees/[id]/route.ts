import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const employee = await prisma.employee.findFirst({
    where: { id: params.id, businessId },
    include: {
      timeEntries: { orderBy: { clockIn: "desc" }, take: 20 },
      goals: { orderBy: { createdAt: "desc" } },
      benefitsEnrollments: true,
      compensations: true,
      performanceReviews: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!employee) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(employee);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();
  const employee = await prisma.employee.updateMany({
    where: { id: params.id, businessId },
    data,
  });
  if (employee.count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  await prisma.employee.deleteMany({ where: { id: params.id, businessId } });
  return NextResponse.json({ success: true });
}
