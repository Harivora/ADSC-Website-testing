import About from "@/components/Home/about/About";
import Articles from "@/components/Home/articles/Articles";
import Contact from "@/components/Home/contact/Contact";
import Hero from "@/components/Home/hero/Hero";
import EventSection from "@/components/Home/events/EventSection";
import Techs from "@/components/Home/techs/Techs";
import CoreTeam from "@/components/Home/core-team/CoreTeam";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Techs />
      <EventSection />
      <Articles />
      <CoreTeam />
      <Contact />
    </>
  );
}
