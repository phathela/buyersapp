import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET() {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const applications = await prisma.application.findMany({
    where: { jobPosting: { businessId } },
    orderBy: { appliedAt: "desc" },
    include: { jobPosting: { select: { title: true } } },
  });
  return NextResponse.json(applications);
}

export async function POST(req: NextRequest) {
  const { error, businessId: _businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();
  const application = await prisma.application.create({
    data: {
      jobPostingId: data.jobPostingId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      resumeUrl: data.resumeUrl,
      coverLetter: data.coverLetter,
    },
  });
  return NextResponse.json(application, { status: 201 });
}
