import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { account } from "~/lib";

const Workspace = async () => {
  const user = await currentUser();
  if (!user) redirect(`/select-role`);

  console.log(`[*] fetching workspaces for ${user.id}`);
  const acc = await account.byClerkId(user.id);
  if (!acc || acc.memberships.length < 1) redirect(`/onboarding`);

  const workspaceId = acc.memberships[0]!.workspaceId;
  console.log(`[*] redirect to first workspace: ${workspaceId}`);
  redirect(`/workspace/${workspaceId}`);
};

export default Workspace;
