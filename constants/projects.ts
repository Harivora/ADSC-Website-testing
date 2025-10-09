// Updated Event type with clear field names
export interface Event {
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

export const events: Event[] = [
  {
    id: "1",
    image: "/images/events/orientenation-session.jpg",
    name: "ADSC - Orientenation Session",
    category: "Orientation and introductory session",
    tags: ["typescript", "tailwindcss", "tamagui", "nextjs", "clerk", "convex", "vercel"],
    description: " The ADSC - Orientation Session is an event designed to introduce new members to the ADSC community and provide an overview of the club's activities, initiatives, and opportunities. The session covers topics such as the club's mission, vision, and values, as well as the various projects, workshops, and events that members can participate in. The goal of the orientation session is to welcome new members, help them get acquainted with the club, and inspire them to get involved and make a positive impact in the tech community.",
    date: "Feb 01, 2025",
    viewUrl: "https://www.youtube.com/live/7gSnJTBxVjc",
    color: "rgba(34,197,94)", // Green
    btnBg: "rgba(21,128,61,0.5)",
    btnBgHover: "rgba(20,83,45)",
    cardBg: "rgba(21,128,61,0.05)",
  },
  {
    id: "2",
    image: "/images/events/web-dev-seminar.jpeg",
    name: "Web Development Seminar",
    category: "Technical Fest / Academic Fests",
    tags: ["HTML", "CSS", "JavaScript", "API", "JSON", "Tenor API"],
    description: "An interactive hands-on web development seminar where participants learned to build 'Meme Blast' - a dynamic web application that fetches and displays memes using the Tenor API. The session covered fundamental web technologies including HTML, CSS, and JavaScript, with practical examples of API integration, JSON data handling, and DOM manipulation. Participants gained real-world experience in building responsive web applications while creating an engaging meme search interface.",
    date: "Feb 27, 2025",
    viewUrl: "https://www.youtube.com/live/JpZph22bF4E",
    color: "rgba(168,85,247)", // Purple
    btnBg: "rgba(126,34,206,0.5)",
    btnBgHover: "rgba(88,28,135)",
    cardBg: "rgba(126,34,206,0.05)",
  },
  {
    id: "3",
    image: "/images/events/the-empowering-education-with-ai.webp",
    name: "Empowring Education With AI",
    category: "Smart Tools For Smarter Teaching",
    tags: ["Notebook LM", "Mentimeter", "Gamma AI", "Perplexity AI", "Suno AI", "Elicit", "Canva Magic Write", "Notion AI"],
    description: "The Empowering Education with AI workshop, organized by the Atmiya Developer Student Club (ADSC), aimed to showcase how artificial intelligence can revolutionize the education sector by making teaching more efficient, personalized, and impactful",
    date: "Jul 23, 2025",
    color: "rgba(59,130,246)", // Blue
    btnBg: "rgba(29,78,216,0.5)",
    btnBgHover: "rgba(30,58,138)",
    cardBg: "rgba(29,78,216,0.05)",
  },
  {
    id: "4",
    image: "/images/events/empowering-bioscience-with-ai.jpeg",
    name: "Empowering Bioscience With AI",
    category: "Smart Tools For Smarter Learning",
    tags: ["BioRender", "AlphaFold", "Sider AI", "Notebook LM", "Gamma AI", "Mentimeter", "Consensus"],
    description: "Empowering Bioscience With AI is a forward-thinking event focused on demonstrating how artificial intelligence can transform bioscience education and research. Attendees will explore innovative AI-powered tools and platforms that enhance learning, streamline research workflows, and enable smarter data analysis in the biosciences. The session aims to inspire students and educators to leverage AI for deeper insights, improved productivity, and more engaging learning experiences in the field of bioscience.",
    date: "Aug 08, 2025",
    viewUrl: "https://youtu.be/HRdWhHsaVFg",
    color: "rgba(234,179,8)", // Yellow
    btnBg: "rgba(202,138,4,0.5)",
    btnBgHover: "rgba(133,77,14)",
    cardBg: "rgba(202,138,4,0.05)",
  },
  {
    id: "5",
    image: "/images/events/discord-linkedin-unlocked.png",
    name: "LinkedIn Unlocked: Discord Event",
    category: "Live LinkedIn Profile Reviews & Optimization",
    tags: [
      "Live Profile Reviews",
      "LinkedIn Optimization",
      "Recruiter Insights",
      "Networking Guidance",
      "Q&A Session"
    ],
    description:
      "A special Discord event focused on helping students unlock the full potential of their LinkedIn profiles. The session features live reviews of selected student profiles, actionable tips to optimize your headline, about section, and more. Discover secrets to building a recruiter-ready profile, get guidance on boosting your visibility through activity and networking, and enjoy a chance to ask your questions live for personalized advice.",
    date: "Aug 23, 2025",
    registerUrl: "https://discord.gg/zTp84jPNQb",
    color: "rgba(244,63,94)", // Rose
    btnBg: "rgba(29,78,216,0.5)",
    btnBgHover: "rgba(30,58,138)",
    cardBg: "rgba(29,78,216,0.05)",
  },
  {
    id: "6",
    image: "/images/events/intro-to-git-and-github-workshop.jpeg",
    name: "Intro To Git & GitHub - Workshop",
    category: "Version Control & Collaboration Made Easy",
    tags: [
      "Git & Version Control",
      "Repositories & Branches",
      "GitHub Collaboration",
      "Hands-on Practice"
    ],
    description:
      "A practical workshop designed to introduce students to the fundamentals of Git and GitHub. Learn the essentials of version control, how to work with repositories and branches, collaborate effectively on GitHub, and gain hands-on experience with real-world scenarios. Perfect for beginners and anyone looking to strengthen their collaboration skills in software development. Held on 29th August 2025 at 422 Seminar Hall, B Wing, Atmiya University.",
    date: "Aug 29, 2025",
    registerUrl: "https://events.adsc-atmiya.in/events/63f61010-d4da-475b-9707-b9ce577e67bb",
    color: "rgba(59,130,246)", // Blue
    btnBg: "rgba(29,78,216,0.5)",
    btnBgHover: "rgba(30,58,138)",
    cardBg: "rgba(29,78,216,0.05)",
  },
  {
    id: "7",
    image: "/images/events/web3-simplified.jpg",
    name: "Web3 Simplified - Workshop",
    category: "Decentralized Web & Blockchain Basics",
    tags: [
      "Web3 Fundamentals",
      "Blockchain Basics",
      "Smart Contracts",
      "Hands-on DApp Development"
    ],
    description:
      "A comprehensive workshop aimed at demystifying Web3 and blockchain technology. Participants will learn the core concepts of Web3, understand how blockchain works, explore the role of smart contracts, and gain practical experience in building decentralized applications (DApps). This session is perfect for beginners and anyone interested in the future of the internet and decentralized technologies. Held on 5th September 2025 at 422 Seminar Hall, B Wing, Atmiya University.",
    date: "Sep 16, 2025",
    registerUrl: "https://events.adsc-atmiya.in/events/854f54b3-a748-4b44-89db-9cd7557e8a75",
    color: "rgba(168,85,247)", // Purple
    btnBg: "rgba(126,34,206,0.5)",
    btnBgHover: "rgba(88,28,135)",
    cardBg: "rgba(126,34,206,0.05)",
  }
];
