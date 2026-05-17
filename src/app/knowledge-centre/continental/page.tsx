"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Earth, Globe } from "lucide-react";

const REGIONS = [
  { id: 1, name: "Africa", description: "African Union, AfCFTA, Regional Economic Communities", countries: 54, icon: Earth, color: "text-amber-600", bg: "bg-amber-100" },
  { id: 2, name: "Europe", description: "EU, EFTA, bilateral trade & political relations", countries: 44, icon: Globe, color: "text-blue-600", bg: "bg-blue-100" },
  { id: 3, name: "Asia", description: "ASEAN, SAARC, Middle East & Far East partnerships", countries: 48, icon: Globe, color: "text-red-600", bg: "bg-red-100" },
  { id: 4, name: "Americas", description: "US, Canada, Latin America & Caribbean relations", countries: 35, icon: Globe, color: "text-green-600", bg: "bg-green-100" },
  { id: 5, name: "Oceania", description: "Australia, New Zealand & Pacific Island states", countries: 14, icon: Globe, color: "text-cyan-600", bg: "bg-cyan-100" },
];

export default function ContinentalPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Continental</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REGIONS.map((region) => (
          <Card key={region.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className={`w-12 h-12 ${region.bg} rounded-xl flex items-center justify-center mb-3`}>
                <region.icon className={`w-6 h-6 ${region.color}`} />
              </div>
              <h3 className="font-semibold text-slate-800">{region.name}</h3>
              <p className="text-sm text-slate-500 mt-1 mb-2">{region.description}</p>
              <span className="text-xs font-medium text-amber-600">{region.countries} countries</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
