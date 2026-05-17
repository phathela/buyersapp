import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const job = await prisma.jobPosting.findFirst({
    where: { id: params.id, businessId },
    include: {
      applications: { orderBy: { appliedAt: "desc" } },
    },
  });
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(job);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();
  await prisma.jobPosting.updateMany({
    where: { id: params.id, businessId },
    data: {
      ...data,
      closesAt: data.closesAt ? new Date(data.closesAt) : undefined,
    },
  });
  return NextResponse.json({ success: true });
}
