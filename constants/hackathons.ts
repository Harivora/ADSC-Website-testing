export interface Hackathon {
  id: string;
  image: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  date: string;
  viewUrl?: string;
  registerUrl?: string;
  color: string;
  btnBg: string;
  btnBgHover: string;
  cardBg: string;
}

export const hackathons: Hackathon[] = [
  {
    id: "1",
    image: "/images/events/inter-college-hackthon.JPG",
    name: "Inter College Hackathon",
    category: "Technical fest/academic fests",
    tags: ["next.js", "typescript", "clerck", "tailwindcss", "mongodb", "mongoose", "clerck webhooks"],
    description: `Inter College Hackathon is a competitive event where students from various colleges come together to solve real-world problems using technology. This project showcases a platform built to manage and display the hackathon details, participants, and their projects. The application leverages modern web technologies to provide a seamless and interactive experience for users.`,
    date: "Sep 29, 2023",
    color: "rgba(59,130,246)", // Blue
    btnBg: "rgba(29,78,216,0.5)",
    btnBgHover: "rgba(30,58,138)",
    cardBg: "rgba(29,78,216,0.05)",
  },
  {
    id: "2",
    image: "/images/events/code-carnival.jpg",
    name: "Code Carnival - The Open Hackathon",
    category: "Open Hackathon",
    tags: ["react", "typescript", "tailwindcss", "nx", "rollup", "Module Federation", "vitest", "playwright", "storybook", "svgr", "lint-staged", "husky", "ci/cd", "aws"],
    description: "Code Carnival - The Open Hackathon is an inclusive event designed to bring together developers, designers, and tech enthusiasts from all backgrounds to collaborate on innovative projects. Participants are encouraged to push the boundaries of technology and creativity, working on projects that range from web applications to AI-driven solutions. This hackathon emphasizes learning, networking, and the spirit of open-source collaboration, providing a platform for individuals to showcase their skills and make meaningful contributions to the tech community.",
    date: "Feb 03, 2024",
    color: "rgba(234,88,12)", // Orange
    btnBg: "rgba(154,52,18,0.5)",
    btnBgHover: "rgba(124,45,18)",
    cardBg: "rgba(154,52,18,0.05)",
  },
  {
    id: "3",
    image: "/images/events/au-hackthon.webp",
    name: "AU Internal Hackathon",
    category: "Internal College Competition",
    tags: ["AI/ML", "WEB3", "IoT", "react", "node.js", "express", "mongodb", "bootstrap", "github", "figma", "problem-solving"],
    description: "AU Internal Hackathon was a 12-hour non-stop coding event exclusively for Atmiya University students. Participants tackled diverse problem statements from cutting-edge technologies such as AI/ML, WEB3, IoT, and more. The hackathon fostered innovation, teamwork, and technical excellence, providing a platform for students to showcase their skills and creativity.",
    date: "Mar 22, 2025",
    registerUrl: "https://forms.gle/s6dhfVKgCCdFgz7m9",
    color: "rgba(200,100,247)", // Purple
    btnBg: "rgba(126,34,206,0.5)",
    btnBgHover: "rgba(88,28,135)",
    cardBg: "rgba(126,34,206,0.05)",
  },
  {
    id: "4",
    image: "/images/events/code-carnival-season-2.jpeg",
    name: "Code Carnival 2.0",
    category: "Open Hackathon",
    tags: ["react", "node.js", "express", "mongodb", "bootstrap", "github", "figma", "problem-solving"],
    description: "Code Carnival 2.0 is India's premier national-level hackathon, bringing together top talent to solve industry-powered problem statements. Participants collaborate, innovate, and compete for exciting prizes in a vibrant, inclusive environment. Showcase your skills, build impactful solutions, and win from a massive prize pool. Join us to learn, network, and make your mark at Code Carnival 2.0!",
    date: "Oct 4, 2025",
    viewUrl: "https://adsc-atmiya.in/hackathons/code-carnival-2.0",
    registerUrl: "https://events.adsc-atmiya.in/hackathons/475469d6-03ac-4894-8761-8200ea7f1a26",
    color: "rgba(236,72,153)", // Pink (Squid Game style)
    btnBg: "rgba(219,39,119,0.5)",
    btnBgHover: "rgba(190,24,93)",
    cardBg: "rgba(219,39,119,0.05)",
  },
]
