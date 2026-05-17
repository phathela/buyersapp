"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool } from "lucide-react";

export default function AIEditorPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-2">AI Editor</h1>
      <p className="text-slate-500 mb-6">AI-powered editing & tone adjustment</p>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <PenTool className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Edit documents with AI assistance</p>
          <Button className="mt-4">Open Editor</Button>
        </CardContent>
      </Card>
    </div>
  );
}
