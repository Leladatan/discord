"use client";

import {type FC, ReactNode} from 'react';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

interface ActionTooltipProps {
    label: string;
    children: ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
}

const ActionTooltip: FC<ActionTooltipProps> = ({children, side, align, label}) => {
    return (
        <TooltipProvider delayDuration={50}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="font-semibold text-sm capitalize">
                        {label.toLowerCase()}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ActionTooltip;
