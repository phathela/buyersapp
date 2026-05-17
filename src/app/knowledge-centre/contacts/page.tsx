"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Contact, Phone, Mail, Building2 } from "lucide-react";

const CONTACTS = [
  { id: 1, name: "Dr. Thabo Mbeki", role: "Head of Research", dept: "Knowledge Management", email: "thabo.m@example.com", phone: "+27 12 345 6789" },
  { id: 2, name: "Sarah Williams", role: "Policy Analyst", dept: "Thematic Research", email: "sarah.w@example.com", phone: "+27 12 345 6790" },
  { id: 3, name: "John Dlamini", role: "Information Officer", dept: "Documentation", email: "john.d@example.com", phone: "+27 12 345 6791" },
  { id: 4, name: "Priya Patel", role: "Research Coordinator", dept: "Continental Affairs", email: "priya.p@example.com", phone: "+27 12 345 6792" },
  { id: 5, name: "Musa Nkosi", role: "Digital Archivist", dept: "Records Management", email: "musa.n@example.com", phone: "+27 12 345 6793" },
  { id: 6, name: "Grace Osei", role: "Liaison Officer", dept: "Multilaterals", email: "grace.o@example.com", phone: "+27 12 345 6794" },
];

export default function ContactsPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Contacts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONTACTS.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <Contact className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{contact.name}</p>
                  <p className="text-xs text-slate-500">{contact.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{contact.dept}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                  <span className="text-blue-600">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{contact.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
