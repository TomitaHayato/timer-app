import { body } from "express-validator";

// TODO?: カスタムバリデーションで、５分刻みの数値のみ許可するように修正？
export const settingsPostValidator = [
  body('workSec')
    .exists({values: 'null'})
    .notEmpty()
    .isInt({ min: 10, max: 60 })
    .toInt(),
  body('restSec')
    .exists({values: 'null'})
    .notEmpty()
    .isInt({ min: 1, max: 10 })
    .toInt(),
  body('longRestSec')
    .exists({values: 'null'})
    .notEmpty()
    .isInt({ min: 5, max: 60 })
    .toInt(),
  body('isMuted')
    .exists({values: 'null'})
    .notEmpty()
    .isBoolean()
    .toBoolean(),
  body('volume')
    .exists({values: 'null'})
    .notEmpty()
    .isInt({ min: 0, max: 100 })
    .toInt(),
]

export const settingsUpdateValidator = [
  body('workSec')
    .optional({ values: 'null' })
    .isInt({ min: 10, max: 60 })
    .toInt(),
  body('restSec')
    .optional({ values: 'null' })
    .isInt({ min: 1, max: 10 })
    .toInt(),
  body('longRestSec')
    .optional({ values: 'null' })
    .isInt({ min: 5, max: 60 })
    .toInt(),
  body('isMuted')
    .optional({ values: 'null' })
    .isBoolean()
    .toBoolean(),
  body('volume')
    .optional({ values: 'null' })
    .isInt({ min: 0, max: 100 })
    .toInt(),
]
