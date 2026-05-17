"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Fuel, Wrench, Navigation } from "lucide-react";

const VEHICLES = [
  { id: "VH-001", model: "Toyota Hilux 2024", plate: "CA 123-456", status: "Active", km: 15230, fuel: 78, nextService: "2026-06-15" },
  { id: "VH-002", model: "Ford Ranger 2023", plate: "CA 789-012", status: "Active", km: 28450, fuel: 45, nextService: "2026-05-28" },
  { id: "VH-003", model: "Toyota Fortuner", plate: "CA 345-678", status: "Maintenance", km: 42100, fuel: 62, nextService: "2026-05-10" },
  { id: "VH-004", model: "Nissan NP300", plate: "CA 901-234", status: "Active", km: 8900, fuel: 90, nextService: "2026-07-01" },
  { id: "VH-005", model: "VW Amarok", plate: "CA 567-890", status: "Inactive", km: 67300, fuel: 0, nextService: "2026-04-20" },
];

export default function FleetPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">Fleet</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="p-4 flex items-center gap-3"><Truck className="w-8 h-8 text-amber-500" /><div><p className="text-2xl font-bold text-slate-800">5</p><p className="text-xs text-slate-500">Total Vehicles</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Navigation className="w-8 h-8 text-green-500" /><div><p className="text-2xl font-bold text-slate-800">3</p><p className="text-xs text-slate-500">Active</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Wrench className="w-8 h-8 text-amber-500" /><div><p className="text-2xl font-bold text-slate-800">1</p><p className="text-xs text-slate-500">Maintenance</p></div></CardContent></Card>
        <Card><CardContent className="p-4 flex items-center gap-3"><Fuel className="w-8 h-8 text-blue-500" /><div><p className="text-2xl font-bold text-slate-800">55%</p><p className="text-xs text-slate-500">Avg Fuel</p></div></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Vehicle Fleet</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-slate-500">
                  <th className="pb-3 font-medium">Vehicle ID</th>
                  <th className="pb-3 font-medium">Model</th>
                  <th className="pb-3 font-medium">Plate</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Odometer</th>
                  <th className="pb-3 font-medium">Fuel %</th>
                  <th className="pb-3 font-medium">Next Service</th>
                </tr>
              </thead>
              <tbody>
                {VEHICLES.map((v) => (
                  <tr key={v.id} className="border-b last:border-0">
                    <td className="py-3 text-slate-500">{v.id}</td>
                    <td className="py-3 font-medium text-slate-800">{v.model}</td>
                    <td className="py-3 text-slate-500">{v.plate}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        v.status === "Active" ? "bg-green-100 text-green-700" :
                        v.status === "Maintenance" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>{v.status}</span>
                    </td>
                    <td className="py-3 text-slate-800">{v.km.toLocaleString()} km</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-200 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${v.fuel > 60 ? "bg-green-500" : v.fuel > 30 ? "bg-amber-500" : "bg-red-500"}`} style={{width: `${v.fuel}%`}}></div>
                        </div>
                        <span className="text-xs text-slate-500">{v.fuel}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-slate-500">{v.nextService}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
