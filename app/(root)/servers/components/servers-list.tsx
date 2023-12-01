"use client";

import {type FC} from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Server} from "@prisma/client";
import {useRouter} from "next/navigation";
import {useOrigin} from "@/hooks/use-origin";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

interface ServersListProps {
    servers: Server[];
}

const ServersList: FC<ServersListProps> = ({servers}) => {
    const origin: string = useOrigin();
    const router: AppRouterInstance = useRouter();

    return (
        <div className="grid grid-cols-6 gap-x-20 gap-y-30">
            {servers.map(server => (
                <div key={server.id} className="flex flex-col justify-between items-center gap-2">
                    <div className="w-[100px] h-[100px] relative">
                        <Image src={server.imageUrl} alt="Server image" fill
                               className="object-center object-cover rounded-full"/>
                    </div>
                    <h2 className="w-[100px] font-bold line-clamp-2 break-words text-center">
                        {server.name}
                    </h2>
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={(): void => {
                            router.push(`${origin}/invite/${server?.inviteCode}`);
                            router.refresh();
                        }}
                    >
                        Join
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default ServersList;
