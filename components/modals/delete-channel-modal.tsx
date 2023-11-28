"use client";

import React, {useState} from 'react';
import {useModal} from "@/hooks/use-modal-store";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {useRouter} from "next/navigation";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import qs from "query-string";

const DeleteChannelModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data
  } = useModal();
  const router: AppRouterInstance = useRouter();

  const isOpenModal: boolean = isOpen && type === "deleteChannel";
  const {channel} = data;
  const {server} = data;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      })

      await axios.delete(url);

      onClose();
      router.refresh();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent
        className="bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0 overflow-hidden overflow-y-auto scrollbar-thin h-full md:h-auto">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to delete <span
            className="font-bold text-xl text-indigo-500">#{channel?.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-300 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" className="font-semibold text-neutral-900" onClick={onClose}
                    disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onClick} disabled={isLoading}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;