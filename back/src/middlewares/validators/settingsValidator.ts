import { body } from "express-validator";

// TODO?: カスタムバリデーションで、５分刻みの数値のみ許可するように修正？
export const settingsPostValidator = [
  body('workSec')
    .notEmpty()
    .isInt({ min: 10 * 60, max: 60 * 60 })
    .toInt(),
  body('restSec')
    .notEmpty()
    .isInt({ min: 1 * 60, max: 10 * 60 })
    .toInt(),
  body('longRestSec')
    .notEmpty()
    .isInt({ min: 5 * 60, max: 60 * 60 })
    .toInt(),
  body('isMuted')
    .notEmpty()
    .isBoolean()
    .toBoolean(),
  body('volume')
    .notEmpty()
    .isInt({ min: 0, max: 100 })
    .toInt(),
  body('workingSound')
    .optional({ values: 'null' })
    .isString(),
  body('bgImage')
    .optional({ values: 'null' })
    .isString(),
]

export const settingsUpdateValidator = [
  body('workSec')
    .isInt({ min: 10 * 60, max: 60 * 60 })
    .toInt(),
  body('restSec')
    .isInt({ min: 1 * 60, max: 10 * 60 })
    .toInt(),
  body('longRestSec')
    .isInt({ min: 5 * 60, max: 60 * 60 })
    .toInt(),
  body('isMuted')
    .isBoolean()
    .toBoolean(),
  body('volume')
    .isInt({ min: 0, max: 100 })
    .toInt(),
  body('workingSound')
    .optional({ values: 'null' })
    .isString(),
  body('bgImage')
    .optional({ values: 'null' })
    .isString(),
]
