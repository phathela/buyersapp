import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();
  const employee = await prisma.employee.findFirst({
    where: { businessId, performanceReviews: { some: { id: params.id } } },
  });
  if (!employee) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updateData: any = {};
  if (data.overallRating !== undefined) updateData.overallRating = data.overallRating;
  if (data.strengths !== undefined) updateData.strengths = data.strengths;
  if (data.improvements !== undefined) updateData.improvements = data.improvements;
  if (data.goalsAchieved !== undefined) updateData.goalsAchieved = data.goalsAchieved;
  if (data.status) {
    updateData.status = data.status;
    if (data.status === "completed") updateData.submittedAt = new Date();
  }

  await prisma.performanceReview.update({ where: { id: params.id }, data: updateData });
  return NextResponse.json({ success: true });
}
