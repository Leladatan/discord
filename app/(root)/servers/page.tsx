import {redirectToSignIn} from "@clerk/nextjs";
import {db} from "@/lib/db";
import Image from "next/image";
import currentProfile from "@/utils/current-profile";

const ServersPage = async () => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const servers = await db.server.findMany();

    if (servers.length === 0) {
        return <h1>Not found servers</h1>;
    }

    return (
        <div className="grid grid-cols-4">
            {servers.map(server => (
                <div key={server.id}>
                    <h1>{server.name}</h1>
                    <div className="w-[100px] h-[100px] relative">
                        <Image src={server.imageUrl} alt="Server image" fill className="object-center object-cover rounded-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServersPage;
