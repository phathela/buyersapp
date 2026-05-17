"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Languages } from "lucide-react";

export default function TolokyPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Toloky</h1>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Languages className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>AI interpreter & translation services</p>
        </CardContent>
      </Card>
    </div>
  );
}
