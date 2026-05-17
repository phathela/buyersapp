"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus } from "lucide-react";

export default function GroupChatPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Group Chat</h1>
        <Button><Plus className="w-4 h-4 mr-2" />New Group</Button>
      </div>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Users className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Create or join group conversations</p>
        </CardContent>
      </Card>
    </div>
  );
}
