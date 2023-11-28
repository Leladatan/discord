import {type FC} from 'react';
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import currentProfile from "@/utils/current-profile";
import NavigationAction from "@/components/navigation/navigation-action";
import {Separator} from "@/components/ui/separator";
import {ScrollArea} from "@/components/ui/scroll-area";
import NavigationItem from "@/components/navigation/navigation-item";
import ThemeSwitcher from "@/components/theme-switcher";
import {UserButton} from "@clerk/nextjs";
import NavigationItemAction from "@/components/navigation/navigation-item-action";

const Navigation: FC = async () => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/sign-in");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (servers.length === 0) {
    return null;
  }

  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction/>
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"/>
      <ScrollArea className="flex-1 w-full">
        {servers.map(server => (
          <NavigationItem key={server.id} id={server.id} imageUrl={server.imageUrl} name={server.name}/>
        ))}
        <NavigationItemAction />
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ThemeSwitcher/>
        <UserButton
          afterSignOutUrl="/sign-in"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            }
          }}
        />
      </div>
    </div>
  );
};

export default Navigation;
