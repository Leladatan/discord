import {NextPage} from "next";
import currentProfile from "@/utils/current-profile";
import {redirectToSignIn} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage: NextPage<InviteCodePageProps> = async ({params}) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    if (!params.inviteCode) {
        return redirect("/servers");
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    const server = await db.server.update({
        where: {
            inviteCode: params.inviteCode,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return (
        <div>
            Hello invite
        </div>
    );
};

export default InviteCodePage;
