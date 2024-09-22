import type { IconInfo } from "@/components/custom/icon-block";
import { Plan, Role } from "@/components/notion/types";

export interface Workspace {
  id: string;
  role: Role;
  name: string;
  icon: IconInfo;
  members: number;
  plan: Plan;
}
