import { prisma } from "@/lib/prisma/index";
import { INewPoolType } from "@/lib/zod/schemas/pool";
import { INewProposalType } from "@/lib/zod/schemas/proposal";

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
        totalCollectedSol: 0,
      },
    });
    return pool;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const poolDetails = async (poolId: string) => {
  try {
    const poolData = await prisma.pool.findUnique({
      where: {
        id: poolId,
      },
      include: {
        proposals: true,
        contributions: true,
        assets: true,
      },
    });
    return poolData;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const proposals = async () => {
  try {
    const data = await prisma.proposal.findMany();
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const createNewProposal = async (data: INewProposalType) => {
  try {
    const { description, type, proposerId, poolId } = data;

    const pool = await prisma.proposal.create({
      data: {
        description,
        type,
        poolId: poolId || "",
        proposerId: proposerId || "",
      },
    });
    return pool;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
