import z from "..";

export const emailSchema = z
  .string()
  .email()
  .optional();

export const createUserSchema = z.object({
  email: z.string().optional(),
  walletAddress: z.string().optional(),
  loginProvider: z.enum(["EMAIL", "WALLET"]),
  isVerified: z.boolean().default(false)
});

export type IUserAuthType = z.infer<typeof createUserSchema>;