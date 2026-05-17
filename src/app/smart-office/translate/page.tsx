"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Languages, ArrowRight } from "lucide-react";

export default function TranslatePage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-2">Translate</h1>
      <p className="text-slate-500 mb-6">Document & text translation</p>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Languages className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Translate documents between multiple languages</p>
          <Button className="mt-4">Start Translation</Button>
        </CardContent>
      </Card>
    </div>
  );
}
