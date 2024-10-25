import type { IconInfo } from "@swy/ui/shared";
import { Plan, Role } from "@swy/validators";

export interface Workspace {
  id: string;
  role: Role;
  name: string;
  icon: IconInfo;
  members: number;
  plan: Plan;
}
