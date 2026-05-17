"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Send, User } from "lucide-react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-4">Chat</h1>
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center"><User className="w-4 h-4 text-violet-600" /></div>
              <div className="bg-slate-100 rounded-lg p-3 max-w-md"><p className="text-sm text-slate-800">Welcome to Comms Centre! Start chatting with your team.</p></div>
            </div>
          </div>
          <div className="p-4 border-t flex gap-2">
            <Input placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button><Send className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
