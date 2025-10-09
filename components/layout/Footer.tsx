import Link from 'next/link';
import Logo from './Logo';
import Image from 'next/image';
import { socialLinks } from '@/constants/contacts';

const Footer = () => {
  return (
    <footer className="container mx-auto text-center">
      <div className="grid grid-cols-1 gap-8 px-6 py-16 text-left md:grid-cols-3">
        {/* Logo + Social Media Column */}
        <div className="flex flex-col items-center md:items-start">
          <Logo isLogoFooter />
          <ul className="flex gap-3 mt-5">
            {socialLinks.map((socialLink) => (
              <li key={socialLink.id}>
                <Link href={socialLink.path} target="_blank" className="flex items-center gap-2">
                  <Image src={socialLink.icon} alt={socialLink.alt} width={20} height={20} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Legal Column */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-code">Legal</h3>
          <ul className="flex flex-col gap-3 text-gray-400">
            <li><Link href="/legal/cookies">Cookies</Link></li>
            <li><Link href="/legal/privacy">Privacy</Link></li>
            <li><Link href="/legal/terms">Terms</Link></li>
          </ul>
        </div>
        {/* Sitemap Column */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-code">Sitemap</h3>
          <ul className="flex flex-col gap-3 text-gray-400">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/events">Events</Link></li>
            <li><Link href="/hackathons">Hackathons</Link></li>
            <li><Link href="https://events.adsc.atmiya.in">EMS</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
