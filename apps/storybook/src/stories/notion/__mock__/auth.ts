import { getRandomUser, getUser } from "@swy/notion/mock";

const userId = getRandomUser().id;

/**
 * These utilities are used when deploying an example on liveblocks.io.
 * You can ignore them completely if you run the example locally.
 */
export async function getSession(request: Request) {
  const { room } = (await request.json()) as { room: string };
  const user = getUser(userId);

  if (!user) throw Error("User not found");
  return { room, user };
}
