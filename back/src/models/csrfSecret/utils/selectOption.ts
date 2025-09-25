import { Prisma } from "../../../../generated/prisma";

export const selectCsrfSecretColumns = Prisma.validator<Prisma.CsrfSecretSelect>()({
  secret: true,
});

export const selectCsrfSecret = Prisma.validator<Prisma.CsrfSecretDefaultArgs>()({
  select: selectCsrfSecretColumns,
});
