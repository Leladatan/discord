import currentProfile from "@/utils/current-profile";
import {redirectToSignIn} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import ServerSidebar from "@/components/server/server-sidebar";

const ServerIdLayout = async ({children, params}: {children: React.ReactNode, params: {serverId: string}}) => {
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
        }
    });

    if (!server) {
        return redirect("/servers");
    }

    return (
        <div className="bg-white dark:bg-[#313338] h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="md:h-full md:pl-60">
                {children}
            </main>
        </div>
    );
};

export default ServerIdLayout;
