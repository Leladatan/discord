import React from 'react';
import {Member, Profile, Server} from "@prisma/client";
import {Metadata} from "next";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";

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
    <div>
      {server.members[0].profile.name}
    </div>
  );
};

export default MemberIdPage;