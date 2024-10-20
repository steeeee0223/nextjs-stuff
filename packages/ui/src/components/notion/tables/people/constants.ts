import type { PartialRole } from "@/components/notion/types";

export const roleOptions: Record<
  PartialRole,
  { label: string; description: string }
> = {
  owner: {
    label: "Workspace owner",
    description:
      "Can change workspace settings and invite new members to the workspace.",
  },
  member: {
    label: "Member",
    description:
      "Cannot change workspace settings or invite new members to the workspace.",
  },
} as const;
