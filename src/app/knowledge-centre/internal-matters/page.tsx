"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";

const DOCUMENTS = [
  { id: 1, title: "Standard Operating Procedures v4.2", category: "SOP", updated: "2026-05-10", type: "PDF" },
  { id: 2, title: "Employee Onboarding Form 2026", category: "Form", updated: "2026-05-01", type: "DOCX" },
  { id: 3, title: "Data Protection Policy", category: "Policy", updated: "2026-04-28", type: "PDF" },
  { id: 4, title: "Leave Request Form", category: "Form", updated: "2026-04-15", type: "DOCX" },
  { id: 5, title: "Procurement Policy v3.0", category: "Policy", updated: "2026-04-10", type: "PDF" },
  { id: 6, title: "IT Security Guidelines", category: "SOP", updated: "2026-04-05", type: "PDF" },
];

export default function InternalMattersPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Internal Matters</h1>
      <div className="grid gap-4">
        {DOCUMENTS.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-cyan-600" />
                <div>
                  <p className="font-medium text-slate-800">{doc.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">{doc.category}</span>
                    <span className="text-xs text-slate-400">{doc.updated}</span>
                    <span className="text-xs text-slate-400">{doc.type}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg"><Eye className="w-4 h-4 text-slate-500" /></button>
                <button className="p-2 hover:bg-slate-100 rounded-lg"><Download className="w-4 h-4 text-slate-500" /></button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
