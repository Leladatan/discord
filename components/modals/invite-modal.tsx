"use client";

import {type FC, useState} from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {useModal} from "@/hooks/use-modal-store";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Check, Copy, RefreshCcw} from "lucide-react";
import {useOrigin} from "@/hooks/use-origin";
import axios from "axios";


const InviteModal: FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {onOpen, isOpen, onClose, type, data} = useModal();

  const origin: string = useOrigin();
  const isOpenModal: boolean = isOpen && type === "invite";

  const {server} = data;

  const isHttps: boolean = window.isSecureContext;

  if (!server) {
    return (
      <Dialog open={isOpenModal} onOpenChange={onClose}>
        <DialogContent className="bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0 overflow-hidden overflow-y-auto scrollbar-thin">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-center text-2xl font-bold">
              Invite Friends!
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <Label className="uppercase text-xs font-bold text-zinc-500 derk:text-secondary/70">
              Server invite link
            </Label>
            <div className="flex items-center mt-2 gap-x-2">
              <Input className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                     value={`${origin}/invite/...`}
                     disabled
              />
              {isHttps &&
                <Button size="icon" disabled>
                  {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                </Button>
              }
            </div>
            <Button
              variant="link"
              size="sm"
              className="text-xs text-zinc-500 mt-4"
              disabled
            >
              Generate a new link
              <RefreshCcw className="w-4 h-4 ml-2"/>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const inviteLink: string = `${origin}/invite/${server.inviteCode}`;

  const onCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout((): void => {
      setCopied(false);
    }, 2000);
  };

  const onNew = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const response = await axios.patch(`/api/servers/${server.id}/invite-code`);

      onOpen("invite", {server: response.data});
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0 overflow-hidden overflow-y-auto scrollbar-thin">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Friends!
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 derk:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                   value={inviteLink}
                   disabled={isLoading}
            />
            {isHttps &&
              <Button size="icon" onClick={onCopy} disabled={isLoading}>
                {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
              </Button>
            }
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            onClick={onNew}
            disabled={isLoading}
          >
            Generate a new link
            <RefreshCcw className="w-4 h-4 ml-2"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
