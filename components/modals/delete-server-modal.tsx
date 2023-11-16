"use client";

import {type FC, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {useModal} from "@/hooks/use-modal-store";
import axios from "axios";

const DeleteServerModal: FC = () => {
    const {
        isOpen,
        onClose,
        type,
        data
    } = useModal();
    const router: AppRouterInstance = useRouter();

    const isOpenModal: boolean = isOpen && type === "deleteServer";
    const {server} = data;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            router.refresh();
            router.push("/servers");
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
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Are you sure you want to delete <span
                        className="font-bold text-xl text-indigo-500">{server?.name}</span>?
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

export default DeleteServerModal;
