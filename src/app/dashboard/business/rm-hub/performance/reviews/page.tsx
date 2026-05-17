"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Award, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Review {
  id: string; employeeId: string; overallRating: number; strengths: string; improvements: string;
  status: string; periodStart: string; periodEnd: string; submittedAt: string | null;
  employee?: { firstName: string; lastName: string; position: string };
}

interface Employee {
  id: string; firstName: string; lastName: string; position: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [employeeId, setEmployeeId] = useState("");
  const [rating, setRating] = useState(0);
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [status, setStatus] = useState("pending");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    Promise.all([
      fetch("/api/business/rm-hub/reviews").then((r) => r.json()),
      fetch("/api/business/rm-hub/employees").then((r) => r.json()),
    ]).then(([revs, emps]) => {
      setReviews(Array.isArray(revs) ? revs : []);
      setEmployees(Array.isArray(emps) ? emps : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async () => {
    if (!employeeId) { toast.error("Select an employee"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/business/rm-hub/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          overallRating: rating || undefined,
          strengths,
          improvements,
          status,
          periodStart: new Date().toISOString(),
          periodEnd: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Review created");
      setShowForm(false);
      setEmployeeId(""); setRating(0); setStrengths(""); setImprovements(""); setStatus("pending");
      fetchData();
    } catch { toast.error("Failed to create review"); }
    setSubmitting(false);
  };

  const handleComplete = async (id: string) => {
    try {
      await fetch(`/api/business/rm-hub/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed", submittedAt: new Date().toISOString() }),
      });
      toast.success("Review completed");
      fetchData();
    } catch { toast.error("Failed to update"); }
  };

  if (loading) return <div className="p-6 space-y-4">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-slate-200 rounded-xl animate-pulse" />)}</div>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Link href="/dashboard/business/rm-hub/performance" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Performance
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Review Cycles</h1>
          <p className="text-sm text-slate-500">{reviews.length} reviews</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}><Award className="w-4 h-4 mr-2" />New Review</Button>
      </div>

      {/* New Review Form */}
      {showForm && (
        <Card>
          <CardHeader><CardTitle className="text-lg">New Performance Review</CardTitle></CardHeader>
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
              <div>
                <Label>Rating</Label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setRating(n)}
                      className={cn("w-9 h-9 rounded-full text-sm transition-all", n <= rating ? "bg-amber-100 text-amber-700 font-bold" : "bg-slate-100 text-slate-400")}>{n}</button>
                  ))}
                </div>
              </div>
              <div><Label>Strengths</Label><Textarea rows={2} value={strengths} onChange={(e) => setStrengths(e.target.value)} placeholder="Key strengths..." /></div>
              <div><Label>Areas for Improvement</Label><Textarea rows={2} value={improvements} onChange={(e) => setImprovements(e.target.value)} placeholder="Growth areas..." /></div>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : "Save Review"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review List */}
      <Card>
        <CardContent className="p-0">
          {reviews.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Award className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">No reviews yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-slate-500">
                    <th className="p-4 font-medium">Employee</th><th className="p-4 font-medium">Rating</th>
                    <th className="p-4 font-medium">Period</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr key={r.id} className="border-b last:border-0 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-700">{r.employee?.firstName} {r.employee?.lastName}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          {r.overallRating ? <><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /><span className="text-slate-700">{r.overallRating}</span></> : <span className="text-slate-400">—</span>}
                        </div>
                      </td>
                      <td className="p-4 text-slate-500">{r.periodStart ? new Date(r.periodStart).toLocaleDateString() : "—"}</td>
                      <td className="p-4"><Badge className={r.status === "completed" ? "bg-green-100 text-green-700" : r.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}>{r.status}</Badge></td>
                      <td className="p-4">
                        {r.status === "pending" && (
                          <Button variant="ghost" size="sm" onClick={() => handleComplete(r.id)}>Complete</Button>
                        )}
                      </td>
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
