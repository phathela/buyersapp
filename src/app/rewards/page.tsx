"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Gift, Trophy, Star, Coins, CreditCard, Sparkles, Clock, Users, Loader2, Check, Award, Zap, Crown } from "lucide-react";

const MOCK_COMPETITIONS = [
  { id: 1, title: "Weekly Trading Challenge", description: "Best trade of the week wins big!", entry_cost: 5, prize_pool: 100, prize_description: "100 AI Credits", participants_count: 23, ends_at: new Date(Date.now() + 7 * 86400000).toISOString(), status: "active" },
  { id: 2, title: "Referral Race", description: "Refer the most users this month", entry_cost: 0, prize_pool: 50, prize_description: "50 AI Credits", participants_count: 45, ends_at: new Date(Date.now() + 14 * 86400000).toISOString(), status: "active" },
];

const MOCK_OFFERS = [
  { id: 1, title: "Welcome Bonus", description: "New user special offer", reward_amount: 10, claimed: false },
  { id: 2, title: "Daily Login", description: "Log in every day for 7 days", reward_amount: 5, claimed: false },
  { id: 3, title: "First Deal", description: "Complete your first purchase", reward_amount: 25, claimed: true },
];

export default function RewardsCentrePage() {
  const [activeTab, setActiveTab] = useState("rewards");

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-['Barlow_Condensed'] text-3xl font-bold flex items-center gap-3">
                <Gift className="w-8 h-8" />
                REWARDS CENTRE
              </h1>
              <p className="text-amber-100 mt-1">Earn rewards, compete, and grow your balance</p>
            </div>
            <div className="flex items-center gap-4">
              <Card className="bg-white/20 backdrop-blur border-white/30">
                <CardContent className="p-4 flex items-center gap-3">
                  <Coins className="w-8 h-8 text-amber-200" />
                  <div>
                    <p className="text-sm text-amber-100">Your Balance</p>
                    <p className="text-2xl font-bold">0 AI</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="rewards" className="gap-2"><Award className="w-4 h-4" />My Rewards</TabsTrigger>
            <TabsTrigger value="competitions" className="gap-2"><Trophy className="w-4 h-4" />Competitions</TabsTrigger>
            <TabsTrigger value="offers" className="gap-2"><Sparkles className="w-4 h-4" />Offers</TabsTrigger>
            <TabsTrigger value="purchase" className="gap-2"><CreditCard className="w-4 h-4" />Purchase</TabsTrigger>
          </TabsList>

          <TabsContent value="rewards">
            <div className="grid grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                      <Coins className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-amber-100">Current Balance</p>
                      <p className="text-3xl font-bold">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                      <Star className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-emerald-100">Total Earned</p>
                      <p className="text-3xl font-bold">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                      <Trophy className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-purple-100">Rewards Earned</p>
                      <p className="text-3xl font-bold">0</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-6">
              <CardContent className="py-12 text-center">
                <Gift className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No rewards yet</p>
                <p className="text-sm text-slate-400 mt-1">Participate in competitions and claim offers to earn rewards!</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitions">
            <div className="grid grid-cols-2 gap-6">
              {MOCK_COMPETITIONS.map(comp => (
                <Card key={comp.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{comp.title}</CardTitle>
                        <CardDescription className="mt-1">{comp.description}</CardDescription>
                      </div>
                      <Badge className="bg-green-500">active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-amber-500" />
                        <span>Entry: {comp.entry_cost || "Free"} AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span>Prize: {comp.prize_pool} AI</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-500" />
                        <span>{comp.participants_count} participants</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">Enter Competition</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="offers">
            <div className="grid grid-cols-3 gap-6">
              {MOCK_OFFERS.map(offer => (
                <Card key={offer.id} className={`hover:shadow-lg transition ${offer.claimed ? 'opacity-60' : ''}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-3">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{offer.title}</CardTitle>
                    <CardDescription>{offer.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-4">
                      <p className="text-3xl font-bold text-amber-500">+{offer.reward_amount}</p>
                      <p className="text-sm text-slate-500">AI</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {offer.claimed ? (
                      <Button disabled className="w-full" variant="outline"><Check className="w-4 h-4 mr-2" />Claimed</Button>
                    ) : (
                      <Button className="w-full bg-amber-500 hover:bg-amber-600">Claim Offer</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="purchase">
            <div className="grid grid-cols-3 gap-6">
              {[
                { amount: 50, bonus: 0, price: "$5" },
                { amount: 200, bonus: 25, price: "$18" },
                { amount: 500, bonus: 100, price: "$40" },
              ].map((pkg, i) => (
                <Card key={i} className={`hover:shadow-lg transition cursor-pointer ${i === 2 ? 'border-2 border-amber-500 relative' : ''}`}>
                  {i === 2 && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500"><Crown className="w-3 h-3 mr-1" />Popular</Badge>}
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${i === 2 ? 'bg-amber-100' : 'bg-slate-100'}`}>
                      <Coins className={`w-8 h-8 ${i === 2 ? 'text-amber-500' : 'text-slate-500'}`} />
                    </div>
                    <CardTitle className="text-2xl mt-4">{pkg.amount} AI</CardTitle>
                    {pkg.bonus > 0 && <Badge variant="secondary" className="mt-2"><Zap className="w-3 h-3 mr-1" />+{pkg.bonus} Bonus</Badge>}
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-3xl font-bold text-slate-800">{pkg.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className={`w-full ${i === 2 ? 'bg-amber-500 hover:bg-amber-600' : ''}`} variant={i === 2 ? "default" : "outline"}>Purchase</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
