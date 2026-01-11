import About from "@/components/Home/about/About";
import Articles from "@/components/Home/articles/Articles";
import Contact from "@/components/Home/contact/Contact";
import Hero from "@/components/Home/hero/Hero";
import EventCountdown from "@/components/Home/events/EventCountdown";
import EventSection from "@/components/Home/events/EventSection";
import Techs from "@/components/Home/techs/Techs";
import CoreTeam from "@/components/Home/core-team/CoreTeam";
import Newsletter from "@/components/Home/newsletter/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Techs />
      <EventCountdown />
      <EventSection />
      <Articles />
      <CoreTeam />
      <Newsletter />
      <Contact />
    </>
  );
}
