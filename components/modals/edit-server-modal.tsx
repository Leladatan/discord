"use client";

import {type FC, useEffect} from 'react';
import * as z from "zod";
import {useModal} from "@/hooks/use-modal-store";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import FileUpload from "@/components/file-upload";
import {Separator} from "@/components/ui/separator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1, {message: "Server name is required!"}),
    imageUrl: z.string().min(1, {message: "Server image is required!"}),
    bannerUrl: z.string(),
});

const EditServerModal: FC = () => {
    const {isOpen, onClose, type, data} = useModal();
    const router: AppRouterInstance = useRouter();

    const {server} = data;

    const isOpenModal: boolean = isOpen && type === "editServer";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
            bannerUrl: ""
        }
    });

    useEffect((): void => {
        if (server) {
            form.setValue("name", server.name);
            form.setValue("imageUrl", server.imageUrl);
            form.setValue("bannerUrl", server.bannerUrl);
        }
    }, [server, form]);

    const isSubmitting: boolean = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
        try {
            await axios.patch(`/api/servers/${server?.id}`, values);

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
                            <div className="flex flex-col items-center justify-center text-center mb-3">
                                <Label className="text-xl font-bold text-zinc-500 dark:text-white">
                                    Server Avatar
                                </Label>
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
                            </div>

                            <Separator className="h-[1px] bg-zinc-500 dark:bg-zinc-700 rounded-md w-full mx-auto my-3"/>

                            <div className="flex flex-col items-center justify-center text-center mt-3">
                                <Label className="text-xl font-bold text-zinc-500 dark:text-white">
                                    Server Banner
                                </Label>
                                <FormField
                                    control={form.control}
                                    name="bannerUrl"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="bannerImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="uppercase text-xs font-bold text-zinc-500 dark:text-white"
                                        >
                                            Server name
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
                        </div>
                        <DialogFooter className="bg-gray-600 px-6 py-4">
                            <Button disabled={isSubmitting} variant="primary">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditServerModal;
