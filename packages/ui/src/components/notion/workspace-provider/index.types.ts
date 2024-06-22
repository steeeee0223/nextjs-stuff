import type { IconInfo } from "@/components/custom/icon-block";

export interface UserState {
  id: string;
  name: string;
  email: string;
}

export interface Workspace {
  id: string;
  role: "owner" | "member" | "guest";
  name: string;
  icon: IconInfo;
  members: number;
  plan: string;
}
