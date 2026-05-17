"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, Send, User, Sparkles } from "lucide-react";

const SUGGESTIONS = [
  "Show me the Q2 financial summary",
  "What's my current inventory turnover ratio?",
  "List overdue supplier invoices",
  "Generate a production status report",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<{role: string; text: string}[]>([
    { role: "ai", text: "Hello! I'm your ERP assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setMessages((prev) => [...prev, { role: "ai", text: `I've received your query about "${input}". In a production environment, I would connect to your ERP system and fetch the relevant data.` }]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">AI Assistant</h1>
      <Card className="max-w-3xl">
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Bot className="w-5 h-5 text-indigo-500" />ERP Copilot</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-start gap-3 ${msg.role === "user" ? "" : ""}`}>
                <div className={`p-2 rounded-full ${msg.role === "ai" ? "bg-indigo-100" : "bg-slate-100"}`}>
                  {msg.role === "ai" ? <Bot className="w-4 h-4 text-indigo-600" /> : <User className="w-4 h-4 text-slate-600" />}
                </div>
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.role === "ai" ? "bg-indigo-50 text-slate-800" : "bg-slate-100 text-slate-800"}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} onClick={() => { setMessages((prev) => [...prev, { role: "user", text: s }]); }} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />{s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your ERP data..." onKeyDown={(e) => e.key === "Enter" && handleSend()} />
            <Button onClick={handleSend}><Send className="w-4 h-4" /></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
