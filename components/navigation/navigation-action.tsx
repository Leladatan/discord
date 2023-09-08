"use client";

import {type FC} from 'react';
import {Plus} from "lucide-react";
import ActionTooltip from "@/components/action-tooltip";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {cn} from "@/lib/utils";
import {useModal} from "@/hooks/use-modal-store";

const NavigationAction: FC = () => {
    const router: AppRouterInstance = useRouter();
    const pathname: string = usePathname();

    const {onOpen} = useModal();

    const onClick = (): void => {
        router.push("/servers");
    };

    const handleOpen = (): void => {
        onOpen("createServer");
    };

    return (
        <>
            <button
                className="group flex items-center"
                onClick={onClick}
            >
                <div className={cn("flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px]" +
                    " transition-all overflow-hidden items-center justify-center bg-background" +
                    " dark:bg-neutral-700 group-hover:bg-emerald-500", pathname === "/servers" && "dark:bg-emerald-500 bg-background"
                    )}>
                    <Image src="/logo.svg" alt="Servers" width={28} height={28} priority/>
                </div>
            </button>
            <ActionTooltip side="right" align="center" label="Add a server">
                <button
                    onClick={handleOpen}
                    className="group flex items-center"
                >
                    <div
                        className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px]
                     transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700
                     group-hover:bg-emerald-500"
                    >
                        <Plus className="group-hover:text-white transiton text-emerald-500" size={25}/>
                    </div>
                </button>
            </ActionTooltip>
        </>
    );
};

export default NavigationAction;
