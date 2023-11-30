import {type FC} from 'react';
import currentProfile from "@/utils/current-profile";
import {redirectToSignIn} from "@clerk/nextjs";
import {ChannelType, MemberRole} from "@prisma/client";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import ServerHeader from "@/components/server/server-header";
import {ScrollArea} from "@/components/ui/scroll-area";
import ServerSearch from "@/components/server/server-search";
import {Hash, Mic, Shield, ShieldAlert, ShieldCheck, Video} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import ServerSection from "@/components/server/server-section";
import ServerChannel from "@/components/server/server-channel";
import ServerMember from "@/components/server/server-member";

interface ServerSidebarProps {
  serverId: string;
}

const icons = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4"/>,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"/>,
};

const roleIcons = {
  [MemberRole.GUEST]: <Shield className="h-4 w-4 ml-2 text-neutral-400"/>,
  [MemberRole.ADMIN]: <ShieldCheck className="h-4 w-4 ml-2 text-rose-500"/>,
  [MemberRole.MODERATOR]: <ShieldAlert className="h-4 w-4 ml-2 text-indigo-500"/>,
};

const ServerSidebar: FC<ServerSidebarProps> = async ({serverId}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      }
    },
  });

  if (!server) {
    return redirect("/servers");
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server.members.filter(member => member.profileId !== profile.id);

  const role = server.members.find(member => member.profileId === profile.id)?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader
        server={server}
        role={role}
      />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text channels",
                type: "channel",
                data: textChannels.map(channel => ({
                  id: channel.id,
                  name: channel.name,
                  icon: icons[channel.type],
                }))
              },
              {
                label: "Video channels",
                type: "channel",
                data: videoChannels.map(channel => ({
                  id: channel.id,
                  name: channel.name,
                  icon: icons[channel.type],
                }))
              },
              {
                label: "Members",
                type: "member",
                data: members.map(member => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIcons[member.role],
                }))
              },
              {
                label: "Audio channels",
                type: "channel",
                data: audioChannels.map(channel => ({
                  id: channel.id,
                  name: channel.name,
                  icon: icons[channel.type],
                }))
              },
            ]}
          />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
        {!!textChannels.length && (
          <div className="mb-2">
            <ServerSection sectionType={"channels"} role={role} channelType={ChannelType.TEXT} label={"Text Channels"}/>
            <div className="space-y-[2px]">
              {textChannels.map(channel => (
                <ServerChannel key={channel.id} channel={channel} role={role} server={server}/>
              ))}
            </div>
          </div>
        )}
        {!!audioChannels.length && (
          <div className="mb-2">
            <ServerSection sectionType={"channels"} role={role} channelType={ChannelType.AUDIO}
                           label={"Voice Channels"}/>
            <div className="space-y-[2px]">
              {audioChannels.map(channel => (
                <ServerChannel key={channel.id} channel={channel} role={role} server={server}/>
              ))}
            </div>
          </div>
        )}
        {!!videoChannels.length && (
          <div className="mb-2">
            <ServerSection sectionType={"channels"} role={role} channelType={ChannelType.VIDEO}
                           label={"Video Channels"}/>
            <div className="space-y-[2px]">
              {videoChannels.map(channel => (
                <ServerChannel key={channel.id} channel={channel} role={role} server={server}/>
              ))}
            </div>
          </div>
        )}
        {!!members.length && (
          <div className="mb-2">
            <ServerSection sectionType={"members"} role={role} label={"Members"} server={server}/>
            <div className="space-y-[2px]">
              {members.map(member => (
                <ServerMember key={member.id} member={member} server={server}/>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
