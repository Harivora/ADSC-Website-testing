import Image from "next/image";
import { MagicCard } from "@/components/ui/magic-card";
import { TeamMember } from "@/types/type";
import { LinkedinIcon, GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const TeamMemberCard = ({ img, name, role, department, socialLinks = {}, bgGradientColor = "#4A90E2", expertise = [] }: TeamMember) => {
  const displayedExpertise = expertise.slice(0, 3);
  const hiddenExpertise = expertise.slice(3);

  return (
    <MagicCard className="h-[240px] w-[460px] cursor-pointer border-none bg-background text-white" gradientColor={bgGradientColor} gradientOpacity={0.2}>
      <div className="relative flex flex-row p-6 gap-x-6">
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col items-center gap-y-4">
          <div className="size-[140px] rounded-md">
            <Image className="object-cover border-4 border-white rounded-full shadow-lg " width="140" height="140" alt={`${name}'s profile`} src={img} />
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {socialLinks.linkedin && (
              <Link href={socialLinks.linkedin} target="_blank" className="hover:text-blue-400">
                <LinkedinIcon size={24} />
              </Link>
            )}
            {socialLinks.github && (
              <Link href={socialLinks.github} target="_blank" className="hover:text-gray-400">
                <GithubIcon size={24} />
              </Link>
            )}
            {socialLinks.twitter && (
              <Link href={socialLinks.twitter} target="_blank" className="hover:text-blue-300">
                <TwitterIcon size={24} />
              </Link>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-blue-600/50">{role}</div>
          <div className="">
            <h3 className="mt-4 text-xl font-bold">{name}</h3>
            <p className="text-sm text-gray-300">{department}</p>
          </div>

          {/* Expertise Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {displayedExpertise.map((skill) => (
                <span key={skill} className="px-2 py-1 text-xs rounded-md bg-blue-500/30">
                  {skill}
                </span>
              ))}

              {hiddenExpertise.length > 0 && (
                <div className="relative flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="h-full">
                        <span className="h-full px-2 py-1 text-xs rounded-md bg-blue-500/30">+{hiddenExpertise.length}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="z-50 flex flex-col gap-y-2">
                          {hiddenExpertise.map((skill) => (
                            <span key={skill} className="px-2 py-1 text-xs rounded-md bg-blue-500/30">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MagicCard>
  );
};
export default TeamMemberCard;
