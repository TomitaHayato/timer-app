import { generateCsrfTokenAuto, generateCsrfTokenFromSecret } from "../middlewares/utils/csrf";
import { createOrUpdateCsrfSecret, getCsrfSecret } from "../models/csrfSecret/csrfSecret.model";
import { dbQueryHandler } from "../models/utils/queryErrorHandler";
import { CsrfInfo } from "../types/csrf";

// dbにsecretがあれば、それと対応するtokenを返す。なければ新しく生成して返す
export const getCsrfTokenAndSecret = async(userId: string): Promise<CsrfInfo> => {
  const secretInDB = await dbQueryHandler(getCsrfSecret, userId);

  if (secretInDB) {
    const secret = secretInDB.secret;
    const csrfToken = generateCsrfTokenFromSecret(secretInDB.secret);
    return { secret, csrfToken }
  } else {
    const { csrfToken, secret } = await generateCsrfTokenAuto();
    await dbQueryHandler(createOrUpdateCsrfSecret, { userId, secret });
    return { csrfToken, secret }
  }
}
