import z from "..";

export const createPoolSchema = z.object({
  poolName: z.string().min(3, {
    message: "Pool name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  assetType: z.enum(["SOL"]),
  targetSol: z.number().min(0),
  minContribution: z.number().min(0),
  maxContribution: z.number().min(0),
});

export type INewPoolType = z.infer<typeof createPoolSchema>;