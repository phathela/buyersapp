"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, DollarSign, CreditCard, TrendingUp, TrendingDown } from "lucide-react";

const ACCOUNTS = [
  { label: "Cash on Hand", value: "R450,000", change: "+R25K", up: true },
  { label: "Accounts Receivable", value: "R1,200,000", change: "-R80K", up: false },
  { label: "Accounts Payable", value: "R680,000", change: "+R45K", up: true },
  { label: "Net Profit (MTD)", value: "R320,000", change: "+12%", up: true },
];

const TRANSACTIONS = [
  { id: "TXN-001", desc: "Client Payment - ABC Corp", debit: "", credit: "R150,000", date: "2026-05-17" },
  { id: "TXN-002", desc: "Supplier Invoice - TechCo", debit: "R45,000", credit: "", date: "2026-05-16" },
  { id: "TXN-003", desc: "Payroll Processing", debit: "R280,000", credit: "", date: "2026-05-15" },
  { id: "TXN-004", desc: "Service Revenue - XYZ Ltd", debit: "", credit: "R95,000", date: "2026-05-14" },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Finance</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {ACCOUNTS.map((a) => (
          <Card key={a.label}>
            <CardContent className="p-4">
              <p className="text-xs text-slate-500 mb-1">{a.label}</p>
              <p className="text-xl font-bold text-slate-800">{a.value}</p>
              <span className={`text-xs flex items-center gap-1 ${a.up ? 'text-green-600' : 'text-red-600'}`}>
                {a.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {a.change}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Transactions</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">Debit</th>
                  <th className="pb-3 font-medium">Credit</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((txn) => (
                  <tr key={txn.id} className="border-b last:border-0">
                    <td className="py-3 text-slate-500">{txn.id}</td>
                    <td className="py-3 text-slate-800">{txn.desc}</td>
                    <td className="py-3 text-red-600">{txn.debit || "-"}</td>
                    <td className="py-3 text-green-600">{txn.credit || "-"}</td>
                    <td className="py-3 text-slate-500">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
