import type { IconInfo } from "@swy/ui/shared";
import { type User } from "@swy/validators";

export const fallbackIcon: IconInfo = { type: "text", text: "W" };
export const fallbackUser: User = {
  id: "",
  name: "",
  email: "",
  avatarUrl: "",
};

// export const fallbackWorkspace: Workspace = {
//   id: "",
//   role: Role.GUEST,
//   name: "",
//   icon: fallbackIcon,
//   members: 0,
//   plan: Plan.FREE,
// };
