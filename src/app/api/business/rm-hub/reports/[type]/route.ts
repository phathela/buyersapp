import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET(req: NextRequest, { params }: { params: { type: string } }) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const { type } = params;

  switch (type) {
    case "headcount": {
      const employees = await prisma.employee.findMany({ where: { businessId } });
      const active = employees.filter((e) => e.employmentStatus === "active").length;
      const byDepartment = employees.reduce((acc: Record<string, number>, e) => {
        const dept = e.department || "Unassigned";
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
      }, {});
      return NextResponse.json({ total: employees.length, active, byDepartment });
    }

    case "turnover": {
      const total = await prisma.employee.count({ where: { businessId } });
      const terminated = await prisma.employee.count({
        where: { businessId, employmentStatus: "terminated", terminationDate: { not: null } },
      });
      const rate = total > 0 ? (terminated / total) * 100 : 0;
      return NextResponse.json({ total, terminated, turnoverRate: Math.round(rate * 100) / 100 });
    }

    case "payroll": {
      const payrollRuns = await prisma.payrollRun.findMany({
        where: { businessId },
        orderBy: { createdAt: "desc" },
      });
      const totalGross = payrollRuns.reduce((s, r) => s + r.totalGross, 0);
      const totalNet = payrollRuns.reduce((s, r) => s + r.totalNet, 0);
      return NextResponse.json({ runs: payrollRuns.length, totalGross, totalNet, lastRun: payrollRuns[0] || null });
    }

    case "benefits": {
      const enrollments = await prisma.benefitsEnrollment.findMany({
        where: { employee: { businessId } },
        include: { employee: { select: { firstName: true, lastName: true } } },
      });
      const totalCost = enrollments.reduce((s, e) => s + e.costToEmployer, 0);
      const byType = enrollments.reduce((acc: Record<string, number>, e) => {
        acc[e.benefitType] = (acc[e.benefitType] || 0) + 1;
        return acc;
      }, {});
      return NextResponse.json({ total: enrollments.length, totalCost, byType });
    }

    default:
      return NextResponse.json({ error: "Unknown report type" }, { status: 400 });
  }
}
