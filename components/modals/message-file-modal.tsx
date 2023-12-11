"use client";

import * as z from "zod";
import {type FC} from 'react';
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
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import axios from "axios";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {useModal} from "@/hooks/use-modal-store";
import qs from "query-string";

const formSchema = z.object({
  fileUrl: z.string().min(1, {message: "Attachment is required!"}),
});

const MessageFileModal: FC = () => {
  const {isOpen, onClose, type, data} = useModal();

  const router: AppRouterInstance = useRouter();
  const {apiUrl, query} = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;
  const isModalOpen: boolean = isOpen && type === "messageFile";

  const handleClose = (): void => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      const url: string = qs.stringifyUrl({
        url: apiUrl || "",
        query
      });

      await axios.post(url, {...values, content: values.fileUrl});

      form.reset();
      router.refresh();
      onClose();
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Add an attachment
          </DialogTitle>
          <DialogDescription className="text-center">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center justify-center text-center mb-3">
              <FormField
                control={form.control}
                name="fileUrl"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="messageFile"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-600 px-6 py-4">
              <Button disabled={isSubmitting} variant="primary">
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
