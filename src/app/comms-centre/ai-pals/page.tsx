"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bot } from "lucide-react";

export default function AIPalsPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">AI Pals</h1>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Bot className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Communication analytics and AI assistants</p>
        </CardContent>
      </Card>
    </div>
  );
}
