"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Users, DollarSign, Shield, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface BenefitsData {
  catalog: { id: string; name: string; description: string; type: string; employerCost: number }[];
  enrollments: { id: string; benefitType: string; status: string; employee: { firstName: string; lastName: string } }[];
}

const BENEFIT_ICONS: Record<string, any> = {
  health_insurance: Shield,
  commission_plan: DollarSign,
  staff_discount: Gift,
  transport: Gift,
  meals: Gift,
};

export default function BenefitsPage() {
  const [data, setData] = useState<BenefitsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/business/rm-hub/benefits")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const activeEnrollments = data?.enrollments?.filter((e) => e.status === "active") || [];
  const byType: Record<string, number> = {};
  activeEnrollments.forEach((e) => { byType[e.benefitType] = (byType[e.benefitType] || 0) + 1; });

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Benefits</h1>
          <p className="text-sm text-slate-500">Manage benefit plans, enrollments, and staff discounts</p>
        </div>
        <Link href="/dashboard/business/rm-hub/benefits/enrollments">
          <Button variant="outline"><Plus className="w-4 h-4 mr-2" />Manage Enrollments</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <Gift className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{data?.catalog?.length || 0}</p>
            <p className="text-xs text-slate-500">Available Plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Users className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">{activeEnrollments.length}</p>
            <p className="text-xs text-slate-500">Active Enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <DollarSign className="w-5 h-5 text-amber-600 mb-2" />
            <p className="text-2xl font-bold text-slate-800">
              ${(data?.catalog?.reduce((sum, c) => sum + c.employerCost * (byType[c.type] || 0), 0) || 0).toLocaleString()}
            </p>
            <p className="text-xs text-slate-500">Monthly Cost</p>
          </CardContent>
        </Card>
      </div>

      {/* Benefit Catalog */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Benefit Plans</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data?.catalog?.map((plan) => {
              const Icon = BENEFIT_ICONS[plan.type] || Gift;
              const enrolled = byType[plan.type] || 0;
              return (
                <div key={plan.id} className="p-4 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center"><Icon className="w-4 h-4 text-blue-600" /></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 text-sm">{plan.name}</h3>
                      <p className="text-xs text-slate-500">{plan.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                    <span>${plan.employerCost}/mo per employee</span>
                    <Badge className={enrolled > 0 ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}>
                      {enrolled} enrolled
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enrollments Summary */}
      <Card>
        <CardHeader><CardTitle className="text-lg">Recent Enrollments</CardTitle></CardHeader>
        <CardContent>
          {activeEnrollments.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No active enrollments yet</p>
          ) : (
            <div className="space-y-2">
              {activeEnrollments.slice(0, 10).map((enr) => (
                <div key={enr.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-700">{enr.employee.firstName} {enr.employee.lastName}</span>
                  <span className="text-xs text-slate-500 capitalize">{enr.benefitType.replace(/_/g, " ")}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
