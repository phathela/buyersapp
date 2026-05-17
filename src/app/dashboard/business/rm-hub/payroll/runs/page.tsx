"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, DollarSign, Calendar, Download } from "lucide-react";

interface PayrollRun {
  id: string;
  periodStart: string;
  periodEnd: string;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  status: string;
  employeeCount: number;
  createdAt: string;
}

export default function PayrollRunsPage() {
  const [runs, setRuns] = useState<PayrollRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/business/rm-hub/reports/payroll")
      .then((r) => r.json())
      .then((data) => { setRuns(data.runs || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Link href="/dashboard/business/rm-hub/payroll" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Payroll & Time
      </Link>

      <div>
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Payroll Runs</h1>
        <p className="text-sm text-slate-500">Payroll processing history and details</p>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-slate-200 rounded-xl animate-pulse" />)}</div>
      ) : runs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-slate-400">
            <DollarSign className="w-10 h-10 mx-auto mb-2" />
            <p className="text-sm">No payroll runs yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {runs.map((run) => (
            <Card key={run.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {new Date(run.periodStart).toLocaleDateString()} — {new Date(run.periodEnd).toLocaleDateString()}
                    </h3>
                    <p className="text-xs text-slate-400">{run.employeeCount} employees</p>
                  </div>
                  <Badge className={
                    run.status === "completed" ? "bg-green-100 text-green-700" :
                    run.status === "processing" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                  }>{run.status}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Gross</p>
                    <p className="font-semibold text-slate-800">${run.totalGross?.toLocaleString() || 0}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Deductions</p>
                    <p className="font-semibold text-slate-800">${run.totalDeductions?.toLocaleString() || 0}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Net</p>
                    <p className="font-semibold text-green-700">${run.totalNet?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
