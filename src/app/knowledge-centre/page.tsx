"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KnowledgeCentrePage() {
  const router = useRouter();
  useEffect(() => { router.replace("/knowledge-centre/internal-matters"); }, [router]);
  return null;
}
