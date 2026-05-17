"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic } from "lucide-react";

export default function TranscribePage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-2">Transcribe</h1>
      <p className="text-slate-500 mb-6">Audio & video transcription</p>
      <Card>
        <CardContent className="py-12 text-center text-slate-500">
          <Mic className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <p>Upload audio or video files for AI transcription</p>
          <Button className="mt-4">Upload File</Button>
        </CardContent>
      </Card>
    </div>
  );
}
