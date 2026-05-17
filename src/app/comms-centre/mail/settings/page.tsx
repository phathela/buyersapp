"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Mail, Bell, Shield } from "lucide-react";

export default function MailSettingsPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Mail Settings</h1>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Settings className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Configure email preferences and notification settings</p>
        </CardContent>
      </Card>
    </div>
  );
}
