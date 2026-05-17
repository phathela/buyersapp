"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export default function NewRequestPage() {
  const [category, setCategory] = useState("");

  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">New Service Request</h1>
      <Card className="max-w-2xl">
        <CardHeader><CardTitle className="text-lg">Submit a Request</CardTitle></CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT Support</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="office">Office Supply</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subject</Label>
              <Input placeholder="Brief description of your request" />
            </div>
            <div>
              <Label>Priority</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea rows={5} placeholder="Provide detailed information about your request..." />
            </div>
            <Button type="submit"><Send className="w-4 h-4 mr-2" />Submit Request</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
