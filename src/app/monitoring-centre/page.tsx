"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Monitor, ArrowLeft, Camera, Video, AlertTriangle, Eye, Loader2, RefreshCw,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Home,
  LayoutGrid, HardDrive, Activity, Bot, Car, Users, Scan, Circle, CheckCircle, XCircle,
} from "lucide-react";

const MOCK_CAMERAS = [
  { id: "cam-1", name: "Main Entrance", location: "Building A - Front Gate", status: "online", resolution: "4K", type: "ptz", recording: true, ptz_capable: true, fps: 30, ip_address: "192.168.1.100", protocol: "RTSP" },
  { id: "cam-2", name: "Parking Lot", location: "North Side", status: "online", resolution: "1080p", type: "fixed", recording: true, ptz_capable: false, fps: 25, ip_address: "192.168.1.101", protocol: "RTSP" },
  { id: "cam-3", name: "Warehouse", location: "Section B", status: "offline", resolution: "2K", type: "fixed", recording: false, ptz_capable: false, fps: 20, ip_address: "192.168.1.102", protocol: "RTSP" },
  { id: "cam-4", name: "Lobby", location: "Main Building", status: "online", resolution: "1080p", type: "dome", recording: true, ptz_capable: true, fps: 30, ip_address: "192.168.1.103", protocol: "ONVIF" },
];

