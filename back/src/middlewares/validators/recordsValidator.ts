import { body } from "express-validator";

export const recordsPostValidator = [
  body('workCount')
    .exists({values: 'null'})
    .notEmpty()
    .isInt({ min: 0 })
    .toInt(),
  body('workTime')
    .exists({values: 'null'})
    .notEmpty()
    .isInt({ min: 0 })
    .toInt(),
]
