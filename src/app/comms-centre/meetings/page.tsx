"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, Plus } from "lucide-react";

export default function MeetingsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Meetings</h1>
        <Button><Plus className="w-4 h-4 mr-2" />Schedule Meeting</Button>
      </div>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Video className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Schedule and join video conferences</p>
        </CardContent>
      </Card>
    </div>
  );
}
