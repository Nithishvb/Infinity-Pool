import { IUserAuthType } from "@/lib/zod/schemas/auth";
import { prisma } from "@/lib/prisma/index";

interface FindUserType {
  email: string;
  walletAddress: string;
}

export const createNewUser = async (data: IUserAuthType) => {
  try {
    const { email, walletAddress, loginProvider, isVerified } = data;

    const findUserCondition: FindUserType = {
      email: "",
      walletAddress: "",
    };

    if (email) {
      findUserCondition.email = email;
    }

    if (walletAddress) {
      findUserCondition.walletAddress = walletAddress;
    }

    const exisitingUser = await prisma.user.findUnique({
      where: findUserCondition,
    });

    if (exisitingUser) {
      return exisitingUser;
    }

    const pool = await prisma.user.create({
      data: {
        email,
        walletAddress,
        loginProvider,
        isVerified,
      },
    });
    return pool;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
