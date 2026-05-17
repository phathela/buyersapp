"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ParkingCircle, Users } from "lucide-react";

const OFFICES = [
  { id: 1, name: "Head Office - Sandton", floors: 12, capacity: 500, occupancy: 423, parking: 200 },
  { id: 2, name: "Midrand Branch", floors: 3, capacity: 80, occupancy: 65, parking: 40 },
  { id: 3, name: "Cape Town Office", floors: 5, capacity: 150, occupancy: 112, parking: 60 },
  { id: 4, name: "Durban Regional", floors: 2, capacity: 60, occupancy: 48, parking: 30 },
];

export default function OfficesPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Offices & Parking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OFFICES.map((office) => (
          <Card key={office.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{office.name}</h3>
                  <p className="text-xs text-slate-500">{office.floors} floors</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <Users className="w-4 h-4 text-blue-500 mb-1" />
                  <p className="text-lg font-bold text-slate-800">{office.occupancy}/{office.capacity}</p>
                  <p className="text-xs text-slate-500">Occupancy</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <ParkingCircle className="w-4 h-4 text-green-500 mb-1" />
                  <p className="text-lg font-bold text-slate-800">{office.parking}</p>
                  <p className="text-xs text-slate-500">Parking Spots</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
