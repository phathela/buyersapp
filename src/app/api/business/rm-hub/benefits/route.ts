import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

const BENEFIT_CATALOG = [
  { type: "health_insurance", name: "Health Insurance", defaultEmployerCost: 500, defaultEmployeeCost: 150 },
  { type: "commission_plan", name: "Commission Plan", defaultEmployerCost: 0, defaultEmployeeCost: 0 },
  { type: "staff_discount", name: "Staff Discount", defaultEmployerCost: 0, defaultEmployeeCost: 0 },
  { type: "transport", name: "Transportation Allowance", defaultEmployerCost: 200, defaultEmployeeCost: 0 },
  { type: "meals", name: "Meal Vouchers", defaultEmployerCost: 100, defaultEmployeeCost: 0 },
];

export async function GET() {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const enrollments = await prisma.benefitsEnrollment.findMany({
    where: { employee: { businessId } },
    include: { employee: { select: { firstName: true, lastName: true } } },
  });

  return NextResponse.json({
    catalog: BENEFIT_CATALOG,
    enrollments,
  });
}
