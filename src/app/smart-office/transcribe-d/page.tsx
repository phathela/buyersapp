"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Upload, FileText, Play, Download } from "lucide-react";

export default function CallTranscriptionDPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Call Transcription D</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg">Upload Audio</CardTitle></CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center hover:border-rose-300 transition-colors cursor-pointer">
              <Mic className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 font-medium mb-1">Drop audio file here</p>
              <p className="text-xs text-slate-400 mb-4">or click to browse — MP3, WAV, M4A, up to 500MB</p>
              <Button variant="outline"><Upload className="w-4 h-4 mr-2" />Select File</Button>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-700">meeting_recording_20260517.mp3</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-slate-200 rounded"><Play className="w-4 h-4 text-slate-500" /></button>
                  <button className="p-1 hover:bg-slate-200 rounded"><Download className="w-4 h-4 text-slate-500" /></button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Transcription Output</CardTitle></CardHeader>
          <CardContent>
            <div className="bg-slate-50 rounded-lg p-4 min-h-[200px]">
              <p className="text-sm text-slate-400 italic">Upload an audio file to see the AI-generated transcription powered by Whisper and DeepSeek.</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Model: Whisper Large v3</span>
                <span className="text-slate-300">|</span>
                <span>Language: English (auto-detected)</span>
              </div>
              <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />Export</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
