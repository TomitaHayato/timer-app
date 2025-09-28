import { Prisma } from "../../../../generated/prisma"

export const selectAuthRefreshTokenColumns = Prisma.validator<Prisma.AuthRefreshTokenSelect>()({
  token: true,
  expiresAt: true,
});

export const selectAuthRefreshToken = Prisma.validator<Prisma.AuthRefreshTokenDefaultArgs>()({
  select: selectAuthRefreshTokenColumns,
});
