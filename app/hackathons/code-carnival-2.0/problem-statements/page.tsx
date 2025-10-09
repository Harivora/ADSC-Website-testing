"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import localFont from "next/font/local";
import { problemStatements, categories, ProblemStatement } from "@/components/hackathons/code-carnival-2.0/problem-statement-constants";
import { COLOR } from "@/components/hackathons/code-carnival-2.0/constants";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

const gameOfSquids = localFont({
  src: [
    {
      path: '../GameOfSquids.ttf',
      weight: '400',
      style: 'medium',
    },
  ],
  variable: '--font-game-of-squids',
});

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredProblems, setFilteredProblems] = useState(problemStatements);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<ProblemStatement | null>(null);

  useEffect(() => {
    let filtered = [...problemStatements];

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(ps =>
        Array.isArray(ps.category)
          ? ps.category.includes(selectedCategory)
          : false
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ps =>
        ps.title.toLowerCase().includes(query) ||
        ps.description.toLowerCase().includes(query) ||
        ps.code.toLowerCase().includes(query) ||
        ps.by.toLowerCase().includes(query)
      );
    }

    setFilteredProblems(filtered);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-block px-6 py-2 rounded-full mb-8"
            style={{
              background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
              border: `2px solid ${COLOR.pink}`,
              color: "#fff",
              fontWeight: 600,
              letterSpacing: "0.08em",
              fontSize: "0.9rem",
            }}
          >
            <span>🎯 Problem Statements</span>
          </div>
          <h1 className={`text-5xl md:text-6xl font-bold mb-8 ${gameOfSquids.className}`}>Code Carnival 2.0</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Choose from a variety of exciting problem statements from our industry partners and build innovative solutions.
          </p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="p-6" style={{
            background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
            border: `2px solid ${COLOR.pink}`,
          }}>
            <CardHeader>
              <CardTitle className={`text-2xl text-white mb-6 ${gameOfSquids.className}`}>Filter Problem Statements</CardTitle>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by keyword, title, or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-background/5 border-none text-white"
                  />
                </div>
                <div className="w-full md:w-64">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="bg-background/5 border-none text-white">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section className="py-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden" style={{
            background: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
            border: `2px solid ${COLOR.pink}`,
          }}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-background/5">
                    <TableHead className="text-white font-bold">PS Code</TableHead>
                    <TableHead className="text-white font-bold">Title</TableHead>
                    <TableHead className="text-white font-bold">Category</TableHead>
                    <TableHead className="text-white font-bold">By</TableHead>
                    <TableHead className="text-white font-bold w-1/3">Problem Statement</TableHead>
                    <TableHead className="text-white font-bold text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProblems.length > 0 ? (
                    filteredProblems.map((ps) => (
                      <TableRow key={ps.code} className="hover:bg-background/5 border-t border-white/10">
                        <TableCell className="font-mono text-white/80">{ps.code}</TableCell>
                        <TableCell className="font-semibold" style={{ color: COLOR.lightpink }}>{ps.title}</TableCell>
                        <TableCell className="text-white/80 flex flex-col sm:flex-row gap-2 sm:gap-4">
                          {Array.isArray(ps.category)
                            ? ps.category.map((cat: string) => <Pill key={cat} data={cat} />)
                            : <Pill data={ps.category} />}
                        </TableCell>
                        <TableCell className="text-white/80">{ps.by}</TableCell>
                        <TableCell className="text-white/80">
                          <div className="line-clamp-3 text-sm">
                            {ps.description}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => {
                              setOpenDialog(true);
                              setSelectedProblem(ps);
                            }}
                            variant="outline"
                            className="text-white bg-[#5A4A4A] hover:text-white hover:bg-pink-900/50"
                            style={{
                              borderColor: COLOR.pink
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-white/70">
                        No problem statements found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="cta-section p-12 text-center relative z-10">
            <h2 className={`text-4xl font-bold mb-4 ${gameOfSquids.className}`}>Ready to solve problems?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choose a problem statement that excites you, gather your team, and start building innovative solutions for Code Carnival 2.0!
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
                <Link href={"https://events.adsc-atmiya.in/master/hackathons/475469d6-03ac-4894-8761-8200ea7f1a26"}>
                  REGISTER NOW
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {selectedProblem && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProblem.title}</DialogTitle>
              <DialogDescription className="flex flex-col gap-2 sm:gap-4">
                <Pill data={selectedProblem.code} />
                {Array.isArray(selectedProblem.category)
                  ? selectedProblem.category.map((cat: string) => <Pill key={cat} data={cat} />)
                  : <Pill data={selectedProblem.category} />}
                <Pill data={selectedProblem.by} />
              </DialogDescription>
            </DialogHeader>
            <div className="flex-wrap overflow-auto max-h-[60vh] mt-4">
              <p className="text-white font-bold">Statement</p>
              <p className="text-white/90 mt-2">{selectedProblem.description}</p>
              <p className="text-white font-bold mt-4">Expected Solution</p>
              <p className="text-white/90 mt-2">{selectedProblem.solution}</p>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function Pill({ data }: { data: string }) {
  return (
    <div className="px-4 py-1 rounded-full bg-pink-900/40 border border-pink-400 text-white font-mono text-sm flex justify-center items-center">
      {data}
    </div>
  )
}
