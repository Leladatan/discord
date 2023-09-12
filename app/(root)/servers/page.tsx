import {redirectToSignIn} from "@clerk/nextjs";
import {db} from "@/lib/db";
import currentProfile from "@/utils/current-profile";
import ServersList from "@/app/(root)/servers/components/servers-list";

const ServersPage = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const servers = await db.server.findMany({
        where: {
            NOT: {
                members: {
                    some: {
                        profileId: profile.id,
                    }
                }
            }
        }
    });

    return (
        <div className="flex flex-col items-center justify-between p-3">
            {servers.length !== 0
                ?
                <ServersList servers={servers}/>
                :
                <h1>Not found servers</h1>
            }
        </div>
    );
};

export default ServersPage;
