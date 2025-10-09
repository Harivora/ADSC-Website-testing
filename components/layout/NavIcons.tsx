import Image from "next/image";
import Link from "next/link";

const NavIcons = () => {
  return (
    <div className="flex items-center gap-4 md:gap-4">
      <Link href="https://whatsapp.com/channel/0029VaDA0a52f3EJBeidSK0B" className="group flex items-center justify-center gap-x-1.5" target="_blank">
        <Image src="/icons/whatsapp.svg" alt="Link to ADSC's whatsapp profile" width={25} height={25} />
        <span className="hidden text-xs text-white opacity-50 transition group-hover:opacity-100 md:inline">WhatsApp</span>
      </Link>
      <Link href="https://discord.gg/zTp84jPNQb" className="group flex items-center justify-center gap-x-1.5" target="_blank">
        <Image src="/icons/discord.svg" alt="Link to ADSC's discord profile" width={28} height={28} />
        <span className="hidden text-xs text-white opacity-50 transition group-hover:opacity-100 md:inline">Discord</span>
      </Link>
    </div>
  );
};
export default NavIcons;
