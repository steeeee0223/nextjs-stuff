"use client";

import { useSearchParams } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";

import { Button } from "@swy/ui/shadcn";
import { IconBlock, Spinner } from "@swy/ui/shared";

import { useInvitation } from "~/hooks";
import { parseBool, toIconInfo } from "~/lib";

interface Params {
  params: { token: string };
}

export default function Page({ params: { token } }: Params) {
  // Get the token from the query params
  const clerkTicket = !!useSearchParams().get("__clerk_ticket");
  const withClerkTicket = parseBool(useSearchParams().get("withClerkTicket"));

  const { openSignIn, openSignUp } = useClerk();
  const { user, isSignedIn } = useUser();
  const { data, isLoading, joinWorkspace } = useInvitation({
    token,
    clerkId: user?.id,
  });

  const login = () => {
    if (clerkTicket) {
      openSignUp({ forceRedirectUrl: `/invite/${token}` });
    } else {
      openSignIn({
        forceRedirectUrl: `/invite/${token}`,
        signUpForceRedirectUrl: `/invite/${token},`,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-12 p-10">
      {isLoading ? (
        <Spinner size="lg" />
      ) : data ? (
        <>
          <div className="flex w-[320px] flex-col items-center gap-4">
            <IconBlock
              icon={toIconInfo(data.workspace.icon, data.workspace.name)}
              size="lg"
            />
            <h1 className="flex w-full flex-col text-center text-xl font-medium">
              Join to see this page in {data.workspace.name}
            </h1>
          </div>
          <div className="flex w-[240px] flex-col items-center gap-3">
            {!data.isSignedIn || !isSignedIn ? (
              <Button className="w-full" onClick={login}>
                Sign in
              </Button>
            ) : (
              <Button
                variant="blue"
                onClick={() => joinWorkspace(withClerkTicket ?? clerkTicket)}
                className="w-full"
              >
                Continue
              </Button>
            )}
          </div>
        </>
      ) : (
        <h1 className="flex w-full flex-col text-center text-xl font-medium">
          Invitation not found
        </h1>
      )}
    </div>
  );
}
