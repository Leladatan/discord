"use client";

import * as z from "zod";
import {type FC, useEffect, useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import axios from "axios";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {Separator} from "@/components/ui/separator";

const formSchema = z.object({
    name: z.string().min(1, {message: "Server name is required!"}),
    imageUrl: z.string().min(1, {message: "Server image is required!"}),
    bannerUrl: z.string(),
});

const InitialModal: FC = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const router: AppRouterInstance = useRouter();

    useEffect((): void => {
        setIsMounted(true);
    }, []);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
            bannerUrl: ""
        }
    });

    const isSubmitting: boolean = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
        try {
            await axios.post("/api/servers", values);

            form.reset();
            router.refresh();
            window.location.reload();
        }   catch (e) {
            console.log(e)
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden overflow-y-auto h-full scrollbar-thin">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Give your server a personality with a name and an image. You can always change it later.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="space-y-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-8 px-6">
                            <div className="flex flex-col items-center justify-center text-center">
                                <h2 className="text-xl font-bold text-zinc-500 dark:text-white">
                                    Server Avatar
                                </h2>
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <Separator className="h-[3px] bg-zinc-500 dark:bg-zinc-700 rounded-md w-full mx-5 my-2"/>

                                <div className="flex flex-col items-center justify-center text-center">
                                    <h2 className="text-xl font-bold text-zinc-500 dark:text-white">
                                        Server Banner
                                    </h2>
                                    <FormField
                                        control={form.control}
                                        name="bannerUrl"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FileUpload
                                                        endpoint="serverImage"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                                        >
                                            Server name
                                        </FormLabel>
                                        <FormControl>
                                            <Input disabled={isSubmitting}
                                                   className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black
                                                    focus-visible:ring-offset-0"
                                                   placeholder="Enter server name"
                                                   {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
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

export default InitialModal;
