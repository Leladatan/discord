"use client";

import {Channel, ChannelType, MemberRole, Server} from "@prisma/client";
import {FC} from "react";
import {Edit, Hash, Lock, Mic, Trash, Video} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import ActionTooltip from "@/components/action-tooltip";
import {ModalType, useModal} from "@/hooks/use-modal-store";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel: FC<ServerChannelProps> = ({channel, server, role}) => {
  const params = useParams();
  const router: AppRouterInstance = useRouter();
  const {onOpen} = useModal();
  const Icon = iconMap[channel.type];

  const onRedirectChannel = (): void => {
    router.push(`/servers/${server.id}/channels/${channel.id}`);
  };

  const onAction = (e: React.MouseEvent, type: ModalType, data: {
    server?: Server;
    channelType?: ChannelType;
    channel?: Channel;
  }): void => {
    e.stopPropagation();
    onOpen(type, data);
  };

  if (!params) {
    return null;
  }

  return (
    <div
      onClick={onRedirectChannel}
      className={cn("group px-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 cursor-pointer",
        params.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700")
      }
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400"/>
      <p
        className={cn("line-clamp-1 w-[125px] font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")
        }
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit onClick={(event) => onAction(event, "editChannel", {server, channel, channelType: channel.type})} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash  onClick={(event) => onAction(event, "deleteChannel", {server, channel})} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className={cn("ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400",
          role === MemberRole.GUEST && "hidden"
        )} />
      )}
    </div>
  );
};

export default ServerChannel;