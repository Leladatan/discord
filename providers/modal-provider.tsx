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

const ModalProvider: FC = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect((): void => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <DeleteServerModal />
            <LeaveServerModal />
            <CreateChannelModal />
            <EditChannelModal />
            <DeleteChannelModal />
        </>
    );
};

export default ModalProvider;
