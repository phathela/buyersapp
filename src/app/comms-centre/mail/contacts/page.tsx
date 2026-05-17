"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact, User } from "lucide-react";

const MOCK_CONTACTS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Manager" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Developer" },
];

export default function MailContactsPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Contacts</h1>
      <Card>
        <CardHeader><CardTitle className="text-lg">All Contacts</CardTitle></CardHeader>
        <CardContent>
          {MOCK_CONTACTS.map(contact => (
            <div key={contact.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"><User className="w-5 h-5 text-slate-500" /></div>
              <div><p className="text-sm font-medium text-slate-800">{contact.name}</p><p className="text-xs text-slate-500">{contact.email}</p></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
