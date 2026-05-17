"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Newspaper, CloudRain, Car, TrendingUp, Shield, Plus, Filter, MapPin, Search, Globe, Loader2, Award } from "lucide-react";

const CATEGORIES = [
  { id: "breaking_news", name: "Breaking News", icon: Newspaper, color: "bg-red-500" },
  { id: "weather", name: "Weather", icon: CloudRain, color: "bg-blue-500" },
  { id: "traffic", name: "Traffic", icon: Car, color: "bg-amber-500" },
  { id: "stocks", name: "Stocks & Markets", icon: TrendingUp, color: "bg-indigo-500" },
  { id: "security", name: "Security", icon: Shield, color: "bg-slate-700" },
];

const MOCK_ALERTS = [
  { id: 1, category: "breaking_news", title: "Major Policy Announcement Expected", content: "Government set to announce new economic reforms tomorrow.", likes: 24, view_count: 156, created_at: new Date().toISOString() },
  { id: 2, category: "weather", title: "Severe Weather Warning", content: "Heavy rainfall expected in coastal regions. Take necessary precautions.", likes: 18, view_count: 89, created_at: new Date().toISOString() },
  { id: 3, category: "traffic", title: "Road Closure Alert", content: "Main highway closed due to construction. Use alternative routes.", likes: 12, view_count: 67, created_at: new Date().toISOString() },
  { id: 4, category: "stocks", title: "Market Update: Tech Stocks Rally", content: "Technology sector leads market gains with 3.2% increase.", likes: 8, view_count: 45, created_at: new Date().toISOString() },
];

export default function AlertsHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [alerts] = useState(MOCK_ALERTS);

  const IconComponent = ({ category }: { category: string }) => {
    const found = CATEGORIES.find(c => c.id === category);
    const Icon = found?.icon || Bell;
    return <Icon className="w-5 h-5" />;
  };

  const filteredAlerts = selectedCategory ? alerts.filter(a => a.category === selectedCategory) : alerts;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-['Barlow_Condensed'] text-3xl font-bold flex items-center gap-3">
              <Bell className="w-8 h-8" />
              ALERTS HUB
            </h1>
            <p className="text-blue-100 mt-1">Stay informed with personalized alerts</p>
          </div>
          <Button className="bg-white text-blue-600 hover:bg-blue-50">
            <Plus className="w-4 h-4 mr-2" />Create Alert
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition ${!selectedCategory ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-slate-800">All Alerts</p>
                    </div>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 transition ${selectedCategory === cat.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center text-white`}>
                        <IconComponent category={cat.id} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-slate-800">{cat.name}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-9">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : "All Alerts"}
                  </CardTitle>
                  <Badge variant="outline">{filteredAlerts.length} alerts</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[65vh]">
                  {filteredAlerts.length === 0 ? (
                    <div className="text-center py-12">
                      <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">No alerts found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredAlerts.map(alert => (
                        <Card key={alert.id} className="hover:shadow-md transition">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className={`w-12 h-12 rounded-lg ${CATEGORIES.find(c => c.id === alert.category)?.color} flex items-center justify-center text-white shrink-0`}>
                                <IconComponent category={alert.category} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="font-semibold text-slate-800">{alert.title}</h3>
                                    <p className="text-sm text-slate-600 mt-1">{alert.content}</p>
                                  </div>
                                  <Badge className={CATEGORIES.find(c => c.id === alert.category)?.color}>
                                    {CATEGORIES.find(c => c.id === alert.category)?.name}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-4 mt-4 pt-3 border-t text-sm text-slate-500">
                                  <span>{alert.view_count} views</span>
                                  <span>{alert.likes} likes</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
