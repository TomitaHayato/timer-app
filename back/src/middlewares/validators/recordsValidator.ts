import { body } from "express-validator";

export const recordsPostValidator = [
  body('workCount')
    .notEmpty()
    .isInt({ min: 0 })
    .toInt(),
  body('workTime')
    .notEmpty()
    .isInt({ min: 0 })
    .toInt(),
]
