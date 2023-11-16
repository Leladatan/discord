"use client";

import {type FC, useState} from 'react';
import qs from "query-string";
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {useModal} from "@/hooks/use-modal-store";
import {Member, MemberRole, Profile, Server} from "@prisma/client";
import {ScrollArea} from "@/components/ui/scroll-area";
import UserAvatar from "@/components/ui/user-avatar";
import {Check, Gavel, Loader2, MoveVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";

type ServerProps = Server & {
    members: (Member & { profile: Profile })[];
};

const roleIcon = {
    "GUEST": <Shield className="h-4 w-4 ml-2 text-neutral-400" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
};

const MembersModal: FC = () => {
    const {onOpen, isOpen, onClose, type, data} = useModal();
    const [loadingId, setLoadingId] = useState<string>("");

    const router: AppRouterInstance = useRouter();

    const isOpenModal: boolean = isOpen && type === "members";

    const {server} = data as {server: ServerProps};

    const onRoleChange = async (memberId: string, role: MemberRole): Promise<void> => {
        try {
            setLoadingId(memberId);
            const url: string = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server.id,
                    memberId,
                }
            });

            const response = await axios.patch(url, {role});

            router.refresh();
            onOpen("members", {server: response.data});
        }   catch (e) {
            console.log(e);
        }   finally {
            setLoadingId("");
        }
    };

    const onKick = async (memberId: string): Promise<void> => {
        try {
            setLoadingId(memberId);

            const url: string = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server.id,
                }
            });

            const response = await axios.delete(url);
            router.refresh();
            onOpen("members", {server: response.data});
        }   catch (e) {

        }   finally {
            setLoadingId("");
        }
    };

    if (!server || !server.members) {
        return null;
    }

    return (
        <Dialog open={isOpenModal} onOpenChange={onClose}>
            <DialogContent className="bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white overflow-hidden overflow-y-auto scrollbar-thin">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Manage Members
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center text-zinc-500">
                    {server.members.length} Members
                </DialogDescription>
                <ScrollArea className="mt-9 max-h-[420px] pr-6">
                    {server.members.map(member => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar profile={member.profile}  />
                            <div className="fle flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member.profile.name}
                                    {roleIcon[member.role]}
                                </div>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                              <div className="ml-auto">
                                  <DropdownMenu>
                                      <DropdownMenuTrigger>
                                          <MoveVertical className="h-4 w-4 text-zinc-500" />
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent side="left">
                                          <DropdownMenuSub>
                                              <DropdownMenuSubTrigger className="flex items-center">
                                                  <ShieldQuestion className="w-4 h-5 mr-2" />
                                                  <span>Role</span>
                                              </DropdownMenuSubTrigger>
                                              <DropdownMenuPortal>
                                                  <DropdownMenuSubContent>
                                                      <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                                          <Shield className="h-4 w-4 mr-2" />
                                                          Guest
                                                          {member.role === "GUEST" && (
                                                            <Check className="h-4 w-4 ml-auto" />
                                                          )}
                                                      </DropdownMenuItem>
                                                      <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                                          <ShieldCheck className="h-4 w-4 mr-2" />
                                                          Moderator
                                                          {member.role === "MODERATOR" && (
                                                            <Check className="h-4 w-4 ml-auto" />
                                                          )}
                                                      </DropdownMenuItem>
                                                  </DropdownMenuSubContent>
                                              </DropdownMenuPortal>
                                          </DropdownMenuSub>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem onClick={() => onKick(member.id)}>
                                              <Gavel className="h-4 w-5 mr-2" />
                                              Kick
                                          </DropdownMenuItem>
                                      </DropdownMenuContent>
                                  </DropdownMenu>
                              </div>
                            )}
                            {loadingId === member.id && (
                              <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                            )}
                        </div>
                      ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default MembersModal;
