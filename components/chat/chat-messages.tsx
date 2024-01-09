"use client";

import {FC, Fragment} from "react";
import {Member, Message, Profile} from "@prisma/client";
import ChatWelcome from "@/components/chat/chat-welcome";
import {useChatQuery} from "@/hooks/use-chat-query";
import {Loader2, ServerCrash} from "lucide-react";
import ChatItem from "@/components/chat/chat-item";
import {format} from "date-fns";
import {useChatSocket} from "@/hooks/use-chat-socket";

type ChatMessagesProps = {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
};

type MessageWithMemberWithProfile = Message & {
  member: Member & { profile: Profile }
};

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const ChatMessages: FC<ChatMessagesProps> = ({
                                               name,
                                               chatId,
                                               member,
                                               paramKey,
                                               paramValue,
                                               type,
                                               socketQuery,
                                               socketUrl,
                                               apiUrl
                                             }) => {
  const queryKey: string = `chat:${chatId}`;
  const addKey: string = `chat:${chatId}:messages`;
  const updateKey: string = `chat:${chatId}:messages:update`;

  const {
    data,
    status
  } = useChatQuery({
    queryKey, apiUrl, paramKey, paramValue
  });

  useChatSocket({queryKey, addKey, updateKey});

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4"/>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pt-4 pb-14 dark:bg-[#313338]">
      <div className="flex-1">
        <ChatWelcome
          type={type}
          name={name}
        />
        <div className="flex flex-col-reverse mt-auto">
          {data?.pages.map((group, i) => (
            <Fragment key={i}>
              {group?.items.map((message: MessageWithMemberWithProfile) => (
                <ChatItem
                  key={message.id}
                  id={message.id}
                  currentMember={member}
                  member={message.member}
                  content={message.content}
                  fileUrl={message.fileUrl}
                  deleted={message.deleted}
                  timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                  isUpdated={message.updatedAt !== message.createdAt}
                  socketUrl={socketUrl}
                  socketQuery={socketQuery}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;