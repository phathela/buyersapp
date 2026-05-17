"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Gift, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Employee {
  id: string; firstName: string; lastName: string; position: string;
}

interface Enrollment {
  id: string; employeeId: string; benefitType: string; status: string;
  employee?: { firstName: string; lastName: string };
}

export default function EnrollmentsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedBenefit, setSelectedBenefit] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/business/rm-hub/employees").then((r) => r.json()),
      fetch("/api/business/rm-hub/benefits").then((r) => r.json()),
    ]).then(([emps, ben]) => {
      setEmployees(Array.isArray(emps) ? emps : []);
      setEnrollments(ben.enrollments || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleEnroll = async () => {
    if (!selectedEmployee || !selectedBenefit) { toast.error("Select employee and benefit"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/business/rm-hub/benefits/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: selectedEmployee, benefitType: selectedBenefit }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Enrolled successfully");
      const updated = await fetch("/api/business/rm-hub/benefits").then((r) => r.json());
      setEnrollments(updated.enrollments || []);
      setSelectedEmployee(""); setSelectedBenefit("");
    } catch { toast.error("Enrollment failed"); }
    setSubmitting(false);
  };

  const BENEFIT_TYPES = [
    { value: "health_insurance", label: "Health Insurance" },
    { value: "commission_plan", label: "Commission Plan" },
    { value: "staff_discount", label: "Staff Discount" },
    { value: "transport", label: "Transport Allowance" },
    { value: "meals", label: "Meal Vouchers" },
  ];

  if (loading) return <div className="p-6 space-y-4">{[1, 2].map((i) => <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />)}</div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Link href="/dashboard/business/rm-hub/benefits" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Benefits
      </Link>

      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Benefit Enrollments</h1>

      {/* Enroll Form */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Enroll Employee</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <label className="text-xs text-slate-500 mb-1 block">Employee</label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                <SelectContent>
                  {employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.firstName} {e.lastName}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 w-full">
              <label className="text-xs text-slate-500 mb-1 block">Benefit Plan</label>
              <Select value={selectedBenefit} onValueChange={setSelectedBenefit}>
                <SelectTrigger><SelectValue placeholder="Select plan" /></SelectTrigger>
                <SelectContent>
                  {BENEFIT_TYPES.map((b) => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleEnroll} disabled={submitting}>
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Enrolling...</> : "Enroll"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Enrollments */}
      <Card>
        <CardHeader><CardTitle className="text-lg">All Enrollments</CardTitle></CardHeader>
        <CardContent>
          {enrollments.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No enrollments yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-slate-500">
                    <th className="pb-3 font-medium">Employee</th><th className="pb-3 font-medium">Plan</th><th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((enr) => (
                    <tr key={enr.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="py-3 font-medium text-slate-700">{enr.employee?.firstName} {enr.employee?.lastName}</td>
                      <td className="py-3 text-slate-500 capitalize">{enr.benefitType.replace(/_/g, " ")}</td>
                      <td className="py-3"><Badge className={enr.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}>{enr.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
