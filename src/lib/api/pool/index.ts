import { prisma } from "@/lib/prisma/index";
import { INewPoolType } from "@/lib/zod/schemas/pool";

export const poolsInfo = async () => {
  try {
    const pool = await prisma.pool.findMany();
    return pool;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const createNewPool = async (data: INewPoolType) => {
  try {
    const {
      poolName,
      description,
      maxContribution,
      minContribution,
      targetSol,
      assetType,
    } = data;
    const pool = await prisma.pool.create({
      data: {
        name: poolName,
        description,
        assetType,
        minContribution,
        maxContribution,
        targetFunds: targetSol,
        creatorId: "1",
        totalCollectedSol: 0
      },
    });
    return pool;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
