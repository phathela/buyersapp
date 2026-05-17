import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET() {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const employees = await prisma.employee.findMany({
    where: { businessId },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { timeEntries: true, goals: true } } },
  });
  return NextResponse.json(employees);
}

export async function POST(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();
  const employee = await prisma.employee.create({
    data: {
      businessId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      position: data.position,
      department: data.department,
      hireDate: new Date(data.hireDate),
      employmentStatus: data.employmentStatus || "active",
    },
  });
  return NextResponse.json(employee, { status: 201 });
}
