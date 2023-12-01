import React, {FC} from 'react';
import {Menu} from "lucide-react";

import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import ServerSidebar from "@/components/server/server-sidebar";
import Navigation from "@/components/navigation/navigation";

interface MobileToggleProps {
  serverId: string;
}

const MobileToggle: FC<MobileToggleProps> = ({serverId}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex gap-0" >
        <div className="w-[72px]">
          <Navigation />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;