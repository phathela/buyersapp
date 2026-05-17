"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequestServicePage() {
  const router = useRouter();
  useEffect(() => { router.replace("/request-service/dashboard"); }, [router]);
  return null;
}
