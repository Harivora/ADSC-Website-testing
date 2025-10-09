import { hackathons } from "@/constants/hackathons";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="min-h-screen px-4 py-10 md:px-16">
      <div className="grid gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {hackathons.map(Hackthon => (
          <Card key={Hackthon.id} className="overflow-hidden" style={{ background: Hackthon.cardBg, border: `1px solid ${Hackthon.color}` }}>
            <div className="relative w-full h-48">
              <Image
                src={Hackthon.image}
                alt={Hackthon.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-whiteice">{Hackthon.name}</CardTitle>
              <div className="text-sm text-tundora">{Hackthon.category}</div>
              <div className="text-xs text-tundora">{Hackthon.date}</div>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm line-clamp-3 text-whiteice">{Hackthon.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {Hackthon.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-right font-Silkscreen text-[12px] font-normal uppercase text-whiteice"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              {Hackthon.viewUrl && (
                <Button size="sm">
                  <a
                    href={Hackthon.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Hackthon
                  </a>
                </Button>
              )}
              {Hackthon.registerUrl && (
                <Button size="sm">
                  <a
                    href={Hackthon.registerUrl}
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
