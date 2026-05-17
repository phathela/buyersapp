"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBarChart, Plus, FileText, Download, Loader2 } from "lucide-react";

export default function SmartFilesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Reports Generator</h1>
          <p className="text-slate-500">AI-powered reports & document intelligence</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" />New Report</Button>
      </div>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <FileBarChart className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Generate AI-powered reports from your data</p>
          <Button className="mt-4" variant="outline">Create Your First Report</Button>
        </CardContent>
      </Card>
    </div>
  );
}
