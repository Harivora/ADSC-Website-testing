import DotPattern from '@/components/ui/dot-pattern';
import TeamDemo from './TeamDemo';

const CoreTeam = () => {
  return (
    <section className="relative py-24">
      <div className="z-10 flex flex-col px-6 md:items-center md:justify-center">
        <h3 className="h3-bold">Meet Our core team</h3>
      </div>

      <TeamDemo />

      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="opacity-50 dot-pattern"
      />
    </section>
  );
};
export default CoreTeam;
