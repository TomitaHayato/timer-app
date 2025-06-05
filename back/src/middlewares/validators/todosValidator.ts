import { body } from "express-validator";

export const todosPostValidator = [
  body('title')
    .exists({values: 'null'})
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({min: 1, max: 255}),
  body('deadline')
    .optional({ values: 'null' })
    .isDate()
    .toDate(),
]

export const todosUpdateValidator = [
  body('title')
    .optional({ values: 'null' })
    .isString()
    .trim()
    .escape()
    .isLength({min: 1, max: 255}),
  body('deadline')
    .optional({ values: 'null' })
    .isDate()
    .toDate(),
]

export const todosUpdateStatusValidator = [
  body('isCompleted')
    .exists({values: 'null'})
    .notEmpty()
    .isBoolean()
    .toBoolean(),
]