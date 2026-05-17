"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { Store, Loader2, ArrowLeft } from "lucide-react";

export default function BusinessSignupPage() {
  const router = useRouter();
  const auth = useAuth();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await auth.register(email, password, businessName, "business");
      toast.success("Business account created! Welcome to BuyersApp.");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="border-slate-200">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Store className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Register Business</CardTitle>
            <CardDescription>Start reaching more customers today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="Your Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="business@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="restaurant">Restaurant / Food</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Register Business
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-500">Already have an account?</span>{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">Sign in</Link>
            </div>
            <div className="mt-4 text-center">
              <Link href="/auth/signup/buyer" className="text-sm text-blue-600 hover:underline">
                Join as a Buyer instead
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
