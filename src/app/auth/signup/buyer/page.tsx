"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { Zap, Loader2, ArrowLeft, ShoppingBag } from "lucide-react";

export default function BuyerSignupPage() {
  const router = useRouter();
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await auth.register(email, password, name, "buyer");
      toast.success("Account created! Welcome to BuyersApp.");
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
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Join as Buyer</CardTitle>
            <CardDescription>Start saving money on every purchase</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-slate-500">Already have an account?</span>{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">Sign in</Link>
            </div>
            <div className="mt-4 text-center">
              <Link href="/auth/signup/business" className="text-sm text-emerald-600 hover:underline">
                Register as a Business instead
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
