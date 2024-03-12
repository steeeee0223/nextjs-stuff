// import { type LucideIcon } from "lucide-react";

export interface UserState {
  id: string;
  name: string;
  email: string;
  isDarkMode: boolean;
  profilePicture: {
    url: string;
  };
}

export interface Workspace {
  id: string;
  ownerId: string;
  owner: string;
  name: string;
  icon?: string | null; // | LucideIcon
  members: string[];
}
