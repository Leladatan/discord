import {v4 as uuidv4} from "uuid";
import {NextResponse} from "next/server";
import currentProfile from "@/utils/current-profile";
import {db} from "@/lib/db";
import {MemberRole} from "@prisma/client";

export const POST = async (req: Request) => {
    try {
        const {name, imageUrl, bannerUrl} = await req.json();
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const server = await db.server.create({
           data: {
               profileId: profile.id,
               name,
               imageUrl,
               bannerUrl,
               inviteCode: uuidv4(),
               channels: {create: [{name: "general", profileId: profile.id}]},
               members: {
                   create: [
                       {profileId: profile.id, role: MemberRole.ADMIN}
                   ]
               },
           }
        });

        return NextResponse.json(server);
    }   catch (error) {
        console.log("SERVERS_POST", error)
        return new NextResponse("Internal Error", {status: 500});
    }
};
