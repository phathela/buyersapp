"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeartHandshake, Star, MessageSquare, ThumbsUp, ChevronRight, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackItem {
  id: string; rating: number; comment: string; category: string; createdAt: string;
  employee?: { firstName: string; lastName: string };
}

interface RecognitionItem {
  id: string; message: string; createdAt: string;
  giver?: { firstName: string; lastName: string };
  receiver?: { firstName: string; lastName: string };
}

export default function ExperiencePage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [recognitions, setRecognitions] = useState<RecognitionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/business/rm-hub/reviews").then((r) => r.json()),
      // Recognitions would need its own API; using reviews data as proxy for now
    ]).then(([reviews]) => {
      setFeedbacks(Array.isArray(reviews) ? reviews.filter((r: any) => r.status === "completed") : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const tools = [
    { label: "Pulse Surveys", desc: "Quick employee feedback and engagement surveys", icon: Star, path: "/dashboard/business/rm-hub/experience/surveys", color: "pink" },
  ];

  const COLORS: Record<string, string> = {
    pink: "border-t-pink-500 text-pink-600 bg-pink-50",
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Employee Experience</h1>
        <p className="text-sm text-slate-500">Surveys, feedback, recognition, and culture</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <Star className="w-5 h-5 text-pink-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : feedbacks.length}</p>
            <p className="text-xs text-slate-500">Completed Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <ThumbsUp className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{loading ? "—" : (feedbacks.length > 0 ? (feedbacks.reduce((s, f) => s + (f.rating || 0), 0) / feedbacks.length).toFixed(1) : "—")}</p>
            <p className="text-xs text-slate-500">Avg. Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <HeartHandshake className="w-5 h-5 text-amber-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{recognitions.length}</p>
            <p className="text-xs text-slate-500">Recognitions</p>
          </CardContent>
        </Card>
      </div>

      {/* Tools */}
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

      {/* Recent Feedback */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Feedback</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">{[1, 2].map((i) => <div key={i} className="h-16 bg-slate-100 rounded animate-pulse" />)}</div>
          ) : feedbacks.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <MessageSquare className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">No feedback yet</p>
              <p className="text-xs">Complete performance reviews to see feedback here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {feedbacks.slice(0, 5).map((fb) => (
                <div key={fb.id} className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-slate-700">{fb.employee?.firstName} {fb.employee?.lastName}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn("w-3 h-3", s <= (fb.rating || 0) ? "text-amber-400 fill-amber-400" : "text-slate-300")} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{fb.comment?.slice(0, 120)}{fb.comment?.length > 120 ? "..." : ""}</p>
                  <p className="text-xs text-slate-400 mt-1">{new Date(fb.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
