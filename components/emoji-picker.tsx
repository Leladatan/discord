"use client";

import {FC} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Smile} from "lucide-react";
import Picker from "@emoji-mart/react"
import {useTheme} from "next-themes";

type EmojiPickerProps = {
  onChange: (value: string) => void;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onChange}) => {
  const {resolvedTheme} = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="absolute top-7 right-8">
          <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"/>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side={"right"}
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
        <Picker theme={resolvedTheme} onEmojiSelect={(emoji: any) => onChange(emoji.native)}/>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;