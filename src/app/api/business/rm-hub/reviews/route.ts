import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET() {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const reviews = await prisma.performanceReview.findMany({
    where: { employee: { businessId } },
    orderBy: { createdAt: "desc" },
    include: {
      employee: { select: { firstName: true, lastName: true, position: true } },
    },
  });
  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();

  const employee = await prisma.employee.findFirst({
    where: { id: data.employeeId, businessId },
  });
  if (!employee) return NextResponse.json({ error: "Employee not found" }, { status: 404 });

  const review = await prisma.performanceReview.create({
    data: {
      employeeId: data.employeeId,
      reviewerId: data.reviewerId || businessId,
      reviewTemplateId: data.reviewTemplateId,
      periodStart: new Date(data.periodStart),
      periodEnd: new Date(data.periodEnd),
      status: "pending",
    },
  });
  return NextResponse.json(review, { status: 201 });
}
