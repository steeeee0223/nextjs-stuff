import { randomItem } from "@swy/ui/lib";
import type { User } from "@swy/validators";

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Wick",
    avatarUrl: "https://avatarfiles.alphacoders.com/370/370979.jpg",
    email: "john-wick@example.com",
  },
  {
    id: "user2",
    name: "ShadCN",
    avatarUrl: "https://github.com/shadcn.png",
    email: "shadcn@example.com",
  },
  {
    id: "user3",
    name: "Pong",
    avatarUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Go_gopher_favicon.svg/1200px-Go_gopher_favicon.svg.png",
    email: "pong@example.com",
  },
  {
    id: "user4",
    name: "Charlie Layne",
    email: "charlie.layne@example.com",
    avatarUrl: "https://liveblocks.io/avatars/avatar-1.png",
  },
  {
    id: "user5",
    name: "Mislav Abha",
    email: "mislav.abha@example.com",
    avatarUrl: "https://liveblocks.io/avatars/avatar-2.png",
  },
  {
    id: "user6",
    name: "Tatum Paolo",
    email: "tatum-paolo@example.com",
    avatarUrl: "https://liveblocks.io/avatars/avatar-3.png",
  },
  {
    id: "user7",
    name: "Anjali Wanda",
    email: "anjali-wanda@example.com",
    avatarUrl: "https://liveblocks.io/avatars/avatar-4.png",
  },
  {
    id: "user8",
    name: "Jody Hekla",
    email: "jody-hekla@example.com",
    avatarUrl: "https://liveblocks.io/avatars/avatar-5.png",
  },
  {
    id: "user9",
    name: "Emil Joyce",
    email: "emil-joyce@example.com",
    avatarUrl: "https://liveblocks.io/avatars/avatar-6.png",
  },
  {
    id: "user10",
    name: "Jory Quispe",
    email: "jory-quispe@example.com",
    avatarUrl: "https://liveblocks.io/avatars/avatar-7.png",
  },
  {
    id: "user11",
    name: "Quinn Elton",
    email: "quinn-elton@example.com",
    avatarUrl: "https://liveblocks.io/avatars/avatar-8.png",
  },
] as const;

export const getRandomUser = () => randomItem(mockUsers);

export const getUser = (id: string) =>
  mockUsers.find((u) => u.id === id) ?? null;
