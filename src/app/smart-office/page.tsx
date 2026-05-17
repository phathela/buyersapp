"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SmartOfficePage() {
  const router = useRouter();
  useEffect(() => { router.replace("/smart-office/files"); }, [router]);
  return null;
}
