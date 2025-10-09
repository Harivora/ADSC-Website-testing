import Link from "next/link";

const Logo = ({ isLogoFooter = false }: { isLogoFooter?: boolean }) => {
  return (
    <Link href="/" className={`text-code font-bold uppercase ${isLogoFooter ? "text-3xl" : "text-2xl"}`}>
      <span className="text-valencia">A</span>
      <span className="text-oceangreen">D</span>
      <span className="text-azureradiance">S</span>
      <span className="text-supernova">C</span>
    </Link>
  );
};
export default Logo;
