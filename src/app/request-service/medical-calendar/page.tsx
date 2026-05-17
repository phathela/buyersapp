"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Clock, User, Stethoscope } from "lucide-react";

const APPOINTMENTS = [
  { id: 1, patient: "John Doe", doctor: "Dr. Smith", type: "Annual Checkup", date: "2026-05-20", time: "09:00", status: "Confirmed" },
  { id: 2, patient: "Jane Smith", doctor: "Dr. Nkosi", type: "Follow-up", date: "2026-05-21", time: "11:30", status: "Pending" },
  { id: 3, patient: "Mike Johnson", doctor: "Dr. Botha", type: "Consultation", date: "2026-05-22", time: "14:00", status: "Confirmed" },
  { id: 4, patient: "Sarah Williams", doctor: "Dr. Smith", type: "Vaccination", date: "2026-05-23", time: "10:00", status: "Pending" },
];

export default function MedicalCalendarPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Medical Calendar</h1>
        <Button><Plus className="w-4 h-4 mr-2" />Book Appointment</Button>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Upcoming Appointments</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {APPOINTMENTS.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{apt.type}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{apt.patient}</span>
                      <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" />{apt.doctor}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{apt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  apt.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>{apt.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
