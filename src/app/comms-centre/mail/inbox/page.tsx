"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Plus, Star, Paperclip } from "lucide-react";

const MOCK_EMAILS = [
  { id: 1, from: "System Admin", subject: "Welcome to Smart Mail", date: "2026-05-17", starred: false },
  { id: 2, from: "Notifications", subject: "Your profile has been updated", date: "2026-05-16", starred: true },
];

export default function MailInboxPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Smart Mail</h1>
        <Button><Plus className="w-4 h-4 mr-2" />Compose</Button>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Inbox</CardTitle></CardHeader>
        <CardContent>
          {MOCK_EMAILS.map(email => (
            <div key={email.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b last:border-0">
              <Star className={`w-4 h-4 ${email.starred ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{email.subject}</p>
                <p className="text-xs text-slate-500">{email.from}</p>
              </div>
              <span className="text-xs text-slate-400">{email.date}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
