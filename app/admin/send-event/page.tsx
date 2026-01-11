"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface EventItem {
  id: string;
  name: string;
  date: string;
  category: string;
}

interface Subscriber {
  email: string;
  subscribed_at: string;
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

const SEND_LIMITS = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 200, label: "200" },
  { value: -1, label: "All" },
];

export default function SendEventPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [result, setResult] = useState<SendResult | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sendLimit, setSendLimit] = useState<number>(-1);

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
        fetchSubscribers();
      } else {
        setResult({ message: "", error: "Invalid API key. Access denied." });
        setIsAuthenticated(false);
      }
    } catch {
      setResult({ message: "", error: "Connection error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/newsletter/subscribers", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      }
    } catch {
      // Ignore errors
    }
  };

  const getSubscribersToSend = () => {
    if (sendLimit === -1) return subscribers;
    return subscribers.slice(0, sendLimit);
  };

  const sendEventEmail = async (eventId: string, eventName: string) => {
    const targetSubscribers = getSubscribersToSend();
    if (targetSubscribers.length === 0) {
      setResult({ message: "", error: "No subscribers to send emails to." });
      return;
    }

    const confirmed = window.confirm(
      `Send "${eventName}" notification to ${targetSubscribers.length} subscriber(s)?`
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
        body: JSON.stringify({ 
          eventId,
          limit: sendLimit === -1 ? undefined : sendLimit
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ message: "", error: "Failed to send. Please try again." });
    } finally {
      setLoading(false);
      setSendingId(null);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setApiKey("");
    setEvents([]);
    setSubscribers([]);
    setResult(null);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* ADSC Colored Logo Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-1 mb-4">
              <div className="w-12 h-12 rounded-xl bg-valencia/20 border border-valencia/40 flex items-center justify-center">
                <span className="text-valencia font-bold text-xl">A</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-oceangreen/20 border border-oceangreen/40 flex items-center justify-center">
                <span className="text-oceangreen font-bold text-xl">D</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-azureradiance/20 border border-azureradiance/40 flex items-center justify-center">
                <span className="text-azureradiance font-bold text-xl">S</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-supernova/20 border border-supernova/40 flex items-center justify-center">
                <span className="text-supernova font-bold text-xl">C</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-zinc-400 text-sm">Newsletter Management System</p>
          </div>

          {/* Login Card */}
          <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-zinc-800 p-8 shadow-2xl">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  🔐 API Secret Key
                </label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                  placeholder="Enter your secret key..."
                  className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-supernova focus:ring-supernova/20 h-12"
                />
              </div>

              {result?.error && (
                <div className="p-3 bg-valencia/10 border border-valencia/30 rounded-lg">
                  <p className="text-valencia text-sm flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {result.error}
                  </p>
                </div>
              )}

              <Button
                onClick={handleAuth}
                disabled={loading}
                className="w-full bg-gradient-to-r from-valencia via-supernova to-oceangreen hover:opacity-90 text-black font-bold py-3 h-12 text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                Secure Admin Access • Atmiya Developer Students Club
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-zinc-500 hover:text-supernova text-sm transition-colors">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header with ADSC gradient */}
      <div className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Mini ADSC Logo */}
              <div className="flex items-center gap-0.5">
                <span className="w-8 h-8 rounded-lg bg-valencia/20 border border-valencia/40 flex items-center justify-center text-valencia font-bold text-sm">A</span>
                <span className="w-8 h-8 rounded-lg bg-oceangreen/20 border border-oceangreen/40 flex items-center justify-center text-oceangreen font-bold text-sm">D</span>
                <span className="w-8 h-8 rounded-lg bg-azureradiance/20 border border-azureradiance/40 flex items-center justify-center text-azureradiance font-bold text-sm">S</span>
                <span className="w-8 h-8 rounded-lg bg-supernova/20 border border-supernova/40 flex items-center justify-center text-supernova font-bold text-sm">C</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Newsletter Admin</h1>
                <p className="text-xs text-zinc-500">Event Notification Center</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-valencia"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Row with ADSC colors */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-valencia/30 p-5 hover:border-valencia/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-valencia/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-valencia" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{events.length}</p>
                <p className="text-xs text-zinc-500">Events</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-oceangreen/30 p-5 hover:border-oceangreen/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-oceangreen/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-oceangreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{subscribers.length}</p>
                <p className="text-xs text-zinc-500">Subscribers</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-azureradiance/30 p-5 hover:border-azureradiance/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-azureradiance/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-azureradiance" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">{sendLimit === -1 ? "All" : sendLimit}</p>
                <p className="text-xs text-zinc-500">Send Limit</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-supernova/30 p-5 hover:border-supernova/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-supernova/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-supernova" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-oceangreen">Active</p>
                <p className="text-xs text-zinc-500">Status</p>
              </div>
            </div>
          </div>
        </div>

        {/* Send Limit Selector */}
        <div className="mb-6 bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                <svg className="w-5 h-5 text-azureradiance" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Recipient Limit
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
                Select how many subscribers to send to (from {subscribers.length} total)
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {SEND_LIMITS.map((limit) => (
                <button
                  key={limit.value}
                  onClick={() => setSendLimit(limit.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    sendLimit === limit.value
                      ? "bg-gradient-to-r from-azureradiance to-oceangreen text-black"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                  }`}
                >
                  {limit.label}
                </button>
              ))}
            </div>
          </div>
          {sendLimit !== -1 && sendLimit > subscribers.length && (
            <p className="mt-3 text-supernova text-sm">
              ⚠️ You only have {subscribers.length} subscribers. All will be sent to.
            </p>
          )}
        </div>

        {/* Result Message */}
        {result && (
          <div className={`mb-6 p-5 rounded-xl border ${
            result.error 
              ? "bg-valencia/10 border-valencia/30" 
              : result.successCount && result.successCount > 0
                ? "bg-oceangreen/10 border-oceangreen/30"
                : "bg-supernova/10 border-supernova/30"
          }`}>
            <div className="flex items-start gap-3">
              {result.error ? (
                <div className="w-10 h-10 rounded-lg bg-valencia/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-valencia" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-oceangreen/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-oceangreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className={`font-semibold text-lg ${result.error ? "text-valencia" : "text-oceangreen"}`}>
                  {result.error || result.message}
                </p>
                {result.eventName && (
                  <div className="mt-2 flex flex-wrap gap-3 text-sm">
                    <span className="text-zinc-400">Event: <span className="text-white">{result.eventName}</span></span>
                    <span className="text-zinc-400">Total: <span className="text-white">{result.totalSubscribers}</span></span>
                    <span className="text-zinc-400">Sent: <span className="text-oceangreen">{result.successCount}</span></span>
                    <span className="text-zinc-400">Failed: <span className="text-valencia">{result.failCount}</span></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Subscribers Preview */}
        {subscribers.length > 0 && (
          <div className="mb-6 bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-oceangreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Subscribers
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-oceangreen/20 text-oceangreen border border-oceangreen/30">
                {getSubscribersToSend().length} / {subscribers.length} selected
              </span>
            </div>
            <div className="px-5 py-4 max-h-40 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {subscribers.map((sub, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      sendLimit === -1 || i < sendLimit
                        ? "bg-oceangreen/10 text-oceangreen border border-oceangreen/30"
                        : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                    }`}
                  >
                    {sub.email}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* No Subscribers Warning */}
        {subscribers.length === 0 && (
          <div className="mb-6 p-5 rounded-xl border bg-supernova/10 border-supernova/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-supernova/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-supernova" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-supernova">No subscribers found</p>
                <p className="text-zinc-400 text-sm mt-1">
                  Add subscribers through the newsletter form on the website.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="bg-zinc-900/50 backdrop-blur rounded-xl border border-zinc-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-zinc-800 bg-gradient-to-r from-valencia/5 via-supernova/5 to-oceangreen/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-valencia" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Event Notification
            </h2>
            <p className="text-zinc-500 text-sm mt-1">Select an event to notify subscribers</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 p-4">
            {events.map((event, index) => {
              const colors = ["valencia", "oceangreen", "azureradiance", "supernova"];
              const color = colors[index % 4];
              const colorVar = color === "oceangreen" ? "ocean--green" : color === "azureradiance" ? "azure--radiance" : color;
              return (
                <div
                  key={event.id}
                  className="rounded-xl bg-zinc-900/50 p-5 transition-all group"
                  style={{ border: `1px solid rgba(var(--${colorVar}-rgb, 128, 128, 128), 0.2)` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      <div 
                        className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xl bg-${color}/20 text-${color}`}
                      >
                        {event.id}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-white text-lg truncate">{event.name}</h3>
                        <p className="text-zinc-500 text-sm mt-1 truncate">{event.category}</p>
                        <p className="text-zinc-400 text-xs mt-2 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {event.date}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => sendEventEmail(event.id, event.name)}
                      disabled={loading || subscribers.length === 0}
                      className={`flex-shrink-0 font-semibold ${
                        sendingId === event.id || subscribers.length === 0
                          ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-valencia via-supernova to-oceangreen text-black hover:opacity-90"
                      }`}
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
                          Send
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="text-valencia">●</span>
            <span className="text-oceangreen">●</span>
            <span className="text-azureradiance">●</span>
            <span className="text-supernova">●</span>
          </div>
          <p className="text-zinc-600 text-xs">
            ADSC Admin Dashboard • Atmiya Developer Students Club © 2026
          </p>
        </div>
      </main>
    </div>
  );
}
