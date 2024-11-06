"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@swy/ui/shadcn";

import { useClient, useSetup } from "~/hooks";
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
  const { clerkId, email, name, avatarUrl } = useClient();

  const { createAccount, createWorkspace } = useSetup({ clerkId });
  const onContinue = async () => {
    const account = await createAccount({ name, clerkId, email, avatarUrl });
    await createWorkspace({
      createdBy: account.id,
      name: `${name}'s Workspace`,
    });
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center">
        <div className="relative mx-auto max-w-[520px] py-8 text-center">
          <div>
            <div className="font-sans text-3xl/tight font-semibold">
              How are you planning to use Notion?
            </div>
            <div className="pt-0.5 text-lg/tight font-normal text-secondary dark:text-secondary-dark">
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
        className="absolute right-[18px] top-[18px] text-primary dark:text-primary/80"
        onClick={() => router.push("/select-role")}
      >
        Cancel
      </Button>
    </>
  );
}
