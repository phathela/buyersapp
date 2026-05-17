"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users, Mail, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  employmentStatus: string;
  _count: { timeEntries: number; goals: number };
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  probation: "bg-amber-100 text-amber-700",
  terminated: "bg-red-100 text-red-700",
  suspended: "bg-slate-100 text-slate-600",
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");

  useEffect(() => {
    fetch("/api/business/rm-hub/employees")
      .then((r) => r.json())
      .then((data) => { setEmployees(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const departments = Array.from(new Set(employees.map((e) => e.department)));
  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();
    return (deptFilter === "all" || e.department === deptFilter) &&
      (e.firstName.toLowerCase().includes(q) || e.lastName.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.position.toLowerCase().includes(q));
  });

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />)}
        </div>
        <div className="h-64 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Employees</h1>
          <p className="text-sm text-slate-500">{employees.length} team members</p>
        </div>
        <Link href="/dashboard/business/rm-hub/employees/invite">
          <Button><Plus className="w-4 h-4 mr-2" />Add Employee</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-xl font-bold text-slate-800">{employees.filter((e) => e.employmentStatus === "active" || e.employmentStatus === "probation").length}</p>
              <p className="text-xs text-slate-500">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Mail className="w-8 h-8 text-amber-500" />
            <div>
              <p className="text-xl font-bold text-slate-800">{departments.length}</p>
              <p className="text-xs text-slate-500">Departments</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-xl font-bold text-slate-800">{employees.filter((e) => e.employmentStatus === "probation").length}</p>
              <p className="text-xs text-slate-500">On Probation</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input className="pl-9" placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 bg-white">
          <option value="all">All Departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Users className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">No employees found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-slate-500">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Position</th>
                    <th className="p-4 font-medium">Department</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp) => (
                    <tr key={emp.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                      <td className="p-4">
                        <Link href={`/dashboard/business/rm-hub/employees/${emp.id}`} className="font-medium text-slate-800 hover:text-blue-600">
                          {emp.firstName} {emp.lastName}
                        </Link>
                      </td>
                      <td className="p-4 text-slate-500">{emp.email}</td>
                      <td className="p-4 text-slate-600">{emp.position}</td>
                      <td className="p-4 text-slate-600">{emp.department}</td>
                      <td className="p-4">
                        <Badge className={STATUS_STYLES[emp.employmentStatus] || "bg-slate-100 text-slate-600"}>
                          {emp.employmentStatus}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Link href={`/dashboard/business/rm-hub/employees/${emp.id}`}>
                          <Button variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
                        </Link>
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
