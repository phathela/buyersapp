"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, Calendar, Clock, Target, Award, Loader2 } from "lucide-react";

interface EmployeeDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  employmentStatus: string;
  hireDate: string;
  createdAt: string;
  timeEntries: { id: string; clockIn: string; clockOut: string | null }[];
  goals: { id: string; title: string; status: string; endDate: string }[];
  performanceReviews: { id: string; overallRating: number; status: string; periodStart: string }[];
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  probation: "bg-amber-100 text-amber-700",
  terminated: "bg-red-100 text-red-700",
  suspended: "bg-slate-100 text-slate-600",
};

export default function EmployeeDetailPage() {
  const params = useParams();
  const [emp, setEmp] = useState<EmployeeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    fetch(`/api/business/rm-hub/employees/${params.id}`)
      .then((r) => r.json())
      .then((data) => { setEmp(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-4">
        {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />)}
      </div>
    );
  }

  if (!emp) return <div className="p-6 text-center text-slate-500">Employee not found</div>;

  return (
    <div className="p-4 md:p-6 max-w-4xl space-y-6">
      <Link href="/dashboard/business/rm-hub/employees" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Employees
      </Link>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {emp.firstName[0]}{emp.lastName[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">{emp.firstName} {emp.lastName}</h1>
                  <p className="text-sm text-slate-500">{emp.position} &middot; {emp.department}</p>
                </div>
                <Badge className={STATUS_STYLES[emp.employmentStatus]}>{emp.employmentStatus}</Badge>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{emp.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{emp.phone || "—"}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Hired {new Date(emp.hireDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Time Entries */}
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Clock className="w-4 h-4 text-slate-500" />Recent Time Entries</CardTitle></CardHeader>
          <CardContent>
            {emp.timeEntries.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No time entries yet</p>
            ) : (
              <div className="space-y-2">
                {emp.timeEntries.slice(0, 10).map((te) => (
                  <div key={te.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">{new Date(te.clockIn).toLocaleDateString()}</span>
                    <span className="text-xs text-slate-400">
                      {new Date(te.clockIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      {te.clockOut ? ` - ${new Date(te.clockOut).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : " (active)"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Target className="w-4 h-4 text-slate-500" />Goals & OKRs</CardTitle></CardHeader>
          <CardContent>
            {emp.goals.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No goals set</p>
            ) : (
              <div className="space-y-2">
                {emp.goals.map((g) => (
                  <div key={g.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-700">{g.title}</p>
                      <Badge className={g.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>{g.status}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Target: {new Date(g.endDate).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Reviews */}
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Award className="w-4 h-4 text-slate-500" />Performance Reviews</CardTitle></CardHeader>
        <CardContent>
          {emp.performanceReviews.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No reviews yet</p>
          ) : (
            <div className="space-y-2">
              {emp.performanceReviews.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{new Date(r.periodStart).toLocaleDateString()}</p>
                    <p className="text-xs text-slate-400 capitalize">{r.status}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-800">{r.overallRating || "—"}</span>
                    <span className="text-xs text-slate-400">/5</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
