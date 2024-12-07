import type { AccountModel } from "../types";

export enum _USER {
  U1 = "a97f4e50-0b72-44f4-a95a-aba319534af5",
  U2 = "22bd2a9e-bbee-4f3f-9c78-6a430a2c29b2",
  U3 = "83e2f249-f02c-4971-b8fc-cda5cf71dd77",
}

export const accounts: Record<string, AccountModel> = {
  [_USER.U1]: {
    id: _USER.U1,
    name: "Steve Yu",
    clerkId: "user_2",
    email: "steve-yu@example.com",
    avatarUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Go_gopher_favicon.svg/1200px-Go_gopher_favicon.svg.png",
    preferredName: "Steve",
    updatedAt: Date.UTC(2024, 1, 1),
  },
  [_USER.U2]: {
    id: _USER.U2,
    name: "Chien Pong",
    clerkId: "user_3",
    email: "pong123@example.com",
    avatarUrl: "https://avatars.githubusercontent.com/u/91364382",
    preferredName: "Pong",
    updatedAt: Date.UTC(2024, 1, 1),
  },
  [_USER.U3]: {
    id: _USER.U3,
    name: "Chia Ming",
    clerkId: "user_4",
    email: "chiaming@example.com",
    avatarUrl: "https://avatars.githubusercontent.com/u/15240773",
    preferredName: "Mark",
    updatedAt: Date.UTC(2024, 1, 1),
  },
  // "45d7e133-d354-47c2-881b-441b7f95a327": {
  //   id: "45d7e133-d354-47c2-881b-441b7f95a327",
  //   name: "John Wick",
  //   clerkId: "user_1",
  //   email: "john-wick@example.com",
  //   avatarUrl: "",
  //   preferredName: "John Wick",
  //   updatedAt: Date.UTC(2024, 1, 1),
  // },
};

export const githubAccounts: Record<string, string> = {
  [_USER.U1]: "steeeee0223",
  [_USER.U2]: "pong1013",
  [_USER.U3]: "itschiaming",
};
