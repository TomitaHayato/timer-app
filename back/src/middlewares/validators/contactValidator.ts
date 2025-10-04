import { body } from "express-validator";

export const contactValidator = [
  body("subject")
    .trim()
    .notEmpty()
    .isString(),
  body("reply")
    .notEmpty()
    .isBoolean()
    .toBoolean(),
  body("body")
    .trim()
    .notEmpty()
    .isString(),
  body("email")
    .if(body("reply").equals("true"))
    .trim()
    .notEmpty()
    .isEmail(),
]
