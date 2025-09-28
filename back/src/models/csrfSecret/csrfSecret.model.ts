import { PrismaClient } from "../../../generated/prisma";
import { CsrfSecretOnly } from "../../types/csrf";
import { selectCsrfSecret } from "./utils/selectOption";

export const getCsrfSecret = async(prisma: PrismaClient, userId: string): Promise<CsrfSecretOnly | null> => {
  return await prisma.csrfSecret.findUnique({
    ...selectCsrfSecret,
    where: { userId },
  })
}

export const createOrUpdateCsrfSecret = async(prisma: PrismaClient, queryParams: { userId: string, secret: string }): Promise<CsrfSecretOnly> => {
  const { userId, secret } = queryParams;
  return await prisma.csrfSecret.upsert({
    ...selectCsrfSecret,
    where: { userId },
    create: {
      secret,
      userId,
    },
    update: { secret }
  })
}
