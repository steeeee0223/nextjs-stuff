"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

import { usePlatformStore } from "@swy/notion";
import { Button } from "@swy/ui/shadcn";
import { Plan, Role } from "@swy/validators";

import { WorkspaceModel } from "~/db";
import { useAppActions, useAppState, useMockDB } from "~/hooks";
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
  const { updateDB } = useMockDB();
  const [isSignedIn, accountId] = useAppState((state) => [
    state.isSignedIn,
    state.userId,
  ]);
  const { selectWorkspace } = useAppActions();
  const addWorkspace = usePlatformStore((state) => state.addWorkspace);

  const createWorkspace = async () => {
    if (!accountId) {
      router.push("/sign-in");
      return;
    }
    const wid = v4();
    const w: WorkspaceModel = {
      id: wid,
      name: "New Workspace",
      createdBy: accountId,
      domain: `workspace-${accountId.slice(0, 5)}`,
      inviteToken: wid,
      plan: Plan.FREE,
      icon: { type: "text", text: "N" },
      lastEditedAt: Date.now(),
    };
    await updateDB("workspaces", { [wid]: w });
    const mem = {
      id: v4(),
      accountId,
      workspaceId: w.id,
      joinedAt: Date.now(),
      role: Role.OWNER,
    };
    await updateDB("memberships", [mem]);
    addWorkspace({
      id: wid,
      name: w.name,
      icon: w.icon ?? { type: "text", text: w.name },
      members: 1,
      plan: w.plan,
      role: mem.role,
    });
    console.log(`create success, redirecting to ${wid}`);
    selectWorkspace(w.id);
  };

  useEffect(() => {
    if (!isSignedIn) router.push("/sign-in");
  }, [isSignedIn, router]);

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
              onClick={() => void createWorkspace()}
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
        onClick={() => router.back()}
      >
        Cancel
      </Button>
    </>
  );
}
