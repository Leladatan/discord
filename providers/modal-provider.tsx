"use client";

import {type FC, useEffect, useState} from 'react';
import CreateServerModal from "@/components/modals/create-server-modal";

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
        </>
    );
};

export default ModalProvider;
