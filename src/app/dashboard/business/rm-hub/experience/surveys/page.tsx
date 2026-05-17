"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Star, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

const QUICK_SURVEYS = [
  { id: "engagement", question: "How engaged do you feel at work this week?", emoji: "⭐" },
  { id: "wellbeing", question: "How would you rate your wellbeing this week?", emoji: "💚" },
  { id: "workload", question: "How manageable is your current workload?", emoji: "📋" },
];

export default function SurveysPage() {
  const [selectedSurvey, setSelectedSurvey] = useState("engagement");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!rating) { toast.error("Please select a rating"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/business/rm-hub/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: employeeId || undefined,
          overallRating: rating,
          strengths: comment,
          periodStart: new Date().toISOString(),
          periodEnd: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Survey response submitted!");
      setRating(0); setComment(""); setEmployeeId("");
    } catch { toast.error("Failed to submit"); }
    setSubmitting(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl space-y-6">
      <Link href="/dashboard/business/rm-hub/experience" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Experience
      </Link>

      <div>
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Pulse Surveys</h1>
        <p className="text-sm text-slate-500">Quick employee feedback and engagement surveys</p>
      </div>

      {/* Quick Survey Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {QUICK_SURVEYS.map((s) => (
          <button key={s.id} onClick={() => setSelectedSurvey(s.id)}
            className={`text-left p-4 rounded-xl border-2 transition-all ${selectedSurvey === s.id ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
            <p className="text-2xl mb-2">{s.emoji}</p>
            <p className="text-sm font-medium text-slate-700">{s.question}</p>
          </button>
        ))}
      </div>

      {/* Survey Form */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Your Response</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              <div className="flex items-center gap-2 mt-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setRating(n)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${n <= rating ? "bg-amber-100 text-amber-600 scale-110" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Comments (optional)</Label>
              <Textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your thoughts..." />
            </div>
            <Button onClick={handleSubmit} disabled={submitting}>
              <Send className="w-4 h-4 mr-2" />{submitting ? "Submitting..." : "Submit Response"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
