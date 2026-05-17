"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, DollarSign, TrendingUp, Users, Plus, Loader2, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Compensation {
  id: string; employeeId: string; type: string; amount: number; currency: string; effectiveDate: string; approvalStatus: string;
  employee?: { firstName: string; lastName: string; position: string; department: string };
}

interface SalaryBand {
  id: string; role: string; level: string; minSalary: number; midSalary: number; maxSalary: number;
}

interface Employee {
  id: string; firstName: string; lastName: string; position: string;
}

export default function CompensationPage() {
  const [comps, setComps] = useState<Compensation[]>([]);
  const [bands, setBands] = useState<SalaryBand[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [type, setCompType] = useState("salary");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    Promise.all([
      fetch("/api/business/rm-hub/compensation").then((r) => r.json()),
      fetch("/api/business/rm-hub/employees").then((r) => r.json()),
    ]).then(([compData, emps]) => {
      setComps(compData.compensations || []);
      setBands(compData.salaryBands || []);
      setEmployees(Array.isArray(emps) ? emps : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    if (!employeeId || !amount) { toast.error("Employee and salary required"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/business/rm-hub/compensation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, type, amount: parseFloat(amount), currency, effectiveDate: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Compensation record created");
      setShowForm(false);
      setEmployeeId(""); setAmount(""); setCompType("salary"); setCurrency("USD");
      fetchData();
    } catch { toast.error("Failed to create"); }
    setSubmitting(false);
  };

  const totalPayroll = comps.reduce((s, c) => s + (c.approvalStatus === "approved" ? c.amount : 0), 0);

  if (loading) return <div className="p-6 space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-slate-200 rounded-xl animate-pulse" />)}</div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Compensation</h1>
          <p className="text-sm text-slate-500">Salary bands, commissions, and reward management</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/business/rm-hub/compensation/bands">
            <Button variant="outline"><TrendingUp className="w-4 h-4 mr-2" />Salary Bands</Button>
          </Link>
          <Button onClick={() => setShowForm(!showForm)}><Plus className="w-4 h-4 mr-2" />Add Compensation</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <DollarSign className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">${totalPayroll.toLocaleString()}</p>
            <p className="text-xs text-slate-500">Total Annual Salary</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Users className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{comps.length}</p>
            <p className="text-xs text-slate-500">Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <TrendingUp className="w-5 h-5 text-amber-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{bands.length}</p>
            <p className="text-xs text-slate-500">Salary Bands</p>
          </CardContent>
        </Card>
      </div>

      {/* New Compensation Form */}
      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-lg">New Compensation Record</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-md">
              <div><Label>Employee</Label>
                <Select value={employeeId} onValueChange={setEmployeeId}>
                  <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  <SelectContent>
                    {employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.firstName} {e.lastName}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Type</Label>
                <Select value={type} onValueChange={setCompType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="bonus">Bonus</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="equity">Equity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Amount (annual)</Label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 75000" /></div>
              <div><Label>Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="ZAR">ZAR (R)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compensation Table */}
      <Card>
        <CardContent className="p-0">
          {comps.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <DollarSign className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">No compensation records yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-slate-500">
                    <th className="p-4 font-medium">Employee</th><th className="p-4 font-medium">Position</th>
                    <th className="p-4 font-medium">Base Salary</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium">Effective</th>
                  </tr>
                </thead>
                <tbody>
                  {comps.map((c) => (
                    <tr key={c.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-700">{c.employee?.firstName} {c.employee?.lastName}</td>
                      <td className="p-4 text-slate-500">{c.employee?.position || "—"}</td>
                      <td className="p-4 font-semibold text-slate-800">{c.currency} {c.amount?.toLocaleString()}</td>
                      <td className="p-4"><Badge className={c.approvalStatus === "approved" ? "bg-green-100 text-green-700" : c.approvalStatus === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}>{c.approvalStatus}</Badge></td>
                      <td className="p-4 text-slate-500">{c.effectiveDate ? new Date(c.effectiveDate).toLocaleDateString() : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Salary Bands Summary */}
      {bands.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Salary Bands</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bands.map((b) => (
                <div key={b.id} className="p-3 border border-slate-200 rounded-lg">
                  <p className="text-sm font-medium text-slate-700">{b.role} — {b.level}</p>
                  <p className="text-xs text-slate-500 mt-1">${b.minSalary?.toLocaleString()} — ${b.maxSalary?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
