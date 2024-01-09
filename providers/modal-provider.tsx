"use client";

import {type FC, useEffect, useState} from 'react';
import CreateServerModal from "@/components/modals/create-server-modal";
import InviteModal from "@/components/modals/invite-modal";
import EditServerModal from "@/components/modals/edit-server-modal";
import MembersModal from "@/components/modals/members-modal";
import LeaveServerModal from "@/components/modals/leave-server-modal";
import DeleteServerModal from "@/components/modals/delete-server-modal";
import CreateChannelModal from "@/components/modals/create-channel-modal";
import EditChannelModal from "@/components/modals/edit-channel-modal";
import DeleteChannelModal from "@/components/modals/delete-channel-modal";
import {useModal} from "@/hooks/use-modal-store";
import MessageFileModal from "@/components/modals/message-file-modal";
import DeleteMessageModal from "@/components/modals/delete-message-modal";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {isOpen} = useModal();

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  useEffect((): void => {
    if (isOpen) {
      document.body.style.pointerEvents = "none";
    }

    document.body.style.pointerEvents = "";
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal/>
      <InviteModal/>
      <EditServerModal/>
      <MembersModal/>
      <DeleteServerModal/>
      <LeaveServerModal/>
      <CreateChannelModal/>
      <EditChannelModal/>
      <DeleteChannelModal/>
      <MessageFileModal/>
      <DeleteMessageModal/>
    </>
  );
};

export default ModalProvider;
