import { body } from "express-validator";

export const passwordResetTokenValidator = [
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
      return value === req.body.password;
    })
    .withMessage('パスワードとパスワード確認が一致しません'),
]