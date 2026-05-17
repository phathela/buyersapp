import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET() {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const compensations = await prisma.compensation.findMany({
    where: { employee: { businessId } },
    orderBy: { createdAt: "desc" },
    include: { employee: { select: { firstName: true, lastName: true, position: true } } },
  });
  const salaryBands = await prisma.salaryBand.findMany({ where: { businessId } });
  return NextResponse.json({ compensations, salaryBands });
}

export async function POST(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();

  const employee = await prisma.employee.findFirst({
    where: { id: data.employeeId, businessId },
  });
  if (!employee) return NextResponse.json({ error: "Employee not found" }, { status: 404 });

  const compensation = await prisma.compensation.create({
    data: {
      employeeId: data.employeeId,
      type: data.type,
      amount: data.amount,
      currency: data.currency || "USD",
      effectiveDate: new Date(data.effectiveDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      reason: data.reason,
      approvalStatus: "pending",
    },
  });
  return NextResponse.json(compensation, { status: 201 });
}
