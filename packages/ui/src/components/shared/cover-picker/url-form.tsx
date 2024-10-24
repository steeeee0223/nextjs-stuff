"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
} from "@swy/ui/shadcn";

const urlSchema = z.object({
  url: z.string().min(1, {
    message: "Url should not be empty",
  }),
});

interface UrlFormProps {
  disabled?: boolean;
  onUrlSubmit?: (url: string) => void;
}

export const UrlForm = ({ onUrlSubmit, disabled }: UrlFormProps) => {
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: { url: "" },
  });

  const onSubmit = (values: z.infer<typeof urlSchema>) => {
    onUrlSubmit?.(values.url);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-x-2"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="h-7 flex-1">
              <FormControl>
                <Input
                  disabled={disabled}
                  type="url"
                  placeholder="Paste link to an image..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="blue"
          size="sm"
          className="h-7"
          disabled={disabled}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
