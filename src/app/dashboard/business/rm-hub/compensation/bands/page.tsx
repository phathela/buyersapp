"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Loader2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface SalaryBand {
  id: string; role: string; level: string; minSalary: number; midSalary: number; maxSalary: number;
}

export default function SalaryBandsPage() {
  const [bands, setBands] = useState<SalaryBand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [submitting, setSubmitting] = useState(false);

  const fetchBands = () => {
    fetch("/api/business/rm-hub/compensation")
      .then((r) => r.json())
      .then((data) => { setBands(data.salaryBands || []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchBands(); }, []);

  const handleSubmit = async () => {
    if (!role || !level || !minSalary || !maxSalary) { toast.error("All fields required"); return; }
    if (parseFloat(minSalary) >= parseFloat(maxSalary)) { toast.error("Min must be less than max"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/business/rm-hub/compensation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: "system",
          type: "salary",
          amount: 0,
          currency,
          effectiveDate: new Date().toISOString(),
          salaryBand: { role, level, minSalary: parseFloat(minSalary), maxSalary: parseFloat(maxSalary) },
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Salary band created");
      setShowForm(false);
      setRole(""); setLevel(""); setMinSalary(""); setMaxSalary(""); setCurrency("USD");
      fetchBands();
      fetchBands();
    } catch { toast.error("Failed to create salary band"); }
    setSubmitting(false);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Link href="/dashboard/business/rm-hub/compensation" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Compensation
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Salary Bands</h1>
          <p className="text-sm text-slate-500">Define salary ranges by position and department</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="w-4 h-4 mr-2" />New Band</Button>
      </div>

      {/* New Band Form */}
      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Create Salary Band</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-md">
              <div><Label>Position Title</Label><Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Senior Engineer" /></div>
              <div><Label>Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Min Salary</Label><Input type="number" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} placeholder="50000" /></div>
                <div><Label>Max Salary</Label><Input type="number" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} placeholder="120000" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "Create Band"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Band List */}
      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-slate-200 rounded-xl animate-pulse" />)}</div>
      ) : bands.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-slate-400">
            <TrendingUp className="w-10 h-10 mx-auto mb-2" />
            <p className="text-sm">No salary bands defined yet</p>
            <p className="text-xs">Create bands to establish salary ranges for positions</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bands.map((b) => (
            <Card key={b.id}>
              <CardContent className="p-5">
                <h3 className="font-semibold text-slate-800 text-sm">{b.role} — {b.level}</h3>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 bg-slate-100 rounded-full h-2.5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 text-sm">
                  <span className="text-slate-500">${b.minSalary?.toLocaleString()}</span>
                  <span className="text-slate-500">${b.maxSalary?.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