export default function MonitoringCentrePage() {
  const [selectedCamera, setSelectedCamera] = useState(MOCK_CAMERAS[0]);
  const [gridLayout, setGridLayout] = useState("2x2");
  const [activeTab, setActiveTab] = useState("live");

  const getGridCols = () => {
    switch (gridLayout) {
      case "3x3": return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case "4x4": return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default: return "grid-cols-1 sm:grid-cols-2";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700 bg-slate-900/95 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-10 h-10 bg-red-600 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-['Barlow_Condensed'] text-xl font-bold tracking-wider">MONITORING CENTRE</span>
              <p className="text-xs text-slate-400">Enterprise Surveillance System</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Select value={gridLayout} onValueChange={setGridLayout}>
              <SelectTrigger className="w-24 bg-slate-800 border-slate-600 text-white">
                <LayoutGrid className="w-4 h-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="2x2">2x2</SelectItem>
                <SelectItem value="3x3">3x3</SelectItem>
                <SelectItem value="4x4">4x4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row">
        <div className="flex-1 p-2 sm:p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-slate-800 border border-slate-700 mb-4">
              <TabsTrigger value="live" className="data-[state=active]:bg-red-600"><Video className="w-4 h-4 mr-2" />Live View</TabsTrigger>
              <TabsTrigger value="cameras" className="data-[state=active]:bg-red-600"><Camera className="w-4 h-4 mr-2" />Cameras</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-red-600"><Eye className="w-4 h-4 mr-2" />AI Analytics</TabsTrigger>
              <TabsTrigger value="lpr" className="data-[state=active]:bg-red-600"><Car className="w-4 h-4 mr-2" />LPR</TabsTrigger>
              <TabsTrigger value="recordings" className="data-[state=active]:bg-red-600"><HardDrive className="w-4 h-4 mr-2" />Recordings</TabsTrigger>
              <TabsTrigger value="alerts" className="data-[state=active]:bg-red-600"><AlertTriangle className="w-4 h-4 mr-2" />Alerts</TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className={`grid ${getGridCols()} gap-2`}>
                    {MOCK_CAMERAS.slice(0, 4).map((cam) => (
                      <div key={cam.id} onClick={() => setSelectedCamera(cam)}
                        className={`relative aspect-video bg-slate-800 cursor-pointer border-2 transition-all ${selectedCamera?.id === cam.id ? "border-red-500" : "border-transparent hover:border-slate-600"}`}>
                        <div className="w-full h-full bg-slate-850 flex items-center justify-center">
                          <Camera className="w-12 h-12 text-slate-700" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-2 left-2 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${cam.status === "online" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                          <span className="text-xs text-white font-medium uppercase">{cam.status}</span>
                        </div>
                        {cam.recording && (
                          <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded">
                            <Circle className="w-2 h-2 fill-white" /><span className="text-xs">REC</span>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white font-semibold text-sm truncate">{cam.name}</p>
                          <p className="text-slate-300 text-xs truncate">{cam.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedCamera && (
                  <div className="w-80 space-y-4">
                    <div className="bg-slate-800 border border-slate-700 p-4">
                      <h3 className="font-semibold text-white mb-2">{selectedCamera.name}</h3>
                      <p className="text-sm text-slate-400 mb-3">{selectedCamera.location}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-700/50 p-2"><span className="text-slate-400">Resolution</span><p className="text-white font-medium">{selectedCamera.resolution}</p></div>
                        <div className="bg-slate-700/50 p-2"><span className="text-slate-400">FPS</span><p className="text-white font-medium">{selectedCamera.fps}</p></div>
                        <div className="bg-slate-700/50 p-2"><span className="text-slate-400">Type</span><p className="text-white font-medium capitalize">{selectedCamera.type}</p></div>
                        <div className="bg-slate-700/50 p-2"><span className="text-slate-400">IP</span><p className="text-white font-medium text-xs">{selectedCamera.ip_address}</p></div>
                      </div>
                    </div>

                    {selectedCamera.ptz_capable && (
                      <div className="bg-slate-800 border border-slate-700 p-4">
                        <h4 className="text-sm font-semibold text-white mb-3">PTZ Control</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div /><Button size="sm" variant="outline" className="border-slate-600"><ChevronUp className="w-4 h-4" /></Button><div />
                          <Button size="sm" variant="outline" className="border-slate-600"><ChevronLeft className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" className="border-slate-600"><Home className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" className="border-slate-600"><ChevronRight className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" className="border-slate-600"><ZoomOut className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" className="border-slate-600"><ChevronDown className="w-4 h-4" /></Button>
                          <Button size="sm" variant="outline" className="border-slate-600"><ZoomIn className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="cameras">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {MOCK_CAMERAS.map((cam) => (
                  <div key={cam.id} className="bg-slate-800 border border-slate-700 overflow-hidden">
                    <div className="relative aspect-video bg-slate-700 flex items-center justify-center">
                      <Camera className="w-16 h-16 text-slate-600" />
                      <div className="absolute top-2 left-2">
                        <div className={`w-2 h-2 rounded-full ${cam.status === "online" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold">{cam.name}</h3>
                      <p className="text-sm text-slate-400">{cam.location}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                        <div className="bg-slate-700/50 p-2"><span className="text-slate-400 block">IP Address</span><span className="text-white font-mono">{cam.ip_address}</span></div>
                        <div className="bg-slate-700/50 p-2"><span className="text-slate-400 block">Resolution</span><span className="text-white">{cam.resolution}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {[
                  { label: "People Detected", value: "12", icon: Users, color: "text-blue-400" },
                  { label: "Vehicles Detected", value: "8", icon: Car, color: "text-emerald-400" },
                  { label: "Plates Read", value: "6", icon: Scan, color: "text-amber-400" },
                  { label: "Motion Events", value: "23", icon: Activity, color: "text-red-400" },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800 border border-slate-700 p-4">
                    <div className="flex items-center gap-3">
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      <div><p className="text-2xl font-bold text-white">{stat.value}</p><p className="text-xs text-slate-400">{stat.label}</p></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-800 border border-slate-700 p-4 mt-4">
                <h3 className="font-semibold text-white mb-4">AI Detection Feed</h3>
                <p className="text-slate-400 text-center py-8">Connect cameras to enable YOLO object detection</p>
              </div>
            </TabsContent>

            <TabsContent value="lpr">
              <div className="bg-slate-800 border border-slate-700 p-4">
                <h3 className="font-semibold text-white mb-4">License Plate Recognition</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="bg-slate-700/50 p-4 text-center">
                    <p className="text-2xl font-bold text-white">0</p>
                    <p className="text-xs text-slate-400">Plates Detected</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 text-center">
                    <p className="text-2xl font-bold text-emerald-400">0</p>
                    <p className="text-xs text-slate-400">Registered</p>
                  </div>
                  <div className="bg-slate-700/50 p-4 text-center">
                    <p className="text-2xl font-bold text-amber-400">0</p>
                    <p className="text-xs text-slate-400">Unknown</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recordings">
              <div className="bg-slate-800 border border-slate-700">
                <div className="p-4 border-b border-slate-700">
                  <h3 className="font-semibold text-white">Recording Archive</h3>
                </div>
                <div className="p-12 text-center text-slate-400">
                  <HardDrive className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                  <p>No recordings yet. Start recording to build your archive.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alerts">
              <div className="bg-slate-800 border border-slate-700 p-4">
                <h3 className="font-semibold text-white flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Active Alerts
                </h3>
                <p className="text-slate-400 text-center py-8">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                  No active alerts
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full lg:w-80 border-t lg:border-l border-slate-700 bg-slate-800/50 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-red-400" />
            <h3 className="font-semibold text-white">Monitor Bot</h3>
          </div>
          <p className="text-sm text-slate-400">AI assistant for monitoring operations</p>
        </div>
      </div>
    </div>
  );
}
