"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Map, ExternalLink } from "lucide-react";

const PROVINCES = [
  { id: 1, name: "Eastern Cape", capital: "Bhisho", population: "6.7M", code: "EC" },
  { id: 2, name: "Free State", capital: "Bloemfontein", population: "2.9M", code: "FS" },
  { id: 3, name: "Gauteng", capital: "Johannesburg", population: "15.5M", code: "GP" },
  { id: 4, name: "KwaZulu-Natal", capital: "Pietermaritzburg", population: "11.5M", code: "KZN" },
  { id: 5, name: "Limpopo", capital: "Polokwane", population: "5.9M", code: "LP" },
  { id: 6, name: "Mpumalanga", capital: "Mbombela", population: "4.7M", code: "MP" },
  { id: 7, name: "Northern Cape", capital: "Kimberley", population: "1.3M", code: "NC" },
  { id: 8, name: "North West", capital: "Mahikeng", population: "4.1M", code: "NW" },
  { id: 9, name: "Western Cape", capital: "Cape Town", population: "7.2M", code: "WC" },
];

export default function NationalPage() {
  return (
    <div className="p-6">
      <h1 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-6">National</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROVINCES.map((province) => (
          <Card key={province.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Map className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{province.code}</span>
              </div>
              <h3 className="font-semibold text-slate-800">{province.name}</h3>
              <p className="text-xs text-slate-500 mt-1">Capital: {province.capital}</p>
              <p className="text-xs text-slate-500">Population: {province.population}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
