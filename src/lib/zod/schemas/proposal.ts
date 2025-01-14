import z from "..";

export const createNewProposalSchema = z.object({
  description: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  type: z.enum(["BUY", "SELL"]),
  amount: z.number().min(0, {
    message: "Amount must be a positive number.",
  }),
  poolId: z.string().optional(),
  proposerId: z.string().optional()
});
export type INewProposalType = z.infer<typeof createNewProposalSchema>;
