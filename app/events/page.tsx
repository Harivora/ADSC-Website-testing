import { events } from "@/constants/projects";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  return (
    <div className="min-h-screen py-10 px-4 md:px-16">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {events.map(event => (
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
                {event.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-right font-Silkscreen text-[12px] font-normal uppercase text-whiteice"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              {event.viewUrl && (
                <Button size="sm">
                  <a
                    href={event.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Event
                  </a>
                </Button>
              )}
              {event.registerUrl && (
                <Button size="sm">
                  <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Register
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
