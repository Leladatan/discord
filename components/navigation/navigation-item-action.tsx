"use client";

import React, {FC} from 'react';
import {useModal} from "@/hooks/use-modal-store";
import {Plus} from "lucide-react";
import ActionTooltip from "@/components/action-tooltip";

const NavigationItemAction: FC = () => {
  const {onOpen} = useModal();

  const handleOpen = (): void => {
    onOpen("createServer");
  };

  return (
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
  );
};

export default NavigationItemAction;