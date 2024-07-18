"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useModal } from "@/components/custom/modal-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const workspaceSchema = z.object({
  name: z.string(),
});

interface DeleteAccountProps {
  name: string;
  onSubmit?: (name: string) => void;
}

export const DeleteWorkspace = ({
  name,
  onSubmit: $onSubmit,
}: DeleteAccountProps) => {
  const { isOpen, setClose } = useModal();
  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: { name: "" },
  });
  const onClose = () => {
    setClose();
    form.reset();
    form.clearErrors();
  };
  const onSubmit = (value: z.infer<typeof workspaceSchema>) => {
    if (value.name === name) {
      onClose();
      $onSubmit?.(name);
    } else {
      form.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        forceMount
        className="z-[99999] w-[420px] space-y-6 rounded-sm p-5"
        onClick={(e) => e.stopPropagation()}
        hideClose
      >
        <div className="relative flex w-full flex-col items-center gap-2 self-stretch">
          <div className="flex items-center">
            <CircleAlert className="size-9 flex-shrink-0 p-1 text-warning" />
          </div>
          <div className="text-center text-lg/[22px] font-semibold text-primary">
            Delete this entire workspace permanently?
          </div>
          <div className="text-wrap text-center text-xs/4 text-primary/65">
            This action cannot be undone. This will permanently delete the
            workspace, including all pages and files. Please type the name of
            the workspace to confirm.
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
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <Input
                      variant="notion"
                      placeholder={name}
                      {...field}
                      className="h-9"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.formState.errors && (
              <div className="mt-1 text-xs/5 text-warning">
                {`Please type "${name}" to continue`}
              </div>
            )}
            <Button
              type="submit"
              variant="warning"
              size="sm"
              className="mt-6 w-full bg-warning text-white hover:bg-warning/65 dark:hover:bg-warning/35"
            >
              Permanently delete workspace
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
