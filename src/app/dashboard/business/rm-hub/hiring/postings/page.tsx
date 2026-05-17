"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function NewJobPostingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [dealCategory, setDealCategory] = useState("");
  const [status, setStatus] = useState("draft");

  const handleSave = () => {
    toast.success(status === "published" ? "Job posted successfully!" : "Draft saved");
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl">
      <Link href="/dashboard/business/rm-hub/hiring" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" />Back to Hiring
      </Link>
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">New Job Posting</h1>
      <Card>
        <CardHeader><CardTitle className="text-lg">Job Details</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div><Label>Job Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Senior Deal Negotiator" /></div>
            <div><Label>Description</Label><Textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the role and responsibilities..." /></div>
            <div><Label>Requirements</Label><Textarea rows={3} value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="List key requirements and qualifications..." /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Location</Label><Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Remote / Office location" /></div>
              <div><Label>Deal Category</Label>
                <Select value={dealCategory} onValueChange={setDealCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food & Drink</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="health">Health & Fitness</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <Button onClick={() => { setStatus("published"); handleSave(); }}><Send className="w-4 h-4 mr-2" />Publish</Button>
              <Button variant="outline" onClick={() => { setStatus("draft"); handleSave(); }}><Save className="w-4 h-4 mr-2" />Save Draft</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
