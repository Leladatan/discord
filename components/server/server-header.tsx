"use client";

import {type FC} from 'react';
import {Member, MemberRole, Profile, Server} from "@prisma/client";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users} from "lucide-react";
import {useModal} from "@/hooks/use-modal-store";

type ServerProps = Server & {
    members: (Member & { profile: Profile })[];
};

interface ServerHeader {
    server: ServerProps;
    role?: MemberRole;
}

const ServerHeader: FC<ServerHeader> = ({server, role}) => {
    const {onOpen} = useModal();

    const isAdmin: boolean = role === MemberRole.ADMIN;
    const isModerator: boolean = isAdmin || role === MemberRole.MODERATOR;

    return (
        <>
            <div className="relative w-full h-[125px]">
                <Image src={server.bannerUrl} alt="Server banner" fill className="object-cover object-center" />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none" asChild>
                    <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200
                     dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                    >
                        {server.name}
                        <ChevronDown className="h-5 w-5 ml-auto" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                    {isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("invite", {server})}
                            className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                        >
                            Invite People
                            <UserPlus className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("editServer", {server})}
                            className="px-3 py-2 text-sm cursor-pointer"
                        >
                            Server settings
                            <Settings className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("members", {server})}
                            className="px-3 py-2 text-sm cursor-pointer"
                        >
                            Manage members
                            <Users className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {isModerator && (
                        <DropdownMenuItem
                            onClick={() => onOpen("createChannel", {server})}
                            className="px-3 py-2 text-sm cursor-pointer"
                        >
                            Create channel
                            <PlusCircle className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {isModerator && (
                        <DropdownMenuSeparator />
                    )}
                    {isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("deleteServer", {server})}
                            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                        >
                            Delete server
                            <Trash className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                    {!isAdmin && (
                        <DropdownMenuItem
                            onClick={() => onOpen("leaveChannel", {server})}
                            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                        >
                            Leave server
                            <LogOut className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default ServerHeader;
