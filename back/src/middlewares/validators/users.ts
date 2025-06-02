import { body } from "express-validator";

export const userPostValidator = [
  body('name')
    .notEmpty()
    .escape(),
  body('email')
    .notEmpty()
    .isEmail()
    .custom(async (value) => {
      // DBからvalueのemailを持つUserを取得する。
      // もし、そのUserが存在するならfalseを返す
      return true
    })
    .withMessage('既に登録されたメールアドレスはご利用できません'),
  body('password')
    .notEmpty()
    .isLength({ min: 6 }),
  body('passwordConfirmation')
    .notEmpty()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('パスワードとパスワード確認が一致しません'),
]

export const signInValidator = [
  body('email')
    .notEmpty()
    .isEmail(),
  body('password')
    .notEmpty(),
]
