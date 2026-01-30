import { body } from "express-validator";

const createFeeValidator = () => {
    return [
        body("student")
            .trim()
            .notEmpty()
            .withMessage("Student ID is required")
            .isMongoId()
            .withMessage("Invalid student ID"),
        body("course")
            .trim()
            .notEmpty()
            .withMessage("Course ID is required")
            .isMongoId()
            .withMessage("Invalid course ID"),
        body("semester")
            .notEmpty()
            .withMessage("Semester is required")
            .isInt({ min: 1, max: 12 })
            .withMessage("Semester must be between 1 and 12"),
        body("amount")
            .notEmpty()
            .withMessage("Amount is required")
            .isFloat({ min: 0 })
            .withMessage("Amount must be a positive number"),
        body("paymentType")
            .optional()
            .isIn(["FULL", "INSTALLMENT"])
            .withMessage("Payment type must be either FULL or INSTALLMENT"),
        body("installments")
            .optional()
            .isArray()
            .withMessage("Installments must be an array"),
        body("installments.*.installmentNumber")
            .if(body("installments").exists())
            .notEmpty()
            .withMessage("Installment number is required")
            .isInt({ min: 1 })
            .withMessage("Installment number must be a positive integer"),
        body("installments.*.amount")
            .if(body("installments").exists())
            .notEmpty()
            .withMessage("Installment amount is required")
            .isFloat({ min: 0 })
            .withMessage("Installment amount must be a positive number"),
        body("installments.*.dueDate")
            .if(body("installments").exists())
            .notEmpty()
            .withMessage("Installment due date is required")
            .isISO8601()
            .withMessage("Invalid installment due date format"),
        body("installments.*.description")
            .optional()
            .trim(),
        body("installments.*.semester")
            .optional()
            .isInt({ min: 1, max: 12 })
            .withMessage("Installment semester must be between 1 and 12"),
        body("dueDate")
            .notEmpty()
            .withMessage("Due date is required")
            .isISO8601()
            .withMessage("Invalid due date format"),
        body("description")
            .optional()
            .trim(),
    ];
};

const updateFeeValidator = () => {
    return [
        body("course")
            .optional()
            .trim()
            .isMongoId()
            .withMessage("Invalid course ID"),
        body("semester")
            .optional()
            .isInt({ min: 1, max: 12 })
            .withMessage("Semester must be between 1 and 12"),
        body("amount")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Amount must be a positive number"),
        body("paymentType")
            .optional()
            .isIn(["FULL", "INSTALLMENT"])
            .withMessage("Payment type must be either FULL or INSTALLMENT"),
        body("installments")
            .optional()
            .isArray()
            .withMessage("Installments must be an array"),
        body("dueDate")
            .optional()
            .isISO8601()
            .withMessage("Invalid due date format"),
        body("description")
            .optional()
            .trim(),
    ];
};

const processPaymentValidator = () => {
    return [
        body("transactionId")
            .notEmpty()
            .withMessage("Transaction ID is required")
            .trim(),
        body("paidAmount")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Paid amount must be a positive number"),
    ];
};

export {
    createFeeValidator,
    updateFeeValidator,
    processPaymentValidator,
};
