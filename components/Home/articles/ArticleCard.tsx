import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ArticleCard = () => {
  return (
    <Link href="https://gdsc-atmiyauniversity.vercel.app/TechTales.pdf" target="_blank">
      <Card className="max-w-[1200px] border-none bg-background shadow-2xl transition-all hover:-translate-y-1.5 hover:bg-[#1a1a1a4d]">
        <CardHeader className="space-y-3">
          <CardTitle className="text-white">Tech Tales</CardTitle>
          <CardDescription className="text-silverchalice">Explore the dynamic world of our club in Innovate & Elevate. From AI-hosted events and programming fundamentals to data insights and hackathon chronicles, journey through our past works and the Google Solution Challenge. Introducing Innovate & Elevate this magazine offers a sneak peek into the vibrant events and collaborative innovation at GDSC.</CardDescription>
        </CardHeader>
        <CardFooter className="text-gray-400">6 min read · Nov 01, 2023</CardFooter>
      </Card>
    </Link>
  );
};
export default ArticleCard;
