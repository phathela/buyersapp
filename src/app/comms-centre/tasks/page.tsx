"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Plus, Circle, Flag } from "lucide-react";

const MOCK_TASKS = [
  { id: 1, title: "Review quarterly report", priority: "high", due: "2026-05-20" },
  { id: 2, title: "Update team on project status", priority: "medium", due: "2026-05-22" },
  { id: 3, title: "Prepare presentation slides", priority: "low", due: "2026-05-25" },
];

export default function TasksPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Tasks Manager</h1>
        <Button><Plus className="w-4 h-4 mr-2" />New Task</Button>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">My Tasks</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_TASKS.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Circle className="w-4 h-4 text-slate-300" />
                  <span className="text-sm text-slate-800">{task.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${task.priority === 'high' ? 'bg-red-100 text-red-600' : task.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>{task.priority}</span>
                  <span className="text-xs text-slate-400">{task.due}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
