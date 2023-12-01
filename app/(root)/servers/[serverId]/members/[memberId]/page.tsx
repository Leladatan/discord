import React from 'react';
import {Member, Profile, Server} from "@prisma/client";
import {Metadata} from "next";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import currentProfile from "@/utils/current-profile";
import {redirectToSignIn} from "@clerk/nextjs";
import {getOrCreateConversation} from "@/lib/conversation";
import ChatHeader from "@/components/chat/chat-header";

type Props = {
  params: {
    memberId: string;
    serverId: string;
  }
};

type PropsServer = Server & {
  members: (Member & { profile: Profile })[];
} | null;

export async function generateMetadata({params: {serverId, memberId}}: Props): Promise<Metadata> {
  const server: PropsServer = await db.server.findFirst({
    where: {
      id: serverId,
       members: {
        some: {
          id: memberId
        }
      }
    },
    include: {
      members: {
        where: {
          id: memberId
        },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          profile: true
        }
      },
    }
  });

  if (!server) {
    return redirect("/servers");
  }

  return {
    title: `${server.name} | Member ${server.members[0].profile.name}`,
    description: `${server.name} | Member ${server.members[0].profile.name}`,
  };
}

const MemberIdPage = async ({params}: {params: {serverId: string, memberId: string}}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id
    },
    include: {
      profile: true
    }
  });

  if (!currentMember) {
    return redirect(`/servers`);
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

  if (!conversation) {
    return redirect(`/servers/${params.serverId}`);
  }

  const {memberOne, memberTwo} = conversation;

  const otherMember = memberOne.profile.id === profile.id ? memberTwo : memberOne;

  const server: PropsServer = await db.server.findFirst({
    where: {
      id: params.serverId,
      members: {
        some: {
          id: params.memberId
        }
      }
    },
    include: {
      members: {
        where: {
          id: params.memberId
        },
        orderBy: {
          createdAt: "asc",
        },
        include: {
          profile: true
        }
      },
    }
  });

  if (!server) {
    return redirect("/servers");
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader imageUrl={otherMember.profile.imageUrl} serverId={params.serverId} name={otherMember.profile.name} type={"conversation"} />
    </div>
  );
};

export default MemberIdPage;