import { body } from "express-validator";

export const taskValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must be at most 100 characters"),

  body("content").optional().isString().withMessage("Content must be a string"),

  body("due_date")
    .optional()
    .isISO8601()
    .withMessage("Due date must be a valid date (ISO8601)"),

  body("color").optional().isString().withMessage("Color must be a string"),
];
