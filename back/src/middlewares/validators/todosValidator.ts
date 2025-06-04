import { body } from "express-validator";

export const todosPostValidator = [
  body('title')
    .notEmpty()
    .trim()
    .escape()
    .isLength({min: 1, max: 255}),
  body('deadline')
    .optional({ values: 'null' })
    .isDate(),
]

export const todosUpdateValidator = [
  body('title')
    .optional({ values: 'null' })
    .trim()
    .escape()
    .isLength({min: 1, max: 255}),
  body('deadline')
    .optional({ values: 'null' })
    .isDate(),
]

export const todosUpdateStatusValidator = [
  body('isCompleted')
    .notEmpty()
    .isBoolean(),
]