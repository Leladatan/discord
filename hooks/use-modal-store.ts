import {create} from "zustand";
import {Server} from "@prisma/client";

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "leaveChannel" | "deleteServer";

interface ModalData {
    server?: Server;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onClose: () => set({type: null, isOpen: false}),
    onOpen: (type: ModalType, data: ModalData = {}) => set({type, isOpen: true, data}),
}));
