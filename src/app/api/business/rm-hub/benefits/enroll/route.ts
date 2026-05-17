import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function POST(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();

  const employee = await prisma.employee.findFirst({
    where: { id: data.employeeId, businessId },
  });
  if (!employee) return NextResponse.json({ error: "Employee not found" }, { status: 404 });

  const enrollment = await prisma.benefitsEnrollment.create({
    data: {
      employeeId: data.employeeId,
      benefitType: data.benefitType,
      coverageLevel: data.coverageLevel,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      costToEmployee: data.costToEmployee || 0,
      costToEmployer: data.costToEmployer || 0,
    },
  });
  return NextResponse.json(enrollment, { status: 201 });
}
