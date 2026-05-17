"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Tag, Building2, Percent } from "lucide-react";
import Link from "next/link";

const MOCK_DEALS: Record<string, { title: string; business: string; description: string; discount: string; location: string; category: string; expires: string; image: string }> = {
  "1": { title: "50% Off Premium Coffee Beans", business: "Bean & Brew", description: "Enjoy 50% off our premium imported coffee beans. Limited stock available. Perfect for home brewing enthusiasts. Our beans are sourced directly from small farms in Colombia, Ethiopia, and Brazil, ensuring the highest quality and freshness.", discount: "50%", location: "Sandton, Johannesburg", category: "Food & Drink", expires: "2026-06-15", image: "" },
  "2": { title: "Free 1-Month Gym Membership", business: "FitLife SA", description: "Sign up for any annual plan and get your first month completely free. State-of-the-art equipment, group classes, and personal training included.", discount: "Free Month", location: "Century City, Cape Town", category: "Health & Fitness", expires: "2026-06-30", image: "" },
  "3": { title: "30% Off Cloud Storage Plans", business: "DataVault", description: "Secure cloud storage for your business. Get 30% off annual plans. Includes 24/7 support, end-to-end encryption, and team collaboration features.", discount: "30%", location: "Online", category: "Technology", expires: "2026-05-31", image: "" },
};

export default function DealDetailPage() {
  const params = useParams();
  const [deal, setDeal] = useState<typeof MOCK_DEALS[string] | null>(null);

  useEffect(() => {
    if (params?.id) setDeal(MOCK_DEALS[params.id as string] ?? null);
  }, [params?.id]);

  if (!deal) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center py-20">
        <p className="text-slate-500">Deal not found</p>
        <Link href="/"><Button variant="outline" className="mt-4">Back Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/dashboard" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Dashboard
      </Link>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="font-['Barlow_Condensed'] text-3xl font-bold text-slate-800 mb-2">{deal.title}</h1>
              <div className="flex items-center gap-2 text-slate-500">
                <Building2 className="w-4 h-4" />
                <span>{deal.business}</span>
              </div>
            </div>
            <Badge className="text-lg px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 border-0">{deal.discount}</Badge>
          </div>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-slate-500">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{deal.location}</span>
            <span className="flex items-center gap-1"><Tag className="w-4 h-4" />{deal.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />Expires: {deal.expires}</span>
          </div>

          <p className="text-slate-700 mb-6 leading-relaxed">{deal.description}</p>

          <div className="flex gap-3">
            <Button className="flex-1">Claim This Deal</Button>
            <Button variant="outline">Contact Business</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
