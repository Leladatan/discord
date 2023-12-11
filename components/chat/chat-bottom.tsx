"use client";

import * as z from "zod";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Plus} from "lucide-react";
import {Input} from "@/components/ui/input";
import qs from "query-string";
import axios from "axios";
import {useModal} from "@/hooks/use-modal-store";
import EmojiPicker from "@/components/emoji-picker";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

type ChatBottomProps = {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
};

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatBottom: FC<ChatBottomProps> = ({apiUrl, query, type, name}) => {
  const {onOpen} = useModal();
  const router: AppRouterInstance = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: ""
    }
  });

  const isLoading: boolean = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      const url: string = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, values);

      form.reset();
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={"content"}
          render={({field}) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type={"button"}
                    onClick={() => onOpen("messageFile", {apiUrl, query})}
                    className="absolute rounded-full top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition p-1 flex items-center justify-center"
                  >
                    <Plus className="text-white dark:text-[#313338"/>
                  </button>
                  <Input
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                    {...field}
                  />
                  <EmojiPicker onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
};

export default ChatBottom;