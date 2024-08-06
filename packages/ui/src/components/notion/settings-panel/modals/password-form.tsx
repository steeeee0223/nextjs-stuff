"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { PasswordIcon } from "../_components/icons";
import { PasswordSuccess } from "./password-success";

const message = "Please include additional unique characters.";
const passwordSchema = z
  .object({
    password: z.string().min(8, { message }),
    confirmPassword: z.string().min(1, { message }),
    currentPassword: z.string().min(1, { message }).optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password)
      ctx.addIssue({
        code: "custom",
        message: "Your new password does not match.",
        path: ["confirmPassword"],
      });
  });

interface PasswordFormProps {
  hasPassword?: boolean;
  onSubmit?: (pass: string, original?: string | null) => void;
}

export const PasswordForm = ({
  hasPassword,
  onSubmit: $onSubmit,
}: PasswordFormProps) => {
  const { isOpen, setClose, setOpen } = useModal();
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });
  const onClose = () => {
    setClose();
    form.reset();
  };
  const onSubmit = ({
    password,
    currentPassword,
  }: z.infer<typeof passwordSchema>) => {
    $onSubmit?.(password, currentPassword);
    onClose();
    setOpen(<PasswordSuccess />);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        forceMount
        className="z-[99999] w-[350px] rounded-sm p-6"
        onClick={(e) => e.stopPropagation()}
        hideClose
        noTitle
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
            <div className="my-4 flex justify-center">
              <PasswordIcon className="size-[27px] flex-shrink-0 fill-primary/85" />
            </div>
            <h2 className="mb-1 px-2.5 text-center text-sm/tight font-medium text-primary">
              {hasPassword ? "Change password" : "Set a password"}
            </h2>
            <div className="mb-4 text-center text-xs/snug text-primary/65">
              Use a password at least 15 letters long, or at least 8 characters
              long with both letters and numbers. If you lose access to your
              school email address, you&apos;ll be able to log in using your
              password.
            </div>
            {hasPassword && (
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="mb-2 space-y-[1px]">
                    <FormLabel className="text-xs text-primary/65">
                      Enter your current password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        variant="notion"
                        placeholder="Current password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-2 space-y-[1px]">
                  <FormLabel className="text-xs text-primary/65">
                    Enter a new password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      variant="notion"
                      placeholder="New password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-[1px]">
                  <FormLabel className="text-xs text-primary/65">
                    Confirm your new password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      variant="notion"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {form.formState.errors && (
              <div className="mt-2.5 text-center text-xs/5 text-[#eb5757]">
                {Object.values(form.formState.errors).at(0)?.message}
              </div>
            )}
            <Button
              type="submit"
              variant="blue"
              size="sm"
              className="mt-4 w-full"
            >
              {hasPassword ? "Change password" : "Set a password"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
