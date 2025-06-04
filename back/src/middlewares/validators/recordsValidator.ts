import { body } from "express-validator";

export const recordsPostValidator = [
  body('workCount')
    .notEmpty()
    .isInt({ min: 0 }),
  body('workTime')
    .notEmpty()
    .isInt({ min: 0 }),
  body('selfReview')
    .notEmpty()
    .isInt({ min: 0, max: 5 }),
]
