"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Target, CheckCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewSummary {
  id: string; overallRating: number; status: string; periodStart: string;
  employee?: { firstName: string; lastName: string };
}

interface GoalSummary {
  id: string; title: string; status: string; targetDate: string;
  employee?: { firstName: string; lastName: string };
}

export default function PerformancePage() {
  const [reviews, setReviews] = useState<ReviewSummary[]>([]);
  const [goals, setGoals] = useState<GoalSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/business/rm-hub/reviews").then((r) => r.json()),
      fetch("/api/business/rm-hub/goals").then((r) => r.json()),
    ]).then(([revs, gls]) => {
      setReviews(Array.isArray(revs) ? revs : []);
      setGoals(Array.isArray(gls) ? gls : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const pendingReviews = reviews.filter((r) => r.status === "pending");
  const completedGoals = goals.filter((g) => g.status === "completed");

  const tools = [
    { label: "Review Cycles", desc: "Performance reviews and 360 feedback", icon: Award, path: "/dashboard/business/rm-hub/performance/reviews", color: "purple" },
    { label: "Goals & OKRs", desc: "Set and track employee goals and key results", icon: Target, path: "/dashboard/business/rm-hub/performance/goals", color: "blue" },
  ];

  const COLORS: Record<string, string> = {
    purple: "border-t-purple-500 text-purple-600 bg-purple-50",
    blue: "border-t-blue-500 text-blue-600 bg-blue-50",
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Performance Management</h1>
        <p className="text-sm text-slate-500">Reviews, OKRs, and 360 feedback</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <Award className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : reviews.length}</p>
            <p className="text-xs text-slate-500">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <CheckCircle className="w-5 h-5 text-amber-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : pendingReviews.length}</p>
            <p className="text-xs text-slate-500">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Target className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : completedGoals.length}</p>
            <p className="text-xs text-slate-500">Completed Goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Tool Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const c = COLORS[tool.color];
          return (
            <Link key={tool.label} href={tool.path}
              className={cn("block bg-white border border-slate-200 border-t-2 rounded-xl p-5 hover:shadow-md transition-all group", c.split(" ")[0])}>
              <div className="flex items-start justify-between mb-3">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", c.split(" ")[2])}>
                  <Icon className={cn("w-5 h-5", c.split(" ")[1])} />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1">{tool.label}</h3>
              <p className="text-xs text-slate-500">{tool.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Recent Reviews */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Reviews</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">{[1, 2].map((i) => <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />)}</div>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No reviews yet</p>
          ) : (
            <div className="space-y-2">
              {reviews.slice(0, 5).map((r) => (
                <div key={r.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{r.employee?.firstName} {r.employee?.lastName}</p>
                    <p className="text-xs text-slate-400">{new Date(r.periodStart).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {r.overallRating ? <span className="text-sm font-bold text-slate-800">{r.overallRating}/5</span> : null}
                    <Badge className={r.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}>{r.status}</Badge>
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
