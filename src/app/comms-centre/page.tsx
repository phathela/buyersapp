"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CommsCentrePage() {
  const router = useRouter();
  useEffect(() => { router.replace("/comms-centre/chat"); }, [router]);
  return null;
}
