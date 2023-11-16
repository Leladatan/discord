"use client";

import qs from "query-string";
import * as z from "zod";
import {type FC} from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {useModal} from "@/hooks/use-modal-store";
import {ChannelType} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

const formSchema = z.object({
    name: z.string().min(1, {message: "Channel name is required!"})
        .refine(name => name !== "general", {message: "Channel name cannot be 'general'"}),
    type: z.nativeEnum(ChannelType),
});

const CreateChannelModal: FC = () => {
    const {isOpen, onClose, type} = useModal();
    const router: AppRouterInstance = useRouter();
    const params = useParams();

    const isOpenModal: boolean = isOpen && type === "createChannel";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: ChannelType.TEXT
        }
    });

    const isSubmitting: boolean = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
        try {
            const url = qs.stringifyUrl({
                url: "/api/channels",
                query: {
                    serverId: params.serverId
                }
            })
            await axios.post(url, values);

            form.reset();
            router.refresh();
            onClose();
        }   catch (e) {
            console.log(e)
        }
    };

    const handleClose = (): void => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={isOpenModal} onOpenChange={handleClose}>
            <DialogContent className="bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0 overflow-hidden overflow-y-auto scrollbar-thin h-full md:h-auto">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Create channel
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-white"
                                        >
                                            Channel name
                                        </FormLabel>
                                        <FormControl>
                                            <Input disabled={isSubmitting}
                                                   className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black dark:text-white
                                                    focus-visible:ring-offset-0"
                                                   placeholder="Enter server name"
                                                   {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Channel type</FormLabel>
                                        <Select
                                            disabled={isSubmitting}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0
                                                 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-0"
                                                >
                                                    <SelectValue placeholder="Select a channel type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.values(ChannelType).map(type => (
                                                    <SelectItem key={type} value={type} className="capitalize">
                                                        {type.toLowerCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                name="type"
                            />
                        </div>
                        <DialogFooter className="bg-gray-600 px-6 py-4">
                            <Button disabled={isSubmitting} variant="primary">
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateChannelModal;
