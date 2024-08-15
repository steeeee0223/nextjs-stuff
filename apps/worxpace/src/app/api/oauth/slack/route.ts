import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";

interface Channel {
  id: string;
  name?: string;
  is_member?: boolean;
}
type ConversationsListResponse =
  | { ok: true; channels: Channel[] }
  | { ok: false; error: string };

export async function GET() {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ message: "User not found" });

  // Get the OAuth access token for the user
  const oauth = await clerkClient().users.getUserOauthAccessToken(
    userId,
    "oauth_slack",
  );
  const accessToken = oauth.data[0]?.token;

  // Refer to https://api.slack.com/methods/conversations.list
  const url = "https://slack.com/api/conversations.list";
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  // Handle the response from the Slack API
  const data = (await res.json()) as ConversationsListResponse;
  if (!data.ok)
    return NextResponse.json({ message: `Slack error: ${data.error}` });

  const channels = data.channels.filter((channel) => channel.is_member);
  return NextResponse.json({ message: channels });
}
