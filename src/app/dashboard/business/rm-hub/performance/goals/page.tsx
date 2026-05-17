"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Target, Plus, Loader2, CheckCircle, Circle } from "lucide-react";
import { toast } from "sonner";

interface Goal {
  id: string; title: string; description: string; status: string; startDate: string; endDate: string;
  keyResults: any; dealMetric: string | null;
  employee?: { firstName: string; lastName: string };
}

interface Employee {
  id: string; firstName: string; lastName: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [krs, setKrs] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    Promise.all([
      fetch("/api/business/rm-hub/goals").then((r) => r.json()),
      fetch("/api/business/rm-hub/employees").then((r) => r.json()),
    ]).then(([gls, emps]) => {
      setGoals(Array.isArray(gls) ? gls : []);
      setEmployees(Array.isArray(emps) ? emps : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    if (!title || !employeeId) { toast.error("Title and employee required"); return; }
    setSubmitting(true);
    try {
      const parsedKrs = krs ? krs.split("\n").filter(Boolean).map((k) => ({ title: k, target: 100, current: 0 })) : [];
      const res = await fetch("/api/business/rm-hub/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId, title, description,
          endDate: endDate || undefined,
          keyResults: parsedKrs.length > 0 ? parsedKrs : undefined,
          startDate: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Goal created!");
      setShowForm(false);
      setEmployeeId(""); setTitle(""); setDescription(""); setEndDate(""); setKrs("");
      fetchData();
    } catch { toast.error("Failed to create goal"); }
    setSubmitting(false);
  };

  const toggleStatus = async (goal: Goal) => {
    const newStatus = goal.status === "completed" ? "active" : "completed";
    try {
      await fetch(`/api/business/rm-hub/goals/${goal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchData();
    } catch { toast.error("Failed to update"); }
  };

  if (loading) return <div className="p-6 space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-slate-200 rounded-xl animate-pulse" />)}</div>;

  // Group goals by employee
  const grouped: Record<string, Goal[]> = {};
  goals.forEach((g) => {
    const key = g.employee ? `${g.employee.firstName} ${g.employee.lastName}` : "Unassigned";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(g);
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Link href="/dashboard/business/rm-hub/performance" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Performance
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Goals & OKRs</h1>
          <p className="text-sm text-slate-500">{goals.length} total goals</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}><Plus className="w-4 h-4 mr-2" />New Goal</Button>
      </div>

      {/* New Goal Form */}
      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Create Goal</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-lg">
              <div><Label>Employee</Label>
                <Select value={employeeId} onValueChange={setEmployeeId}>
                  <SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  <SelectContent>
                    {employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.firstName} {e.lastName}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Goal Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Increase deal conversion rate" /></div>
              <div><Label>Description</Label><Textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the goal..." /></div>
              <div><Label>Target Date</Label><Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
              <div><Label>Key Results (one per line)</Label><Textarea rows={3} value={krs} onChange={(e) => setKrs(e.target.value)} placeholder="Achieve 95% satisfaction rate&#10;Close 20+ deals per quarter" /></div>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : "Create Goal"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals by Employee */}
      {Object.entries(grouped).length === 0 ? (
        <Card>
          <CardContent className="text-center py-12 text-slate-400">
            <Target className="w-10 h-10 mx-auto mb-2" />
            <p className="text-sm">No goals set yet</p>
          </CardContent>
        </Card>
      ) : (
        Object.entries(grouped).map(([name, employeeGoals]) => (
          <Card key={name}>
            <CardHeader><CardTitle className="text-lg">{name}</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {employeeGoals.map((g) => (
                  <div key={g.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <button onClick={() => toggleStatus(g)} className="mt-0.5">
                      {g.status === "completed" ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-slate-300" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-slate-700">{g.title}</p>
                        <Badge className={g.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}>{g.status}</Badge>
                      </div>
                      {g.description && <p className="text-xs text-slate-500 mt-1">{g.description}</p>}
                      {g.endDate && <p className="text-xs text-slate-400 mt-1">Target: {new Date(g.endDate).toLocaleDateString()}</p>}
                      {g.keyResults && Array.isArray(g.keyResults) && g.keyResults.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {g.keyResults.map((kr: any, i: number) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              <span>{kr.title || kr}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
