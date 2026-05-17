import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET() {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const [
    totalEmployees,
    activeEmployees,
    openPositions,
    pendingTimeEntries,
    payrollRuns,
    recentApplications,
    recentReviews,
    currentMonthEntries,
  ] = await Promise.all([
    prisma.employee.count({ where: { businessId } }),
    prisma.employee.count({ where: { businessId, employmentStatus: "active" } }),
    prisma.jobPosting.count({ where: { businessId, status: "published" } }),
    prisma.timeEntry.count({ where: { clockOut: null, employee: { businessId } } }),
    prisma.payrollRun.findMany({ where: { businessId }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.application.findMany({
      where: { jobPosting: { businessId } },
      orderBy: { appliedAt: "desc" },
      take: 5,
      include: { jobPosting: { select: { title: true } } },
    }),
    prisma.performanceReview.findMany({
      where: { employee: { businessId } },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { employee: { select: { firstName: true, lastName: true } } },
    }),
    prisma.timeEntry.count({
      where: {
        clockIn: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
        employee: { businessId },
      },
    }),
  ]);

  const totalPayrollThisMonth = payrollRuns.reduce((s, r) => s + r.totalGross, 0);
  const lastMonthEmployees = await prisma.employee.count({
    where: { businessId, createdAt: { lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } },
  });
  const employeeChange = lastMonthEmployees > 0
    ? Math.round(((activeEmployees - lastMonthEmployees) / lastMonthEmployees) * 100)
    : 0;

  // Recent activity feed
  const recentActivity: any[] = [];

  if (recentApplications.length > 0) {
    recentApplications.slice(0, 2).forEach((a) => {
      recentActivity.push({
        type: "application",
        text: `${a.firstName} ${a.lastName} applied for ${a.jobPosting.title}`,
        time: a.appliedAt,
      });
    });
  }

  if (recentReviews.length > 0) {
    recentReviews.slice(0, 2).forEach((r) => {
      recentActivity.push({
        type: "review",
        text: `Review ${r.status} for ${r.employee.firstName} ${r.employee.lastName}`,
        time: r.createdAt,
      });
    });
  }

  return NextResponse.json({
    totalEmployees,
    activeEmployees,
    employeeChange,
    openPositions,
    pendingTimeEntries,
    totalPayrollThisMonth,
    currentMonthEntries,
    recentPayrollRuns: payrollRuns,
    recentActivity: recentActivity.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5),
  });
}
