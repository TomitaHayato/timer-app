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
  body('selfReview')
    .optional({ values: 'null' })
    .isInt({ min: 0, max: 5 })
    .toInt(),
]
