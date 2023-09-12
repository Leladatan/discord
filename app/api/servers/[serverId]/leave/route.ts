import {NextResponse} from "next/server";
import currentProfile from "@/utils/current-profile";
import {db} from "@/lib/db";

export const PATCH = async (req: Request, { params }: { params: { serverId: string }}) => {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if (!params.serverId) {
            return new NextResponse("Server ID missing", {status: 400})
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: {not: profile.id},
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            },
        });

        return NextResponse.json(server);
    }   catch (e) {
        console.log("SERVER_ID_PATCH", e);
        return new NextResponse("Internal Error", {status: 500});
    }
};
