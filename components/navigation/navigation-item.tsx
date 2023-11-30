"use client";

import {type FC} from 'react';
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import ActionTooltip from "@/components/action-tooltip";
import {cn} from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import {LogOut, UserPlus} from "lucide-react";
import {Server} from "@prisma/client";
import {useModal} from "@/hooks/use-modal-store";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
  server: Server;
}

const NavigationItem: FC<NavigationItemProps> = ({id, name, imageUrl, server}) => {
  const {onOpen} = useModal();
  const router: AppRouterInstance = useRouter();
  const params = useParams();

  const onClick = (): void => {
    router.push(`/servers/${id}`);
  };

  return (
    <div className="mb-4">
      <ContextMenu>
        <ContextMenuTrigger>
          <ActionTooltip label={name} align="center" side="right">
            <button
              onClick={onClick}
              className="group relative flex items-center"
            >
              <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all duration-200 w-[4px]",
                params?.serverId !== id && "group-hover:h-[20px]",
                params?.serverId === id ? "h-[36px]" : "h-[8px]"
              )}
              />
              <div
                className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all duration-200 overflow-hidden",
                  params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                )}>
                <Image
                  src={imageUrl}
                  alt="Channel image"
                  fill
                  className="cursor-pointer object-cover object-center"
                />
              </div>
            </button>
          </ActionTooltip>
        </ContextMenuTrigger>
        <ContextMenuContent className="bg-neutral-200/100 dark:bg-zinc-700">
          <ContextMenuItem
            inset
            className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer"
            onClick={() => onOpen("invite", {server})}
          >
            Invite
            <ContextMenuShortcut>
              <UserPlus className="text-indigo-600 dark:text-indigo-400" size={15}/>
            </ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem
            inset
            className="text-rose-500 font-semibold cursor-pointer"
            onClick={() => onOpen("leaveChannel", {server})}
          >
            Leave
            <ContextMenuShortcut>
              <LogOut className="text-rose-500 ml-auto" size={15}/>
            </ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
};

export default NavigationItem;
