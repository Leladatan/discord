"use client";

import React, {FC} from 'react';
import {Member, MemberRole, Profile, Server} from "@prisma/client";
import {ShieldAlert, ShieldCheck} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import UserAvatar from "@/components/ui/user-avatar";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {getNormalizeDate} from "@/utils/getNormalizeDate";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconsMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-indigo-500"/>
};

const ServerMember: FC<ServerMemberProps> = ({member, server}) => {
  const params = useParams();
  const router: AppRouterInstance = useRouter();

  const icon = roleIconsMap[member.role];
  const createdAtProfile: string = getNormalizeDate(member.profile.createdAt);

  const onRedirect = (): void => {
    router.push(`/servers/${server.id}/members/${member.id}`)
  };

  if (!params) {
    return null;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button
          onClick={onRedirect}
          className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition md-1",
            params.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
          )}
        >
          <UserAvatar
            profile={member.profile}
            className="h-8 w-8 md:h-8 md:w-8"
          />
          <p
            className={cn("font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
              params.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
            {member.profile.name}
          </p>
          {icon}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="flex flex-col gap-y-3 w-60 bg-neutral-100 dark:bg-zinc-700">
        <div className="flex items-center gap-2">
          <UserAvatar
            profile={member.profile}
            className="h-8 w-8 md:h-8 md:w-8"
          />
          <p
            className={cn("font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
              params.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
            {member.profile.name}
          </p>
        </div>
        <div>
          <p>
            {member.profile.email}
          </p>
        </div>
        <div>
          <p>
            В числе участников Discord с {createdAtProfile}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ServerMember;