"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Laptop, Printer, Server, Wifi } from "lucide-react";

const ASSETS = [
  { id: 1, name: "Dell OptiPlex 7080", type: "Desktop", assigned: "John D.", status: "Active", icon: Monitor },
  { id: 2, name: "MacBook Pro M3", type: "Laptop", assigned: "Sarah W.", status: "Active", icon: Laptop },
  { id: 3, name: "HP LaserJet M404", type: "Printer", assigned: "Office B", status: "Active", icon: Printer },
  { id: 4, name: "Dell Latitude 5540", type: "Laptop", assigned: "Mike R.", status: "Maintenance", icon: Laptop },
  { id: 5, name: "Cisco SG350 Switch", type: "Network", assigned: "Server Room", status: "Active", icon: Server },
  { id: 6, name: "UniFi AP Pro", type: "Access Point", assigned: "Floor 3", status: "Active", icon: Wifi },
];

export default function ITInventoryPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">IT Inventory</h1>
      <Card>
        <CardHeader><CardTitle className="text-lg">Hardware & IT Assets</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ASSETS.map((asset) => (
              <div key={asset.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-slate-50 cursor-pointer">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <asset.icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{asset.name}</p>
                  <p className="text-xs text-slate-500">{asset.type} • {asset.assigned}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  asset.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>{asset.status}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
