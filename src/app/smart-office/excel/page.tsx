"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table2 } from "lucide-react";

export default function PowerExcelPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-2">Power Excel</h1>
      <p className="text-slate-500 mb-6">AI-powered spreadsheet assistant</p>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Table2 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Upload or create spreadsheets with AI assistance</p>
          <Button className="mt-4">Upload Spreadsheet</Button>
        </CardContent>
      </Card>
    </div>
  );
}
