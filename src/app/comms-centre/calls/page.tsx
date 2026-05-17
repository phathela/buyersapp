"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, PhoneCall } from "lucide-react";

export default function CallsPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Calls</h1>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Phone className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Voice & video calling</p>
          <Button className="mt-4"><PhoneCall className="w-4 h-4 mr-2" />Start a Call</Button>
        </CardContent>
      </Card>
    </div>
  );
}
