import React from 'react';
import {Metadata} from "next";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import {Server, Channel, Member} from "@prisma/client";
import currentProfile from "@/utils/current-profile";
import {redirectToSignIn} from "@clerk/nextjs";
import ChatHeader from "@/components/chat/chat-header";

type Props = {
  params: {
    channelId: string;
    serverId: string;
  }
};

type PropsServer = Server & {
  channels: Channel[];
} | null;

export async function generateMetadata({params: {serverId, channelId}}: Props): Promise<Metadata> {
  const server: PropsServer = await db.server.findUnique({
    where: {
      id: serverId,
      channels: {
        some: {
          id: channelId
        }
      }
    },
    include: {
      channels: {
        where: {
          id: channelId
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    }
  });

  if (!server) {
    return redirect("/servers");
  }

  return {
    title: `${server.name} | Channel ${server.channels[0].name}`,
    description: `${server.name} | Channel ${server.channels[0].name}`,
  };
}

const ChannelIdPage = async ({params}: { params: { serverId: string, channelId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel: Channel | null = await db.channel.findUnique({
      where: {
        id: params.channelId
      }
  });

  const member: Member | null = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    }
  });

  if (!channel || !member) {
    return redirect(`/servers/${params.serverId}`);
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
        <ChatHeader name={channel.name} serverId={params.serverId} type={"channel"} />
    </div>
  );
};

export default ChannelIdPage;