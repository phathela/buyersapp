"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, FileSearch, FileCheck } from "lucide-react";

const DOCUMENTS = [
  { id: 1, name: "Annual Report 2025.pdf", category: "Reports", size: "4.2 MB", status: "Processed", date: "2026-05-15" },
  { id: 2, name: "Supplier Contract - ABC Corp.docx", category: "Contracts", size: "1.8 MB", status: "Processing", date: "2026-05-14" },
  { id: 3, name: "Invoice Batch May 2026.pdf", category: "Invoices", size: "8.5 MB", status: "Processed", date: "2026-05-13" },
  { id: 4, name: "Compliance Certificate 2026.pdf", category: "Compliance", size: "0.6 MB", status: "Failed", date: "2026-05-12" },
  { id: 5, name: "Board Minutes - May.pdf", category: "Minutes", size: "1.2 MB", status: "Processed", date: "2026-05-11" },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Documents</h1>
        <Button><Upload className="w-4 h-4 mr-2" />Upload Document</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3"><FileText className="w-8 h-8 text-indigo-500" /><div><p className="text-xl font-bold text-slate-800">45</p><p className="text-xs text-slate-500">Total Documents</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><FileSearch className="w-8 h-8 text-green-500" /><div><p className="text-xl font-bold text-slate-800">38</p><p className="text-xs text-slate-500">AI Processed</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><FileCheck className="w-8 h-8 text-amber-500" /><div><p className="text-xl font-bold text-slate-800">92%</p><p className="text-xs text-slate-500">Extraction Rate</p></div></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">AI Document Processing</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {DOCUMENTS.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">{doc.category}</span>
                      <span className="text-xs text-slate-300">|</span>
                      <span className="text-xs text-slate-400">{doc.size}</span>
                      <span className="text-xs text-slate-300">|</span>
                      <span className="text-xs text-slate-400">{doc.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  doc.status === "Processed" ? "bg-green-100 text-green-700" :
                  doc.status === "Processing" ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                }`}>{doc.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
