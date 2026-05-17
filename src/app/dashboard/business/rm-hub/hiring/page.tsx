"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Plus, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOCK_POSTINGS = [
  { id: "1", title: "Senior Deal Negotiator", dept: "Sales", status: "published", applicants: 8, created: "2026-05-01" },
  { id: "2", title: "Logistics Coordinator", dept: "Operations", status: "published", applicants: 5, created: "2026-05-05" },
  { id: "3", title: "Customer Success Manager", dept: "Support", status: "draft", applicants: 0, created: "2026-05-10" },
  { id: "4", title: "Marketing Specialist", dept: "Marketing", status: "closed", applicants: 12, created: "2026-04-15" },
];

export default function HiringPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Hiring & Onboarding</h1>
          <p className="text-sm text-slate-500">Manage job postings, applications, and new hire onboarding</p>
        </div>
        <Link href="/dashboard/business/rm-hub/hiring/postings">
          <Button><Plus className="w-4 h-4 mr-2" />New Posting</Button>
        </Link>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardContent className="p-4 flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-blue-500" />
          <div><p className="text-xl font-bold text-slate-800">2</p><p className="text-xs text-slate-500">Active Postings</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3">
          <Eye className="w-8 h-8 text-green-500" />
          <div><p className="text-xl font-bold text-slate-800">25</p><p className="text-xs text-slate-500">Total Applicants</p></div>
        </CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3">
          <MoreHorizontal className="w-8 h-8 text-amber-500" />
          <div><p className="text-xl font-bold text-slate-800">3</p><p className="text-xs text-slate-500">In Pipeline</p></div>
        </CardContent></Card>
      </div>

      {/* Job Postings */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Job Postings</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b text-left text-slate-500">
                <th className="pb-3 font-medium">Title</th><th className="pb-3 font-medium">Dept</th>
                <th className="pb-3 font-medium">Status</th><th className="pb-3 font-medium">Applicants</th>
                <th className="pb-3 font-medium">Created</th><th className="pb-3 font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {MOCK_POSTINGS.map((job) => (
                  <tr key={job.id} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-800">{job.title}</td>
                    <td className="py-3 text-slate-500">{job.dept}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        job.status === "published" ? "bg-green-100 text-green-700" :
                        job.status === "draft" ? "bg-slate-100 text-slate-600" : "bg-red-100 text-red-700"
                      }`}>{job.status}</span>
                    </td>
                    <td className="py-3 text-slate-800">{job.applicants}</td>
                    <td className="py-3 text-slate-500">{job.created}</td>
                    <td className="py-3">
                      <Link href={`/dashboard/business/rm-hub/hiring/postings/${job.id}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                      <Link href="/dashboard/business/rm-hub/hiring/applications">
                        <Button variant="ghost" size="sm">Candidates</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ATS Kanban Preview */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Application Pipeline</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { stage: "Applied", count: 12, color: "bg-slate-500" },
              { stage: "Screening", count: 5, color: "bg-blue-500" },
              { stage: "Interview", count: 3, color: "bg-amber-500" },
              { stage: "Offer", count: 2, color: "bg-purple-500" },
              { stage: "Hired", count: 1, color: "bg-green-500" },
              { stage: "Rejected", count: 4, color: "bg-red-500" },
            ].map((s) => (
              <Link key={s.stage} href="/dashboard/business/rm-hub/hiring/applications"
                className="bg-slate-50 rounded-lg p-3 text-center hover:shadow-sm transition-shadow cursor-pointer">
                <div className={cn("w-3 h-3 rounded-full mx-auto mb-1", s.color)} />
                <p className="text-lg font-bold text-slate-800">{s.count}</p>
                <p className="text-xs text-slate-500">{s.stage}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { cn } from "@/lib/utils";
