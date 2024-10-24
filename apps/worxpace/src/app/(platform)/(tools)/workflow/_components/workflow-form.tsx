"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { z } from "zod";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@swy/ui/shadcn";
import { useModal } from "@swy/ui/shared";

import { createDocument } from "~/actions";

const WorkflowFormSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
});

export interface WorkflowFormProps {
  accountId: string;
  workspaceId: string;
  title?: string;
  subTitle?: string;
}

const Workflowform: FC<WorkflowFormProps> = ({
  accountId,
  workspaceId,
  subTitle,
  title,
}) => {
  const { setClose } = useModal();
  /** Form */
  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const isLoading = form.formState.isLoading;

  /** Action: Create */
  const { trigger: create } = useSWRMutation(
    { type: "document", workspaceId } as const,
    createDocument,
    {
      onSuccess: (data) => toast.success(`Workflow Created: ${data.title}`),
      onError: (e: Error) => toast.error(e.message),
    },
  );
  const handleSubmit = async ({
    name,
    description,
  }: z.infer<typeof WorkflowFormSchema>) => {
    const content = JSON.stringify({
      type: "workflow",
      name,
      description,
      isPublished: false,
    });
    await create({
      type: "workflow",
      title: name,
      content,
      accountId,
      workspaceId,
    });
    setClose();
  };

  return (
    <Card className="w-full border-none shadow-none">
      {title && subTitle && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subTitle}</CardDescription>
        </CardHeader>
      )}
      <CardContent className="p-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 text-left"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-4" disabled={isLoading} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                </>
              ) : (
                "Save Settings"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Workflowform;
