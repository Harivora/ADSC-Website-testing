import { events, Event } from "@/constants/projects";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const getLastEvents = (arr: Event[], n: number): Event[] => {
  return arr.slice(-n).reverse(); // Show most recent first
};

const EventsSection = () => {
  const lastEvents = getLastEvents(events, 3);
  return (
    <section className="relative py-24">
      <div className="mb-12 space-y-8 px-6 md:mb-0 xl:px-56">
        <h2 className="h2-bold">Events</h2>
        <p className="regular-paragraph max-w-[835px]">
          At <span className="text-yellow-600">ADSC</span>, we organize interactive workshops, tech talks, hackathons, and hands-on sessions to empower students and foster collaboration. Explore our latest events and initiatives designed to spark innovation and learning.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8 mt-8 px-6 xl:px-44">
        {lastEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden" style={{ background: event.cardBg, border: `1px solid ${event.color}` }}>
            <div className="relative w-full h-48">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-whiteice">{event.name}</CardTitle>
              <div className="text-sm text-tundora">{event.category}</div>
              <div className="text-xs text-tundora">{event.date}</div>
            </CardHeader>
            <CardContent>
              <p className="mb-3 line-clamp-3 text-sm text-whiteice">{event.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {event.tags.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="text-right font-Silkscreen text-[12px] font-normal uppercase text-whiteice"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button asChild size="lg">
          <Link href="/events">View All Events</Link>
        </Button>
      </div>
      <div className="projects-grid-pattern-bottom absolute bottom-0 -z-10 h-48 w-full" />
    </section>
  );
};
export default EventsSection;
