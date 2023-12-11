import {create} from "zustand";
import {Channel, ChannelType, Server} from "@prisma/client";

export type ModalType =
  "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "leaveChannel"
  | "deleteServer"
  | "createChannel"
  | "editChannel"
  | "deleteChannel"
  | "messageFile";

interface ModalData {
  server?: Server;
  channelType?: ChannelType;
  channel?: Channel;
  apiUrl?: string;
  query?: Record<string, any>;
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
