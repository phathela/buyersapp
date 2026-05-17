"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Handshake, Building2, Landmark, Shield } from "lucide-react";

const ORGANIZATIONS = [
  { id: 1, name: "United Nations", acronym: "UN", description: "Peace, security, human rights & development", members: 193, icon: Globe, color: "text-blue-600", bg: "bg-blue-100" },
  { id: 2, name: "African Union", acronym: "AU", description: "Continental integration & development agenda", members: 55, icon: Earth, color: "text-green-600", bg: "bg-green-100" },
  { id: 3, name: "European Union", acronym: "EU", description: "Economic & political union of European states", members: 27, icon: Building2, color: "text-indigo-600", bg: "bg-indigo-100" },
  { id: 4, name: "BRICS", acronym: "BRICS", description: "Major emerging economies cooperation", members: 9, icon: Landmark, color: "text-amber-600", bg: "bg-amber-100" },
  { id: 5, name: "World Trade Organization", acronym: "WTO", description: "Global trade rules & dispute resolution", members: 164, icon: Handshake, color: "text-teal-600", bg: "bg-teal-100" },
  { id: 6, name: "North Atlantic Treaty Org.", acronym: "NATO", description: "Collective security & defense alliance", members: 32, icon: Shield, color: "text-slate-600", bg: "bg-slate-100" },
];

import { Globe, Earth } from "lucide-react";

export default function MultilateralsPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Multilaterals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ORGANIZATIONS.map((org) => (
          <Card key={org.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${org.bg} rounded-lg flex items-center justify-center`}>
                  <org.icon className={`w-5 h-5 ${org.color}`} />
                </div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{org.acronym}</span>
              </div>
              <h3 className="font-semibold text-slate-800">{org.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{org.description}</p>
              <span className="text-xs text-slate-400 mt-2 block">{org.members} member states</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
