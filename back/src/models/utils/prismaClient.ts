import { PrismaClient } from "../../../generated/prisma"
import { isProduction } from "../../utils/handleENV"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prismaClient = globalForPrisma.prisma ?? new PrismaClient()

if (!isProduction()) globalForPrisma.prisma = prismaClient