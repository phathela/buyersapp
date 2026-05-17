import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./db";
import { NextResponse } from "next/server";

export async function getBusinessId() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).userType !== "business") {
    return null;
  }
  return (session.user as any).id;
}

export async function requireBusiness() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if ((session.user as any).userType !== "business") {
    return NextResponse.json({ error: "Business account required" }, { status: 403 });
  }
  return null;
}

export async function getBusinessIdOrReject() {
  const businessId = await getBusinessId();
  if (!businessId) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), businessId: null };
  }
  return { error: null, businessId };
}
