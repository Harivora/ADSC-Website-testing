import { TEAM_MEMBERS } from '@/constants/team';
import Marquee from '@/components/ui/marquee';
import TeamCard from './TeamCard';

const TeamDemo = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <Marquee pauseOnHover>
        {TEAM_MEMBERS.map((review) => (
          <TeamCard key={review.id} {...review} />
        ))}
      </Marquee>
    </div>
  );
};
export default TeamDemo;
