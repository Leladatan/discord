"use client";

import {Channel, ChannelType, MemberRole, Server} from "@prisma/client";
import {FC} from "react";
import {Hash, Mic, Video} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
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

  return (
    <div>

    </div>
  );
};

export default ServerChannel;