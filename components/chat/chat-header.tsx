import React, {FC} from 'react';
import {Hash} from "lucide-react";
import MobileToggle from "@/components/mobile-toggle";
import UserAvatar from "@/components/ui/user-avatar";
import {cn} from "@/lib/utils";
import SocketIndicator from "@/components/socket/socket-indicator";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({serverId, imageUrl, name, type}) => {
  return (
    <div
      className="text-md font-semibold px-3 flex items-center gap-x-4 h-16 border-neutral-200 dark:border-neutral-800 border-b-2"
    >
      <MobileToggle serverId={serverId} />
      <div className={cn("flex items-center min-w-0", type === "channel" ? "gap-x-0" : "gap-x-3")}>
        {type === "channel" && (
          <Hash className="w-6 h-6 text-zinc-500 dark:text-zinc-400 mr-2"/>
        )}
        {type === "conversation" && imageUrl && (
          <UserAvatar profile={{imageUrl, name}} />
        )}
        <h2 className="font-semibold text-md text-black dark:text-white line-clamp-1">
          {name}
        </h2>
      </div>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;