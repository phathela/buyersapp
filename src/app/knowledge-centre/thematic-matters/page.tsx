"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, TrendingUp, Users, Scale } from "lucide-react";

const THEMES = [
  { id: 1, title: "Economic Development", description: "GDP growth, trade agreements & investment frameworks", articles: 24, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-100" },
  { id: 2, title: "Social Affairs", description: "Healthcare, education, housing & social welfare", articles: 18, icon: Users, color: "text-pink-600", bg: "bg-pink-100" },
  { id: 3, title: "Political Governance", description: "Policy frameworks, legislative updates & governance", articles: 31, icon: Globe, color: "text-blue-600", bg: "bg-blue-100" },
  { id: 4, title: "Legal & Justice", description: "Court rulings, legal reforms & regulatory changes", articles: 12, icon: Scale, color: "text-amber-600", bg: "bg-amber-100" },
];

export default function ThematicMattersPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Thematic Matters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {THEMES.map((theme) => (
          <Card key={theme.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${theme.bg}`}>
                  <theme.icon className={`w-6 h-6 ${theme.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">{theme.title}</h3>
                  <p className="text-sm text-slate-500 mb-2">{theme.description}</p>
                  <span className="text-xs text-purple-600 font-medium">{theme.articles} articles</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
