import { z } from "zod";

const Account = z.object({
  preferredName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().nullable().optional(),
});

export const UpdateSettings = z.object({
  userId: z.string(),
  account: Account.optional(),
});

export type UpdateSettingsInput = z.infer<typeof UpdateSettings>;
