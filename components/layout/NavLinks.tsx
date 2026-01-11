import Link from "next/link";

const NavLinks = () => {
  return (
    <nav className="mt-16 flex flex-col items-center gap-4 font-Silkscreen text-3xl md:mt-0 md:flex-row md:text-sm">
      <Link className="py-4 md:py-0 md:hover:opacity-70" href="/events">
        Events
      </Link>
      <Link className="py-4 md:py-0 md:hover:opacity-70" href="/hackathons">
        Hackathons
      </Link>
      <Link className="py-4 md:py-0 md:hover:opacity-70" href="https://events.adsc-atmiya.in" target="_blank">
        EMS
      </Link>
    </nav>
  );
};

export default NavLinks;
