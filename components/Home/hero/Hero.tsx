import { cn } from "@/lib/utils";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import Link from "next/link";

const Hero = async () => {
  return (
    <section className="relative px-6 pb-44" style={{ contain: "layout" }}>
      <div className="pt-48">
        <h1 className="flex flex-col items-start h1-bold md:items-center">
          <span>Empowering</span>
          <span>The Next Generation</span>
          <span>of Innovators</span>
        </h1>
      </div>

      <div className="flex flex-col-reverse gap-8 mt-12 md:flex-row md:justify-center md:gap-20 lg:gap-32">
        <div className="flex flex-col items-start gap-4 w-fit">
          <p className="font-normal text-gray-400 uppercase font-Silkscreen md:mt-8 md:text-2xl">ADSC · Empowering Students</p>
          <div>
            <Link href={"https://events.adsc-atmiya.in/register"} target={"_blank"}>
              <AnimatedGradientText className="px-5 py-2 text-lg rounded-full hover:cursor-pointer">
                🤝 <hr className="w-px h-4 mx-2 bg-gray-400 shrink-0" /> <span className={cn(`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`)}>Join the Movement</span>
              </AnimatedGradientText>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 md:flex-col">
          <p className="font-normal text-gray-400 uppercase font-Silkscreen">Focused on...</p>
          <p className="w-fit rounded-md bg-celtic px-2 font-Silkscreen text-[18px] font-normal uppercase">
            <span className="text-oceangreen">Collaboration</span>
          </p>
          <p className="w-fit rounded-md bg-downriver px-2 font-Silkscreen text-[18px] font-normal uppercase">
            <span className="text-dodgerblue">Innovation</span>
          </p>
          <p className="w-fit rounded-md bg-antiquebronze px-2 font-Silkscreen text-[18px] font-normal uppercase">
            <span className="text-foreground">Growth</span>
          </p>
          <p className="w-fit rounded-md bg-revolver px-2 font-Silkscreen text-[18px] font-normal uppercase">
            <span className="text-violet-400/85">Diverse Skills</span>
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 -z-20 size-full overflow-hidden opacity-50 [mask-image:radial-gradient(900px_circle_at_top,#000,transparent)]">
        <AnimatedGridPattern numSquares={120} maxOpacity={0.2} duration={5} repeatDelay={1} colors={["rgba(60, 177, 121, 1)", "rgba(157, 91, 210, 1)", "rgba(205, 43, 49, 1)", "rgba(189, 75, 0, 1)", "rgba(247, 206, 0, 1)", "rgba(250, 147, 78, 1)", "rgba(54, 158, 255, 1)"]} className="inset-x-[4.5px] inset-y-[-30%] h-[150%]" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(#000_50%,transparent)]">
        <div className="absolute inset-0 pointer-events-none grid-pattern" />
      </div>
    </section>
  );
};

export default Hero;
