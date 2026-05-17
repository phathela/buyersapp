"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Table, Loader2 } from "lucide-react";

const ALL_COLUMNS = [
  { value: "firstName", label: "First Name" },
  { value: "lastName", label: "Last Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "position", label: "Position" },
  { value: "department", label: "Department" },
  { value: "employmentStatus", label: "Status" },
  { value: "hireDate", label: "Hire Date" },
];

export default function CustomReportPage() {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(["firstName", "lastName", "position", "department", "employmentStatus"]);
  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleColumn = (col: string) => {
    setSelectedColumns((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
    setResults(null);
  };

  const generateReport = async () => {
    if (selectedColumns.length === 0) { setError("Select at least one column"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/business/rm-hub/reports/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ columns: selectedColumns }),
      });
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to generate report");
    }
    setLoading(false);
  };

  const columnLabels = Object.fromEntries(ALL_COLUMNS.map((c) => [c.value, c.label]));

  return (
    <div className="p-4 md:p-6 max-w-5xl space-y-6">
      <Link href="/dashboard/business/rm-hub/data" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Data & Reports
      </Link>

      <div>
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Custom Report Builder</h1>
        <p className="text-sm text-slate-500">Select columns and filters to build a custom employee report</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column Selector */}
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle className="text-lg">Columns</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ALL_COLUMNS.map((col) => (
                <label key={col.value} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selectedColumns.includes(col.value)}
                    onChange={() => toggleColumn(col.value)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">{col.label}</span>
                </label>
              ))}
            </div>
            <Button className="w-full mt-4" onClick={generateReport} disabled={loading || selectedColumns.length === 0}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : "Generate Report"}
            </Button>
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg flex items-center justify-between">
            <span className="flex items-center gap-2"><Table className="w-4 h-4" />Results</span>
            {results && <span className="text-sm font-normal text-slate-400">{results.length} rows</span>}
          </CardTitle></CardHeader>
          <CardContent>
            {results === null ? (
              <div className="text-center py-12 text-slate-400">
                <Table className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm">Select columns and generate your report</p>
              </div>
            ) : results.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">No results match your criteria</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-slate-500">
                      {selectedColumns.map((col) => (
                        <th key={col} className="pb-3 pr-4 font-medium whitespace-nowrap">{columnLabels[col]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                        {selectedColumns.map((col) => (
                          <td key={col} className="py-3 pr-4 text-slate-700 whitespace-nowrap">
                            {col === "hireDate" ? (row[col] ? new Date(row[col]).toLocaleDateString() : "—") : row[col] || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
