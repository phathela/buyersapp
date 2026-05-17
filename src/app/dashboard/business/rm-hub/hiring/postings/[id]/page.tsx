"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react";
import Link from "next/link";

const MOCK_JOBS: Record<string, any> = {
  "1": {
    id: "1", title: "Senior Deal Negotiator", description: "We're looking for an experienced negotiator to manage high-value marketplace deals. You'll work with top vendors to secure the best pricing for our platform.",
    requirements: "5+ years in deal negotiation\nProven track record of closing deals\nExcellent communication skills\nExperience with CRM tools",
    location: "Sandton, Johannesburg", dealCategory: "Services", status: "published",
    applicants: [
      { id: "a1", name: "Alice M.", status: "interview", email: "alice@example.com" },
      { id: "a2", name: "Bob K.", status: "screening", email: "bob@example.com" },
    ],
  },
};

export default function JobPostingDetailPage() {
  const params = useParams();
  const job = MOCK_JOBS[params.id as string];

  if (!job) return <div className="p-6 text-center text-slate-500">Job not found</div>;

  return (
    <div className="p-4 md:p-6 max-w-4xl">
      <Link href="/dashboard/business/rm-hub/hiring" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Hiring
      </Link>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-1">{job.title}</h1>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{job.applicants.length} applicants</span>
          </div>
        </div>
        <Badge className={job.status === "published" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}>
          {job.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Description</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-slate-700 whitespace-pre-line">{job.description}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Requirements</CardTitle></CardHeader>
          <CardContent><p className="text-sm text-slate-700 whitespace-pre-line">{job.requirements}</p></CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle className="text-lg">Applicants ({job.applicants.length})</CardTitle></CardHeader>
        <CardContent>
          {job.applicants.map((a: any) => (
            <div key={a.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border-b last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-800">{a.name}</p>
                <p className="text-xs text-slate-500">{a.email}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${
                a.status === "interview" ? "bg-amber-100 text-amber-700" :
                a.status === "screening" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
              }`}>{a.status}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
