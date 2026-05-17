import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET() {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const jobs = await prisma.jobPosting.findMany({
    where: { businessId },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();
  const job = await prisma.jobPosting.create({
    data: {
      businessId,
      title: data.title,
      description: data.description,
      requirements: data.requirements,
      location: data.location,
      dealCategory: data.dealCategory,
      status: data.status || "draft",
      closesAt: data.closesAt ? new Date(data.closesAt) : null,
    },
  });
  return NextResponse.json(job, { status: 201 });
}
