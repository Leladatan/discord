import React from 'react';
import {Metadata} from "next";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import {Server, Channel} from "@prisma/client";
import Image from "next/image";

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
  const server: PropsServer = await db.server.findUnique({
    where: {
      id: params.serverId,
      channels: {
        some: {
          id: params.channelId
        }
      }
    },
    include: {
      channels: {
        where: {
          id: params.channelId
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

  return (
    <>
      <div className="relative w-80 h-80">
        <Image src={server.imageUrl} alt={"Server avatar"} fill/>
      </div>
      {server.channels[0].name}
    </>
  );
};

export default ChannelIdPage;