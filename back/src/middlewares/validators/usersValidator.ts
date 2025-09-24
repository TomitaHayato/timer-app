import { body } from "express-validator";
import { dbQueryHandler } from "../../models/utils/queryErrorHandler";
import { getUserByEmail } from "../../models/users/users";

export const userPostValidator = [
  body('name')
    .optional({ values: 'null' })
    .isString()
    .notEmpty()
    .escape(),
  body('email')
    .optional({ values: 'null' })
    .isString()
    .notEmpty()
    .isEmail()
    .custom(async(value) => {
      // emailの一意性を保証
      const existingUser = await dbQueryHandler(getUserByEmail, value);
      if (existingUser) throw new Error('既に登録されたメールアドレスはご利用できません');

      return true;
    }),
  body('password')
    .optional({ values: 'null' })
    .isString()
    .notEmpty()
    .isLength({ min: 6 }),
  body('passwordConfirmation')
    .optional({ values: 'null' })
    .isString()
    .notEmpty()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value === req.body.password) return true;

      throw new Error('パスワードとパスワード確認が一致しません');
    })
]

export const signInValidator = [
  body('email')
    .optional({ values: 'null' })
    .notEmpty()
    .isString()
    .isEmail(),
  body('password')
    .optional({ values: 'null' })
    .isString()
    .notEmpty(),
]
