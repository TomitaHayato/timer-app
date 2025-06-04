import { body } from "express-validator";

// TODO?: カスタムバリデーションで、５分刻みの数値のみ許可するように修正？
export const settingsPostValidator = [
  body('workSec')
    .notEmpty()
    .isInt({ min: 10, max: 60 }),
  body('restSec')
    .notEmpty()
    .isInt({ min: 1, max: 10 }),
  body('longRestSec')
    .notEmpty()
    .isInt({ min: 5, max: 60 }),
  body('isMuted')
    .notEmpty()
    .isBoolean(),
  body('volume')
    .notEmpty()
    .isInt({ min: 0, max: 100 }),
]

export const settingsUpdateValidator = [
  body('workSec')
    .optional({ values: 'null' })
    .isInt({ min: 10, max: 60 }),
  body('restSec')
    .optional({ values: 'null' })
    .isInt({ min: 1, max: 10 }),
  body('longRestSec')
    .optional({ values: 'null' })
    .isInt({ min: 5, max: 60 }),
  body('isMuted')
    .optional({ values: 'null' })
    .isBoolean(),
  body('volume')
    .optional({ values: 'null' })
    .isInt({ min: 0, max: 100 }),
]
