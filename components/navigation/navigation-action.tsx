"use client";

import {type FC} from 'react';
import ActionTooltip from "@/components/action-tooltip";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {cn} from "@/lib/utils";

const NavigationAction: FC = () => {
  const router: AppRouterInstance = useRouter();
  const pathname: string = usePathname();

  const onClick = (): void => {
    router.push("/servers");
  };

  return (
    <>
      <ActionTooltip side="right" align="center" label="Servers list">
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
      </ActionTooltip>
    </>
  );
};

export default NavigationAction;
