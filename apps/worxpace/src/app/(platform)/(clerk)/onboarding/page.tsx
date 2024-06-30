"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import { Button } from "@acme/ui/shadcn";
import { CreateAccountInput } from "@acme/validators";

import { createAccount, createWorkspace } from "~/actions";
import { useClient } from "~/hooks";
import { account } from "~/lib";
import { Card, type CardProps } from "./_components/card";

const data: Omit<CardProps, "checked">[] = [
  {
    id: 0,
    image:
      "https://www.notion.so/images/onboarding/team-features-illustration.png",
    title: "For my team",
    description: "Collaborate on your docs, projects, and wikis.",
  },
  {
    id: 1,
    image: "https://www.notion.so/images/onboarding/use-case-note.png",
    title: "For personal use",
    description: "Write better. Think more clearly. Stay organized.",
  },
  {
    id: 2,
    image: "https://www.notion.so/images/onboarding/use-case-wiki.png",
    title: "For school",
    description: "Keep your notes, research, and tasks all in one place.",
  },
];

export default function Page() {
  const [checked, setChecked] = useState(-1);
  const router = useRouter();
  const {
    email,
    workspaceId: clerkId,
    workspace: name,
    avatarUrl,
  } = useClient();

  const onError = (e: Error) => toast.error(e.message);
  const { trigger: create } = useSWRMutation(
    clerkId,
    async (key, payload: { arg: CreateAccountInput }) => {
      const data = await account.get(key);
      if (!data) return await createAccount(key, payload);
      return data;
    },
    {
      onError,
      onSuccess: ({ id, name }) => {
        void $create({
          createdBy: id,
          name: `${name}'s Workspace`,
          icon: { type: "lucide", src: "coffee", color: "#9F6B53" },
        });
      },
    },
  );
  const { trigger: $create } = useSWRMutation(clerkId, createWorkspace, {
    onError,
    // onSuccess: () => router.push(path),
    onSuccess: ({ id }) => router.push(`/workspace/${id}`),
  });
  const onContinue = async () =>
    await create({ name, clerkId, email, avatarUrl });

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center">
        <div className="relative mx-auto max-w-[520px] py-8 text-center">
          <div>
            <div className="font-sans text-3xl/tight font-semibold text-primary">
              How are you planning to use Notion?
            </div>
            <div className="pt-0.5 text-lg/tight font-normal text-primary/65">
              We’ll streamline your setup experience accordingly.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center pb-8">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-8 mt-2.5 inline-flex w-full justify-center">
              {data.map((props) => (
                <Card
                  key={props.id}
                  {...props}
                  checked={checked === props.id}
                  onClick={() => setChecked(props.id)}
                />
              ))}
            </div>
            <Button
              variant="blue"
              size="sm"
              className="w-[280px]"
              disabled={!(checked in ([0, 1, 2] as const))}
              onClick={onContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="hint"
        size="sm"
        tabIndex={0}
        className="absolute right-[18px] top-[18px] text-primary"
        onClick={() => router.push("/select-role")}
      >
        Cancel
      </Button>
    </>
  );
}
