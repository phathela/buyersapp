"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Minus, ShoppingCart } from "lucide-react";

const SUPPLIES = [
  { id: 1, name: "A4 Copy Paper (ream)", stock: 45, min: 20, unit: "reams" },
  { id: 2, name: "Black Ballpoint Pens (box)", stock: 30, min: 15, unit: "boxes" },
  { id: 3, name: "Sticky Notes (pack)", stock: 12, min: 10, unit: "packs" },
  { id: 4, name: "Toner Cartridge - HP", stock: 3, min: 5, unit: "units" },
  { id: 5, name: "A4 Lever Arch Files", stock: 25, min: 20, unit: "units" },
  { id: 6, name: "Whiteboard Markers (set)", stock: 8, min: 10, unit: "sets" },
];

export default function OfficeSupplyPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800">Office Supply</h1>
        <Button><ShoppingCart className="w-4 h-4 mr-2" />Order Now</Button>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Stationery & Consumables</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {SUPPLIES.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-teal-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-500">Min: {item.min} {item.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-semibold ${item.stock <= item.min ? 'text-red-600' : 'text-slate-800'}`}>
                    {item.stock} {item.unit}
                  </span>
                  {item.stock <= item.min && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Reorder</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
