"use client";

import {type FC} from 'react';
import Image from "next/image";
import {useParams, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import ActionTooltip from "@/components/action-tooltip";
import {cn} from "@/lib/utils";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

const NavigationItem: FC<NavigationItemProps> = ({id, name, imageUrl}) => {
    const router: AppRouterInstance = useRouter();
    const params = useParams();

    const onClick = (): void => {
        router.push(`/servers/${id}`);
    };

    return (
        <div className="mb-4">
            <ActionTooltip label={name} align="center" side="right">
                <button
                    onClick={onClick}
                    className="group relative flex items-center"
                >
                    <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all duration-200 w-[4px]",
                        params?.serverId !== id && "group-hover:h-[20px]",
                        params?.serverId === id ? "h-[36px]" : "h-[8px]"
                    )}
                    />
                    <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all duration-200 overflow-hidden",
                            params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                        )}>
                        <Image
                            src={imageUrl}
                            alt="Channel image"
                            fill
                            className="cursor-pointer object-cover object-center"
                        />
                    </div>
                </button>
            </ActionTooltip>
        </div>
    );
};

export default NavigationItem;
