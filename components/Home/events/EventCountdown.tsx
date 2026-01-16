"use client";

import { useState, useEffect } from "react";
import { events, Event } from "@/constants/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Parse date string like "Sep 16, 2025" to Date object
const parseEventDate = (dateStr: string): Date => {
  return new Date(dateStr);
};

// Get the next upcoming event (event with future date)
const getNextUpcomingEvent = (): Event | null => {
  const now = new Date();
  
  const upcomingEvents = events
    .filter((event) => {
      const eventDate = parseEventDate(event.date);
      return eventDate > now;
    })
    .sort((a, b) => {
      return parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime();
    });

  return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
};

const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-lg px-3 py-2 md:px-5 md:py-4 min-w-[60px] md:min-w-[80px] border border-zinc-700 shadow-lg">
        <span className="text-2xl md:text-4xl font-bold text-white font-mono tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-700/50" />
    </div>
    <span className="mt-2 text-xs md:text-sm text-zinc-400 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const EventCountdown = () => {
  const [nextEvent, setNextEvent] = useState<Event | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const event = getNextUpcomingEvent();
    setNextEvent(event);

    if (event) {
      const targetDate = parseEventDate(event.date);
      setTimeLeft(calculateTimeLeft(targetDate));

      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft(targetDate);
        setTimeLeft(newTimeLeft);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  // Don't render anything on server or if no upcoming event
  if (!mounted || !nextEvent || !timeLeft) {
    return null;
  }

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, ${nextEvent.color} 0%, transparent 70%)`,
        }}
      />
      
      <div className="relative z-10 px-6 xl:px-56">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-medium bg-yellow-600/20 text-yellow-500 border border-yellow-600/30 mb-4">
            🚀 Upcoming Event
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {nextEvent.name}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base">
            {nextEvent.category} • {nextEvent.date}
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center items-center gap-2 md:gap-4 mb-8">
          <TimeBlock value={timeLeft.days} label="Days" />
          <span className="text-2xl md:text-4xl font-bold text-zinc-600 mt-[-20px]">:</span>
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <span className="text-2xl md:text-4xl font-bold text-zinc-600 mt-[-20px]">:</span>
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <span className="text-2xl md:text-4xl font-bold text-zinc-600 mt-[-20px]">:</span>
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center gap-4">
          <Button asChild size="lg" variant="outline">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventCountdown;
