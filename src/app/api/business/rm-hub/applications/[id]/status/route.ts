import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const { status } = await req.json();
  const validStatuses = ["applied", "screening", "interview", "offer", "hired", "rejected"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const application = await prisma.application.findFirst({
    where: { id: params.id, jobPosting: { businessId } },
    include: { jobPosting: true },
  });
  if (!application) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.application.update({
    where: { id: params.id },
    data: { status },
  });

  // If hired, auto-create employee
  if (status === "hired") {
    await prisma.employee.create({
      data: {
        businessId,
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        phone: application.phone,
        position: application.jobPosting.title,
        hireDate: new Date(),
      },
    });
  }

  return NextResponse.json({ success: true });
}
