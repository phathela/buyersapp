"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Play, StopCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface TimeEntry {
  id: string;
  employeeId: string;
  clockIn: string;
  clockOut: string | null;
  employee: { firstName: string; lastName: string };
}

export default function TimesheetsPage() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [clockingIn, setClockingIn] = useState<string | null>(null);

  const fetchEntries = () => {
    setLoading(true);
    fetch("/api/business/rm-hub/time/entries")
      .then((r) => r.json())
      .then((data) => { setEntries(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchEntries(); }, []);

  const activeEntries = entries.filter((e) => !e.clockOut);
  const completedEntries = entries.filter((e) => e.clockOut);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Link href="/dashboard/business/rm-hub/payroll" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Payroll & Time
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Timesheets</h1>
          <p className="text-sm text-slate-500">{activeEntries.length} active, {completedEntries.length} completed today</p>
        </div>
        <Button variant="outline" onClick={fetchEntries}><Clock className="w-4 h-4 mr-2" />Refresh</Button>
      </div>

      {/* Active Clocks */}
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Play className="w-4 h-4 text-green-500" />Active Clocks</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-20 bg-slate-100 rounded animate-pulse" />
          ) : activeEntries.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No active clocks right now</p>
          ) : (
            <div className="space-y-2">
              {activeEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{entry.employee.firstName} {entry.employee.lastName}</p>
                    <p className="text-xs text-slate-500">Started {new Date(entry.clockIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 animate-pulse">Active</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Time Entries</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />)}</div>
          ) : completedEntries.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No completed entries yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-slate-500">
                    <th className="pb-3 font-medium">Employee</th><th className="pb-3 font-medium">Clock In</th>
                    <th className="pb-3 font-medium">Clock Out</th><th className="pb-3 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {completedEntries.slice(0, 50).map((entry) => {
                    const start = new Date(entry.clockIn);
                    const end = new Date(entry.clockOut!);
                    const hours = ((end.getTime() - start.getTime()) / 3600000).toFixed(1);
                    return (
                      <tr key={entry.id} className="border-b last:border-0 hover:bg-slate-50">
                        <td className="py-3 font-medium text-slate-700">{entry.employee.firstName} {entry.employee.lastName}</td>
                        <td className="py-3 text-slate-500">{start.toLocaleDateString()} {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                        <td className="py-3 text-slate-500">{end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                        <td className="py-3 text-slate-700 font-medium">{hours}h</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
