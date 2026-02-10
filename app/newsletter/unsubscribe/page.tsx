"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Pre-fill email from URL params on mount
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You have been successfully unsubscribed from the ADSC newsletter.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-1 mb-4">
            <div className="w-10 h-10 rounded-lg bg-valencia/20 border border-valencia/40 flex items-center justify-center">
              <span className="text-valencia font-bold text-lg">A</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-oceangreen/20 border border-oceangreen/40 flex items-center justify-center">
              <span className="text-oceangreen font-bold text-lg">D</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-azureradiance/20 border border-azureradiance/40 flex items-center justify-center">
              <span className="text-azureradiance font-bold text-lg">S</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-supernova/20 border border-supernova/40 flex items-center justify-center">
              <span className="text-supernova font-bold text-lg">C</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Unsubscribe</h1>
          <p className="text-zinc-400 text-sm">
            We&apos;re sorry to see you go. Enter your email to unsubscribe from the ADSC newsletter.
          </p>
        </div>

        <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-zinc-800 p-8 shadow-2xl">
          {status === "success" ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-oceangreen/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-oceangreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-oceangreen font-semibold text-lg mb-2">Unsubscribed!</p>
              <p className="text-zinc-400 text-sm">{message}</p>
            </div>
          ) : (
            <form onSubmit={handleUnsubscribe} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Enter your email..."
                  className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-valencia focus:ring-valencia/20 h-12"
                  disabled={status === "loading"}
                />
              </div>

              {status === "error" && message && (
                <div className="p-3 bg-valencia/10 border border-valencia/30 rounded-lg">
                  <p className="text-valencia text-sm">{message}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-valencia hover:bg-valencia/80 text-white font-semibold py-3 h-12 text-base"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Unsubscribing...
                  </span>
                ) : (
                  "Unsubscribe"
                )}
              </Button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-zinc-500 hover:text-supernova text-sm transition-all">
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
