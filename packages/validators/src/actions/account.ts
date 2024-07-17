import { z } from "zod";

export const CreateAccount = z.object({
  clerkId: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string(),
});

export type CreateAccountInput = z.infer<typeof CreateAccount>;

export const DeleteAccount = z.object({
  id: z.string(),
  clerkId: z.string(),
});

export type DeleteAccountInput = z.infer<typeof DeleteAccount>;

export const UpdateAccount = z.object({
  avatarUrl: z.string().optional(),
  preferredName: z.string().optional(),
  email: z.string().email().optional(),
  hasPassword: z.boolean().optional(),
});

export type UpdateAccountInput = z.infer<typeof UpdateAccount>;
