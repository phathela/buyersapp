"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Megaphone, Send } from "lucide-react";

export default function BroadcastPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Broadcast</h1>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Megaphone className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Send org-wide announcements and messages</p>
          <Button className="mt-4"><Send className="w-4 h-4 mr-2" />New Broadcast</Button>
        </CardContent>
      </Card>
    </div>
  );
}
