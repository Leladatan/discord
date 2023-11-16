import {Metadata, NextPage} from "next";
import currentProfile from "@/utils/current-profile";
import {redirectToSignIn} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import Loader from "@/components/loaders/HashLoader";

export const metadata: Metadata = {
    title: 'Invite link discord',
    description: 'Invite link discord',
}


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
        <div className="flex items-center justify-center">
            <h1>Hello, Invite Code!</h1>
            <Loader size={50} color="#8b60a3" />
        </div>
    );
};

export default InviteCodePage;
