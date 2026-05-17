"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, BarChart3, RefreshCw } from "lucide-react";

interface ReportData {
  type: string;
  data: any;
  generatedAt: string;
}

const REPORT_LABELS: Record<string, string> = {
  headcount: "Headcount",
  turnover: "Turnover",
  payroll: "Payroll",
  benefits: "Benefits",
};

function ReportsContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "headcount";
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/business/rm-hub/reports/${type}`)
      .then((r) => r.json())
      .then((data) => { setReport({ type, data, generatedAt: new Date().toISOString() }); setLoading(false); })
      .catch(() => setLoading(false));
  }, [type]);

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-6">
      <Link href="/dashboard/business/rm-hub/data" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Data & Reports
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">{REPORT_LABELS[type] || type} Report</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}><RefreshCw className="w-4 h-4 mr-1" />Refresh</Button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(REPORT_LABELS).map(([key, label]) => (
          <Link key={key} href={`/dashboard/business/rm-hub/data/reports?type=${key}`}>
            <Button variant={type === key ? "default" : "outline"} size="sm">{label}</Button>
          </Link>
        ))}
      </div>

      {/* Report Content */}
      <Card>
        <CardHeader><CardTitle className="text-lg capitalize">{type} Report</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />)}
            </div>
          ) : report?.data ? (
            <div className="space-y-4">
              {/* Headcount */}
              {type === "headcount" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-700">{report.data.total || 0}</p>
                    <p className="text-xs text-blue-600">Total</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-700">{report.data.active || 0}</p>
                    <p className="text-xs text-green-600">Active</p>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-amber-700">{report.data.byDepartment ? Object.keys(report.data.byDepartment).length : 0}</p>
                    <p className="text-xs text-amber-600">Departments</p>
                  </div>
                </div>
              )}

              {/* Turnover */}
              {type === "turnover" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg text-center">
                    <p className="text-3xl font-bold text-red-700">{report.data.rate || 0}%</p>
                    <p className="text-xs text-red-600">Turnover Rate ({report.data.period || "current"})</p>
                  </div>
                  <Card>
                    <CardContent className="p-4 text-sm text-slate-600">
                      <p>Turnover measures the rate at which employees leave the organization over a given period.</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Payroll */}
              {type === "payroll" && report.data.runs?.map((run: any) => (
                <div key={run.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{new Date(run.periodStart).toLocaleDateString()} - {new Date(run.periodEnd).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-400 capitalize">{run.status}</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">${run.totalGross?.toLocaleString() || 0}</p>
                </div>
              ))}

              {/* Benefits */}
              {type === "benefits" && report.data.enrollments?.length > 0 && (
                <table className="w-full text-sm">
                  <thead><tr className="border-b text-left text-slate-500">
                    <th className="pb-2 font-medium">Type</th><th className="pb-2 font-medium">Employee</th><th className="pb-2 font-medium">Status</th>
                  </tr></thead>
                  <tbody>
                    {report.data.enrollments.map((enr: any) => (
                      <tr key={enr.id} className="border-b last:border-0">
                        <td className="py-2 text-slate-700 capitalize">{enr.benefitType.replace(/_/g, " ")}</td>
                        <td className="py-2 text-slate-500">{enr.employee?.firstName} {enr.employee?.lastName}</td>
                        <td className="py-2"><Badge className={enr.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}>{enr.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {!report.data && <p className="text-sm text-slate-400 text-center py-8">No data available for this report</p>}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-8">No data available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="p-6"><div className="h-64 bg-slate-200 rounded-xl animate-pulse" /></div>}>
      <ReportsContent />
    </Suspense>
  );
}
