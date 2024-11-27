import { IconBlock } from "@swy/ui/shared";

import { accounts } from "~/db/accounts";
import { SignInButton } from "./_components/sign-in-button";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-12 p-10">
      <div className="flex w-[320px] flex-col items-center gap-4">
        <IconBlock
          icon={{ type: "lucide", name: "user-round-check", color: "#448361" }}
          size="lg"
        />
        <h1 className="flex w-full flex-col text-center text-xl font-medium">
          Sign in with ...
        </h1>
        <div className="flex w-[240px] flex-col items-center gap-3">
          {Object.values(accounts).map(({ name, avatarUrl }) => (
            <SignInButton name={name} avatarUrl={avatarUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}
