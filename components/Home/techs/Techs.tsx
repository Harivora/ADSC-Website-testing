import { slugs, techs } from "@/constants/skills";
import DotPattern from "@/components/ui/dot-pattern";
import IconCloud from "@/components/ui/icon-cloud";
import TechTag from "./TechTag";

const Techs = () => {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
      <div className="relative">
        <div className="flex flex-col items-center justify-center gap-8 rounded-lg bg-none">
          <p className="regular-paragraph z-10 max-w-[850px] md:text-center">
            <span className="text-yellow-600">ADSC</span> equips students with the tools and guidance needed to explore modern technologies and build impactful solutions.
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-2 md:max-w-[600px] md:items-center md:justify-center">
            {techs.map((tech) => (
              <TechTag key={tech.label} title={tech.label} gradientColor={tech.bgColor} />
            ))}
          </div>

          <div>
            <IconCloud iconSlugs={slugs} />
          </div>
        </div>
      </div>

      <DotPattern width={20} height={20} cx={1} cy={1} cr={1} className="bottom-0 border opacity-50 dot-pattern" />
    </section>
  );
};

export default Techs;
