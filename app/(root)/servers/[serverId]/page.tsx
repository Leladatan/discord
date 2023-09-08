import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import {auth, redirectToSignIn} from "@clerk/nextjs";
import Image from "next/image";

const ServerPage = async ({params}: {params: {serverId: string}}) => {
    const {userId} = auth();

    if (!userId) {
        return redirectToSignIn();
    }

    const server = await db.server.findFirst({
        where: {
            id: params.serverId
        }
    });

    if (!server) {
        return redirect("/servers");
    }

    return (
        <div>
            {server.name}
            <div className="w-[100px] h-[100px] relative">
                <Image src={server.imageUrl} alt="Server image" fill className="rounded-full object-cover object-center" />
            </div>
        </div>
    );
};

export default ServerPage;
