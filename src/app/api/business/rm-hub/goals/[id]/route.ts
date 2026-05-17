import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getBusinessIdOrReject } from "@/lib/rm-hub";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error, businessId } = await getBusinessIdOrReject();
  if (error) return error;

  const data = await req.json();

  const goal = await prisma.goal.findFirst({
    where: { id: params.id, employee: { businessId } },
  });
  if (!goal) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.goal.update({
    where: { id: params.id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.progress !== undefined && { progress: data.progress }),
      ...(data.keyResults !== undefined && { keyResults: data.keyResults }),
      ...(data.endDate !== undefined && { endDate: new Date(data.endDate) }),
    },
  });
  return NextResponse.json(updated);
}
