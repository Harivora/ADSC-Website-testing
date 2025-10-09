import { Trophy, BookText, Image } from "lucide-react";

export const COLOR = {
  pink: "#C44772",
  lightpink: "#E37198",
};

export const timelineData = [
  {
    phase: "Phase 1",
    date: "15th to 29th Sept",
    title: "Registration",
    description: "Register your team and get ready to code."
  },
  {
    phase: "Phase 2",
    date: "4th to 5th Oct",
    newDate: "10th to 11th Oct",
    title: "Hacking",
    description: "Build your innovative solutions."
  },
  {
    phase: "Phase 3",
    date: "4th & 5th Oct",
    newDate: "10th to 11th Oct",
    title: "Judging",
    description: "Present your projects to the judges."
  },
  {
    phase: "Phase 4",
    date: "5th Oct",
    newDate: "11th Oct",
    title: "Winners",
    description: "Announce the winners and celebrate."
  }
];

export const whoCanJoinData = [
  {
    title: "Solo & Teams",
    description: "Individual developers or full teams welcome."
  },
  {
    title: "All Builders",
    description: "Web3, AI, Mobile or any development projects."
  }
];

export const howToParticipateData = [
  {
    number: "1",
    title: "Register Yourself On Events Website",
    description: "Sign up on the events portal to get started."
  },
  {
    number: "2",
    title: "Create / Join Your Team In Hackathon",
    description: "Form a new team or join an existing one for the hackathon."
  },
  {
    number: "3",
    title: "Invite Other Members Using Email In Team",
    description: "Invite teammates via email. They must register on the events website before joining your team."
  },
  {
    number: "4",
    title: "Watch Demo Video For How To Register In Hackathon",
    description: "View the demo video for step-by-step registration guidance."
  }
];

export const baselineRewardsData = [
  {
    icon: <BookText className="w-4 h-4" />,
    title: "Resource Kit",
    subtitle: "Curated documentation with learning resources & project guides."
  },
  {
    icon: <Image className="w-4 h-4" />,
    title: "Themed Digital Wallpapers",
    subtitle: "Custom ADSC x Code Carnival digital wallpaper designs."
  },
  {
    icon: <Trophy className="w-4 h-4" />,
    title: "Participation Certificate",
    subtitle: "Code Carnival 2.0 participation certificate."
  }
];

export const seasonalPrizesData = [
  {
    rank: "#1",
    prize: "30,000 INR",
    gradient: "linear-gradient(135deg, #E9B2B2 60%, #FFE4E4 100%)",
  },
  {
    rank: "#2",
    prize: "20,000 INR",
    gradient: "linear-gradient(135deg, #403D3D 60%, #5A4A4A 100%)",
  },
  {
    rank: "#3",
    prize: "10,000 INR",
    gradient: "linear-gradient(135deg, #5A4A4A 60%, #E9B2B2 100%)",
  }
];

export const rulesData = [
  {
    title: "Eligibility",
    description: "Open to all University students."
  },
  {
    title: "Code of Conduct",
    description: "Follow a code of conduct promoting respectful behaviour."
  },
  {
    title: "Team Collaboration",
    description: "Collaboration is encouraged within teams but no plagiarism."
  },
  {
    title: "Technology Stack",
    description: "Free choice of technology stack and tools."
  },
  {
    title: "Demo and Presentation",
    description: "Present and demonstrate projects to judges."
  },
  {
    title: "Time Management",
    description: "Adhere to the hackathon schedule."
  },
  {
    title: "Organizer's Discretion",
    description: "Organizers may disqualify rule-violating teams."
  },
  {
    title: "Liability",
    description: "Participants are responsible for their equipment and belongings."
  }
];

export const evaluationCriteriaData = [
  { title: "Creativity", description: "Originality and uniqueness of the idea." },
  { title: "Functionality", description: "How well the solution works and meets requirements." },
  { title: "Presentation", description: "Clarity and effectiveness of the project presentation." },
  { title: "Technical Proficiency", description: "Skillful use of technology and tools." },
  { title: "Scalability", description: "Potential for growth and adaptability." },
  { title: "Problem Solving", description: "Effectiveness in addressing the challenge." },
  { title: "Teamwork", description: "Collaboration and communication within the team." },
  { title: "Innovation", description: "Forward-thinking and inventive approaches." },
  { title: "Social Impact", description: "Positive effect on society or community." },
  { title: "Documentation", description: "Quality and completeness of project documentation." },
];
