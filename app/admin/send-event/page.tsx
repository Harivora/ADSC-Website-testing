"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EventItem {
  id: string;
  name: string;
  date: string;
  category: string;
}

interface SendResult {
  message: string;
  eventName?: string;
  totalSubscribers?: number;
  successCount?: number;
  failCount?: number;
  errors?: string[];
  error?: string;
}

export default function SendEventPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [result, setResult] = useState<SendResult | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  // Authenticate and fetch events
  const handleAuth = async () => {
    if (!apiKey.trim()) {
      setResult({ message: "", error: "Please enter the API key." });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/newsletter/send-event", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events || []);
        setIsAuthenticated(true);
        setResult(null);
        
        // Get subscriber count
        fetchSubscriberCount();
      } else {
        setResult({ message: "", error: "Invalid API key. Access denied." });
        setIsAuthenticated(false);
      }
    } catch (error) {
      setResult({ message: "", error: `Connection error: ${error}` });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriberCount = async () => {
    try {
      const response = await fetch("/api/newsletter/subscribers", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSubscriberCount(data.count);
      }
    } catch {
      // Ignore errors for subscriber count
    }
  };

  const sendEventEmail = async (eventId: string, eventName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to send "${eventName}" notification to all subscribers?`
    );
    if (!confirmed) return;

    setSendingId(eventId);
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/newsletter/send-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ eventId }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ message: "", error: `Failed to send: ${error}` });
    } finally {
      setLoading(false);
      setSendingId(null);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setApiKey("");
    setEvents([]);
    setResult(null);
    setSubscriberCount(null);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-600/20 border border-yellow-600/30 mb-4">
              <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-zinc-400 text-sm">Enter your API key to continue</p>
          </div>

          {/* Login Card */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800 p-6 shadow-2xl">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  API Secret Key
                </label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                  placeholder="Enter NEWSLETTER_API_SECRET..."
                  className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-600 focus:ring-yellow-600/20"
                />
              </div>

              {result?.error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {result.error}
                  </p>
                </div>
              )}

              <Button
                onClick={handleAuth}
                disabled={loading}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold py-2.5"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Authenticating...
                  </span>
                ) : (
                  "Access Dashboard"
                )}
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800">
              <p className="text-zinc-500 text-xs text-center">
                🔒 Secure admin access • ADSC Newsletter System
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-600/20 border border-yellow-600/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Newsletter Admin</h1>
              <p className="text-xs text-zinc-500">ADSC Event Notifications</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{events.length}</p>
                <p className="text-xs text-zinc-500">Total Events</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{subscriberCount ?? "..."}</p>
                <p className="text-xs text-zinc-500">Subscribers</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Active</p>
                <p className="text-xs text-zinc-500">System Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Result Message */}
        {result && (
          <div className={`mb-6 p-4 rounded-xl border ${
            result.error 
              ? "bg-red-500/10 border-red-500/30" 
              : result.successCount && result.successCount > 0
                ? "bg-green-500/10 border-green-500/30"
                : "bg-yellow-500/10 border-yellow-500/30"
          }`}>
            <div className="flex items-start gap-3">
              {result.error ? (
                <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <div>
                <p className={`font-medium ${result.error ? "text-red-400" : "text-green-400"}`}>
                  {result.error || result.message}
                </p>
                {result.eventName && (
                  <p className="text-zinc-400 text-sm mt-1">
                    Event: {result.eventName} • Total: {result.totalSubscribers} • 
                    Sent: {result.successCount} • Failed: {result.failCount}
                  </p>
                )}
                {result.errors && result.errors.length > 0 && (
                  <details className="mt-2">
                    <summary className="text-zinc-500 text-xs cursor-pointer">View errors</summary>
                    <ul className="mt-2 text-xs text-zinc-500 space-y-1">
                      {result.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-white">Send Event Notification</h2>
            <p className="text-zinc-500 text-sm">Select an event to notify all subscribers</p>
          </div>
          
          <div className="divide-y divide-zinc-800">
            {events.map((event) => (
              <div
                key={event.id}
                className="px-6 py-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-600/30 flex items-center justify-center">
                    <span className="text-yellow-500 font-bold">{event.id}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{event.name}</h3>
                    <p className="text-zinc-500 text-sm">
                      {event.category} • {event.date}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => sendEventEmail(event.id, event.name)}
                  disabled={loading}
                  className={`${
                    sendingId === event.id
                      ? "bg-zinc-700"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  } text-black font-semibold min-w-[120px]`}
                >
                  {sendingId === event.id ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Email
                    </span>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-zinc-600 text-xs">
            🔒 Admin Dashboard • Secure Access Only • ADSC © 2026
          </p>
        </div>
      </main>
    </div>
  );
}
