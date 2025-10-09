"use client";

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import localFont from "next/font/local"
import Link from "next/link";
import {
  COLOR,
  timelineData,
  whoCanJoinData,
  howToParticipateData,
  baselineRewardsData,
  seasonalPrizesData,
  rulesData,
  evaluationCriteriaData
} from "@/components/hackathons/code-carnival-2.0/constants";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const gameOfSquids = localFont({
  src: [
    {
      path: 'GameOfSquids.ttf',
      weight: '400',
      style: 'medium',
    },
  ],
  variable: '--font-game-of-squids',
});

export default function Page() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background Music Audio Element */}
      <audio ref={audioRef} src="/bg-music/background-music.mp3" loop />
      {/* Floating Play/Pause Button */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg"
        style={{
          background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
          border: `2px solid ${COLOR.pink}`,
          color: "#fff",
        }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>

      <section className="py-20 px-4 text-center min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto flex flex-col justify-center items-center w-full">
          <div
            className="inline-block px-6 py-2 rounded-full mb-8"
            style={{
              background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
              border: `2px solid ${COLOR.pink}`,
              color: "#fff",
              fontWeight: 600,
              letterSpacing: "0.08em",
              fontSize: "0.7rem",
            }}
          >
            <span>🚀 National Level Hackathon</span>
          </div>
          <div className="text-sm font-mono mb-6 tracking-widest">
            Industry Powered • Problem Statements
          </div>
          <h1 className={`text-6xl md:text-7xl font-bold mb-8 ${gameOfSquids.className}`}>Code Carnival Season 2</h1>
          <p className="text-2xl md:text-3xl font-bold mb-10 text-pink-400">
            Win from a massive ₹60,000+ prize pool!
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Showcase your skills, collaborate with top talent, and compete for exciting prizes at India's premier hackathon event.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="text-white px-8 py-3 text-lg font-semibold"
              style={{
                background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
                border: `2px solid ${COLOR.pink}`,
              }}
            >
              <Link href={"https://events.adsc-atmiya.in/hackathons/475469d6-03ac-4894-8761-8200ea7f1a26"}>
                REGISTER NOW
              </Link>
            </Button>

            <Button
              size="lg"
              className="text-white px-8 py-3 text-lg font-semibold"
              style={{
                background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
                border: `2px solid ${COLOR.pink}`,
              }}
            >
              <Link href={"/hackathons/code-carnival-2.0/problem-statements"}>
                Problem Statements
              </Link>
            </Button>
          </div>
          <div className="w-full mt-10 flex justify-center">
            <div className="w-full" style={{ maxWidth: 560 }}>
              <div className="relative pb-[56.25%] h-0 w-full">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/61e3kVh6-bY?si=OWe7GrMTlrlJ3Y1U"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${gameOfSquids.className}`}>Hackathon Timeline</h2>
            <div className="font-mono text-pink-400">Starts 15th September</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineData.map((item, index) => (
              <Card
                key={index}
                className="flex flex-col justify-between p-6 rounded-xl shadow-lg genesis-card"
                style={{
                  background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
                  border: `2px solid ${COLOR.pink}`,
                  minHeight: "260px",
                }}
              >
                <CardHeader className="flex flex-col items-center">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-pink-900 text-white tracking-wide mb-2">
                    {item.phase}
                  </span>
                  <div className="flex flex-col items-center mb-2">
                    {item.newDate ? (
                      <>
                        <span className="text-xs px-2 py-1 rounded bg-green-900 text-green-300 font-semibold mb-1">
                          {item.newDate}
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-400 line-through">
                          {item.date}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-200">
                        {item.date || item.newDate || item.date}
                      </span>
                    )}
                  </div>
                  <CardTitle
                    className="text-xl font-bold mb-2 text-center"
                    style={{ color: COLOR.lightpink }}
                  >
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-white/80 text-center text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${gameOfSquids.className}`}>Rewards & Prizes</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Baseline Rewards */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Baseline Rewards</h3>
              <div className="text-sm text-muted-foreground mb-6">For All Participants</div>

              <div className="space-y-6">
                {baselineRewardsData.map((reward, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1`} style={{ backgroundColor: COLOR.lightpink }}>
                      {reward.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">
                        {reward.title}
                      </div>
                      {reward.subtitle && (
                        <div className="text-sm text-muted-foreground">{reward.subtitle}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Prizes */}
            <div className="timeline-phase">
              <h3 className="text-2xl font-bold mb-8">Winner Prizes</h3>
              <div className="text-sm text-muted-foreground mb-6">Top 3 Teams</div>

              <div className="space-y-4">
                {seasonalPrizesData.map((prize, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg`} style={{
                    background: prize.gradient,
                    border: `2px solid ${COLOR.pink}`,
                  }}>
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{prize.rank}</div>
                      <div className="text-white font-semibold">
                        {prize.prize}
                        <sup>*</sup>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${gameOfSquids.className}`}>Who Can Join?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whoCanJoinData.map((item, index) => (
              <Card key={index} className="text-center" style={{
                background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
                border: `2px solid ${COLOR.pink}`,
              }}>
                <CardHeader>
                  <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                  <CardDescription className="text-white/80">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${gameOfSquids.className}`}>How to Participate</h2>
            <div className="font-mono text-pink-400">Please watch demo video: <Link href={"https://youtu.be/61e3kVh6-bY"} target="_blank" className="underline">Watch Registeration Demo Video</Link></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {howToParticipateData.map((item, index) => (
              <Card key={index} style={{
                background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
                border: `2px solid ${COLOR.pink}`,
              }}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4`} style={{ backgroundColor: COLOR.lightpink }}>
                    <span className={`text-2xl font-bold text-white`}>{item.number}</span>
                  </div>
                  <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                  <CardDescription className="text-white/50">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rules & Regulations Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${gameOfSquids.className}`}>Rules & Regulations</h2>
            <div className="font-mono text-pink-400">Please read carefully before participating</div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {rulesData.map((rule, index) => (
              <Card key={index} style={{
                background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
                border: `2px solid ${COLOR.pink}`,
              }}>
                <CardHeader>
                  <CardTitle className="text-xl text-white">{rule.title}</CardTitle>
                  <CardDescription className="text-white/80">{rule.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Criteria Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${gameOfSquids.className}`}>Evaluation Criteria</h2>
            <div className="font-mono text-pink-400">Projects will be judged on the following aspects</div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {evaluationCriteriaData.map((criteria, index) => (
              <Card key={index} style={{
                background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
                border: `2px solid ${COLOR.pink}`,
                minHeight: "160px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <CardHeader className="flex flex-col items-center justify-center">
                  <CardTitle className="text-xl text-white mb-2 text-center">{criteria.title}</CardTitle>
                  <CardDescription className="text-white/80 text-center text-sm">{criteria.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="cta-section p-12 text-center relative z-10">
            <h2 className={`text-4xl font-bold mb-4 ${gameOfSquids.className}`}>Ready to build?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Showcase your skills, collaborate with top talent, and compete for exciting prizes at India's premier hackathon event. Register, build, present, and win at Code Carnival 2.0!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="text-white px-8 py-3 text-lg font-semibold"
                style={{
                  background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
                  border: `2px solid ${COLOR.pink}`,
                }}
              >
                <Link href={"https://events.adsc-atmiya.in/hackathons/475469d6-03ac-4894-8761-8200ea7f1a26"}>
                  REGISTER NOW
                </Link>
              </Button>
              <Button
                size="lg"
                className="text-white px-8 py-3 text-lg font-semibold"
                style={{
                  background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
                  border: `2px solid ${COLOR.pink}`,
                }}
              >
                <Link href={"/hackathons/code-carnival-2.0/problem-statements"}>
                  Problem Statements
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
