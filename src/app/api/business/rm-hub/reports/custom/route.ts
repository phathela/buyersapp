import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function POST(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const { columns, filters, dateRange } = await req.json();

  const where: any = { businessId };
  if (filters?.department) where.department = filters.department;
  if (filters?.employmentStatus) where.employmentStatus = filters.employmentStatus;

  const employees = await prisma.employee.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const result = employees.map((emp) => {
    const row: Record<string, any> = {};
    if (columns?.includes("firstName")) row.firstName = emp.firstName;
    if (columns?.includes("lastName")) row.lastName = emp.lastName;
    if (columns?.includes("email")) row.email = emp.email;
    if (columns?.includes("position")) row.position = emp.position;
    if (columns?.includes("department")) row.department = emp.department;
    if (columns?.includes("hireDate")) row.hireDate = emp.hireDate;
    if (columns?.includes("status")) row.employmentStatus = emp.employmentStatus;
    return row;
  });

  return NextResponse.json({ columns: columns || [], rows: result, total: result.length });
}
