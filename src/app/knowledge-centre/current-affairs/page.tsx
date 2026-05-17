"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Clock, Tag } from "lucide-react";

const ARTICLES = [
  { id: 1, title: "New Trade Agreement Signed with EU", category: "Politics", source: "Reuters", time: "2h ago", summary: "Landmark trade deal expected to boost exports by 15% over the next fiscal year." },
  { id: 2, title: "Central Bank Holds Interest Rate Steady", category: "Economy", source: "Bloomberg", time: "4h ago", summary: "Benchmark rate remains at 7.5% as inflation shows signs of moderating." },
  { id: 3, title: "Tech Summit 2026 Kicks Off in Cape Town", category: "Technology", source: "TechCrunch", time: "6h ago", summary: "Over 5,000 delegates gather for Africa's largest technology conference." },
  { id: 4, title: "Infrastructure Development Plan Announced", category: "Development", source: "APA News", time: "8h ago", summary: "$2.5 billion allocated for transport, energy and water infrastructure projects." },
  { id: 5, title: "Climate Summit Reaches New Emissions Target", category: "Environment", source: "AFP", time: "12h ago", summary: "195 nations agree to reduce carbon emissions by 45% by 2035." },
  { id: 6, title: "Healthcare Reform Bill Passes Parliament", category: "Health", source: "BBC", time: "1d ago", summary: "Universal healthcare coverage expansion approved in historic parliamentary vote." },
];

export default function CurrentAffairsPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Current Affairs</h1>
      <div className="grid gap-4">
        {ARTICLES.map((article) => (
          <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Newspaper className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">{article.category}</span>
                    <span className="text-xs text-slate-400">{article.source}</span>
                  </div>
                  <h3 className="font-medium text-slate-800">{article.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{article.summary}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">{article.time}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
