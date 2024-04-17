"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
                  variant="notion"
                  placeholder="Paste link to an image..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          className="h-7 rounded-sm"
          disabled={disabled}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
