import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET() {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const goals = await prisma.goal.findMany({
    where: { employee: { businessId } },
    orderBy: { createdAt: "desc" },
    include: { employee: { select: { firstName: true, lastName: true } } },
  });
  return NextResponse.json(goals);
}

export async function POST(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();

  const employee = await prisma.employee.findFirst({
    where: { id: data.employeeId, businessId },
  });
  if (!employee) return NextResponse.json({ error: "Employee not found" }, { status: 404 });

  const goal = await prisma.goal.create({
    data: {
      employeeId: data.employeeId,
      title: data.title,
      description: data.description,
      type: data.type || "individual",
      keyResults: data.keyResults || [],
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      dealMetric: data.dealMetric,
    },
  });
  return NextResponse.json(goal, { status: 201 });
}
