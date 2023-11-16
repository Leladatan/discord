import {Metadata, NextPage} from "next";
import {initialProfile} from "@/lib/initial-profile";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";

export const metadata: Metadata = {
    title: 'Setup server',
    description: 'Setup server',
}

const SetupPage: NextPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        return redirect(`/servers`);
    }

    return (
        <InitialModal />
    );
};

export default SetupPage;
