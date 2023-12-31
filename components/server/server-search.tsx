"use client";

import {type FC, useEffect, useState} from 'react';
import {Search} from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {useParams, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

interface ServerSearchProps {
    data: {
        label: string;
        type: "channel" | "member";
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[];
    }[],
}

const ServerSearch: FC<ServerSearchProps> = ({data}) => {
    const [open, setOpen] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();
    const params = useParams();

    useEffect(() => {
        const down = (e: KeyboardEvent): void => {
          if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setOpen((open) => !open);
          }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    if (!params) {
        return null;
    }

    const onSelect = ({id, type}: {id: string, type: "channel" | "member"}): void => {
        setOpen(false);

        if (type === "member") {
            return router.push(`/servers/${params.serverId}/members/${id}`);
        }

        if (type === "channel") {
            return router.push(`/servers/${params.serverId}/channels/${id}`);
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
            >
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                    Search
                </p>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border
                 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
                >
                    <span className="text-xs">CTRL</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members" />
                <CommandList className="py-5">
                    <CommandEmpty>
                        No results found
                    </CommandEmpty>
                    {data.map(({label, type, data}) => {
                        return (
                            <CommandGroup key={label} heading={label}>
                                {!!data.length ?
                                  data.map(({id, icon, name}) => {

                                      return (
                                        <CommandItem key={id} onSelect={() => onSelect({id, type})}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                      )
                                  })
                                :
                                  <h3 className="mx-4">No results</h3>
                                }
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    );
};

export default ServerSearch;
