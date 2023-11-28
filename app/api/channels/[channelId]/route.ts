import {NextResponse} from "next/server";
import currentProfile from "@/utils/current-profile";
import {db} from "@/lib/db";
import {MemberRole} from "@prisma/client";

export const DELETE = async (req: Request, {params}: {params: {channelId: string}}) => {
  try {
    const profile = await currentProfile();
    const {searchParams} = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (!serverId) {
        return new NextResponse("Server ID missing", {status: 400});
    }

    if (!params.channelId) {
      return new NextResponse("Channel ID missing", {status: 400});
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            }
          }
        }
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            }
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log("[CHANNEL_ID_DELETE]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const PATCH = async (req: Request, {params}: {params: {channelId: string}}) => {
  try {
    const profile = await currentProfile();
    const {searchParams} = new URL(req.url);

    const {name, type} = await req.json();

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", {status: 400});
    }

    if (!params.channelId) {
      return new NextResponse("Channel ID missing", {status: 400});
    }

    if (!name) {
      return new NextResponse("Channel name is null", {status: 400});
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            }
          }
        }
      },
      data: {
        channels: {
          update: {
            where: {
              id: params.channelId,
              name : {
                not: "general",
              }
            },
            data: {
              name,
              type
            }
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (e) {
    console.log("[CHANNEL_ID_PATCH]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
