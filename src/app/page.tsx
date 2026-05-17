"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Zap, Sparkles, Users, TrendingUp, MapPin, Clock, Star, ChevronRight, ShoppingBag, Store, Shield, BarChart3, Award } from "lucide-react";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-['Barlow_Condensed'] text-xl font-bold tracking-tight text-slate-800">
              BuyersApp
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-600">Sign In</Button>
            </Link>
            <Link href="/auth/signup/buyer">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Join as Buyer
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/signup/business">
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Register Business
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
          {/* Hot Deal Banner */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-8 animate-pulse">
            <Sparkles className="w-4 h-4" />
            Hot Deals Available Near You
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight max-w-4xl mb-6">
            Find the best deals.
            <br />
            <span className="text-blue-600">Save money. Buy smarter.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mb-10">
            The deal marketplace that connects smart buyers with local businesses.
            Access exclusive deals, earn rewards, and make informed purchasing decisions.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/auth/signup/buyer">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Join as Buyer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/signup/business">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-slate-300">
                Register Business
              </Button>
            </Link>
          </div>

          {/* Floating deal cards animation */}
          <div className="hidden lg:block absolute top-20 right-10 space-y-4">
            <div className="bg-white rounded-xl shadow-xl p-4 border border-slate-100 animate-bounce" style={{ animationDuration: "3s" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">50% OFF</p>
                  <p className="text-sm text-slate-500">Electronics</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-4 border border-slate-100 animate-bounce" style={{ animationDuration: "4s", animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">2+1 Free</p>
                  <p className="text-sm text-slate-500">Restaurants</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Buyers Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
            Why Join as a <span className="text-blue-600">Buyer</span>?
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Save money on every purchase with exclusive deals and rewards
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: "JOIN TO SAVE", desc: "Access exclusive deals near you", color: "blue" },
              { icon: Award, title: "EARN REWARDS", desc: "Get credits on every smart purchase", color: "amber" },
              { icon: Shield, title: "KNOW BEFORE BUY", desc: "AI-powered insights & comparisons", color: "emerald" },
              { icon: Users, title: "GROUP POWER", desc: "Buy together, save together", color: "violet" },
            ].map((item, i) => (
              <Card key={i} className="border-slate-200 hover:shadow-lg transition-all card-hover">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-500">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Businesses Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-4">
            Why Register Your <span className="text-emerald-600">Business</span>?
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Reach more customers and grow your business with smart tools
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: "ACCESS MARKETS NEAR YOU", desc: "Target customers by radius", color: "blue" },
              { icon: TrendingUp, title: "COMPETITIVE EDGE", desc: "Real-time bidding on group buys", color: "emerald" },
              { icon: Shield, title: "VERIFIED PRESENCE", desc: "Build trust with buyers", color: "violet" },
              { icon: BarChart3, title: "ANALYTICS & INSIGHTS", desc: "Know your market", color: "amber" },
            ].map((item, i) => (
              <Card key={i} className="border-slate-200 hover:shadow-lg transition-all card-hover">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-500">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-16">
            How It <span className="text-blue-600">Works</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "JOIN FREE", desc: "Sign up as buyer or business in minutes", icon: Users },
              { step: "02", title: "SET ALERTS", desc: "Choose categories, radius, and deals", icon: Bell },
              { step: "03", title: "SAVE & EARN", desc: "Get deals, earn rewards, build groups", icon: Award },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-blue-600" />
                </div>
                <p className="text-sm font-bold text-blue-600 mb-2">{item.step}</p>
                <h3 className="font-['Barlow_Condensed'] text-2xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Hubs Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Your Complete <span className="text-blue-400">Business Hub</span>
          </h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
            Beyond deals, access powerful tools to manage your entire operation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Briefcase, name: "Smart Office", desc: "AI-powered workspace" },
              { icon: MessageSquare, name: "Comms Centre", desc: "Chat, calls & meetings" },
              { icon: Monitor, name: "Monitoring Centre", desc: "Surveillance & security" },
              { icon: BookOpen, name: "Knowledge Centre", desc: "Documents & SOPs" },
              { icon: Bell, name: "Alerts Hub", desc: "Real-time notifications" },
              { icon: Gift, name: "Rewards Centre", desc: "Earn & redeem credits" },
              { icon: Package, name: "Logistics Hub", desc: "Fleet & inventory" },
              { icon: LifeBuoy, name: "Request Service", desc: "IT & facilities" },
              { icon: LayoutDashboard, name: "ERP Hub", desc: "Enterprise planning" },
            ].map((hub, i) => (
              <Link key={i} href="/dashboard" className="bg-slate-800/80 border border-slate-700 p-5 card-hover group flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                  <hub.icon className="w-6 h-6 text-slate-300" />
                </div>
                <div className="flex-1">
                  <h3 className="font-['Barlow_Condensed'] text-lg font-semibold">{hub.name}</h3>
                  <p className="text-sm text-slate-400">{hub.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-300 transition-colors" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-['Barlow_Condensed'] text-lg font-bold text-white">BuyersApp</span>
            </div>
            <p className="text-sm">© 2026 BuyersApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper for icon imports
function Bell({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>; }
function Briefcase({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>; }
function MessageSquare({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>; }
function Monitor({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>; }
function BookOpen({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>; }
function Gift({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>; }
function Package({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>; }
function LifeBuoy({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M4.93 4.93l4.24 4.24" /><path d="M14.83 14.83l4.24 4.24" /><path d="M14.83 9.17l4.24-4.24" /><path d="M14.83 9.17l4.24-4.24" /><path d="M4.93 19.07l4.24-4.24" /></svg>; }
function LayoutDashboard({ className }: { className?: string }) { return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>; }
