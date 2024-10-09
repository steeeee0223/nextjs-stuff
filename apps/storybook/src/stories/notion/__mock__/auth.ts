import { getRandomUser, getUser } from "./users";

/**
 * These utilities are used when deploying an example on liveblocks.io.
 * You can ignore them completely if you run the example locally.
 */
export async function getSession(request: Request) {
  const { room } = (await request.json()) as { room: string };
  const userId = getRandomUser().id;
  const user = getUser(userId);

  if (!user) throw Error("User not found");
  return { room, user };
}
