"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useModal } from "@/components/custom/modal-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const userSchema = z.object({
  email: z.string().email(),
});

interface DeleteAccountProps {
  email: string;
  onSubmit?: (email: string) => void;
}

export const DeleteAccount = ({
  email,
  onSubmit: $onSubmit,
}: DeleteAccountProps) => {
  const { isOpen, setClose } = useModal();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: { email: "" },
  });
  const onClose = () => {
    setClose();
    form.reset();
    form.clearErrors();
  };
  const onSubmit = (value: z.infer<typeof userSchema>) => {
    if (value.email === email) {
      onClose();
      $onSubmit?.(email);
    } else {
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        forceMount
        className="w-[420px] space-y-6 p-5"
        onClick={(e) => e.stopPropagation()}
        hideClose
        noTitle
      >
        <div className="relative flex w-full flex-col items-center gap-2 self-stretch">
          <div className="flex items-center">
            <CircleAlert className="size-9 flex-shrink-0 p-1 text-red" />
          </div>
          <div className="text-center text-lg/[22px] font-semibold">
            Delete your entire account permanently?
          </div>
          <div className="text-wrap text-center text-xs/4 text-secondary dark:text-secondary-dark">
            This action cannot be undone. This will permanently delete your
            entire account. All private workspaces will be deleted, and you will
            be removed from all shared workspaces.
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col"
            style={{ marginTop: 0 }}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Please type in your email to confirm.</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={email}
                      {...field}
                      className="h-9"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.formState.errors.email && (
              <div className="mt-1 text-xs/5 text-red">
                {`Please type "${email}" to continue`}
              </div>
            )}
            <Button
              type="submit"
              variant="red:fill"
              size="sm"
              className="mt-6 w-full"
            >
              Permanently delete account
            </Button>
            <div className="flex justify-center">
              <Button
                onClick={onClose}
                variant="hint"
                size="sm"
                className="mt-3 h-7 w-fit"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
