"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function AIAuthenticatorPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-2">AI-Authenticator</h1>
      <p className="text-slate-500 mb-6">Verify, detect & authenticate content</p>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Verify document authenticity and detect AI-generated content</p>
          <Button className="mt-4">Verify Content</Button>
        </CardContent>
      </Card>
    </div>
  );
}
