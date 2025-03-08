"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SignupForm({ className, ...props }) {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const signUpHandle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/signup", user);

      const id = res.data.user.id;

      if (res.data.success) {
        toast.success("Signup successful!", {
          description: "Please verify your email to continue.",
        });
        setUser({ username: "", email: "", password: "" });
        router.push(`/verify_otp/${id}`);
      }
    } catch (error) {
      toast.error("Signup failed", {
        description:
          error.response?.data?.message ||
          "Please check your details and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-card rounded-lg border shadow-sm">
      <form
        onSubmit={signUpHandle}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Sign up to create your account
          </h1>
          <p className="text-muted-foreground text-sm text-balance max-w-xs">
            Enter your valid details below to sign up
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="username" className="text-sm font-medium">
              User Name
            </Label>
            <Input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="user0120"
              required
              className="h-10 transition-all focus-visible:ring-primary"
              disabled={loading}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="m@example.com"
              required
              className="h-10 transition-all focus-visible:ring-primary"
              disabled={loading}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
              className="h-10 transition-all focus-visible:ring-primary"
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 transition-all"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-primary/90 transition-colors underline-offset-4 hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
