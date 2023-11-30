import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import {redirectToSignIn} from "@clerk/nextjs";
import {Metadata} from "next";
import currentProfile from "@/utils/current-profile";

type Props = {
  params: {
    serverId: string
  }
}


export async function generateMetadata({params: {serverId}}: Props): Promise<Metadata> {
  const server = await db.server.findFirst({
    where: {
      id: serverId
    }
  });

  if (!server) {
    return redirect("/servers");
  }

  return {
    title: `${server.name}`,
    description: `${server.name}`,
  };
}


const ServerPage = async ({params}: { params: { serverId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  });

  if (!server) {
    return redirect("/servers");
  }

  const initialChannel = server.channels[0];

  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`);
};

export default ServerPage;
