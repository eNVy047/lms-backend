import { body } from "express-validator";

const createStudentValidator = () => {
    return [
        body("enrollmentNumber")
            .trim()
            .notEmpty()
            .withMessage("Enrollment number is required"),
        body("rollNumber")
            .trim()
            .notEmpty()
            .withMessage("Roll number is required"),
        body("institution")
            .trim()
            .notEmpty()
            .withMessage("Institution ID is required")
            .isMongoId()
            .withMessage("Invalid Institution ID"),
        body("course")
            .trim()
            .notEmpty()
            .withMessage("Course is required")
            .isMongoId()
            .withMessage("Invalid Course ID"),
        body("branch")
            .trim()
            .notEmpty()
            .withMessage("Branch is required"),
        body("specialization")
            .optional()
            .trim(),
        body("batch")
            .trim()
            .notEmpty()
            .withMessage("Batch is required"),
        body("currentSemester")
            .notEmpty()
            .withMessage("Current semester is required")
            .isInt({ min: 1 })
            .withMessage("Current semester must be a valid number greater than 0"),
        body("section")
            .optional()
            .trim(),
        // Personal IDs
        body("abcId").optional().trim(),
        body("aadhaarNumber").optional().trim(),
        body("panNumber").optional().trim(),
        // Documents (URLs)
        body("aadhaarDocument").optional().trim(),
        body("panDocument").optional().trim(),
        body("tenthMarksheet").optional().trim(),
        body("twelfthMarksheet").optional().trim(),
        body("additionalDocuments")
            .optional()
            .isArray()
            .withMessage("Additional documents must be an array"),
        body("additionalDocuments.*.name")
            .if(body("additionalDocuments").exists())
            .notEmpty()
            .withMessage("Document name is required"),
        body("additionalDocuments.*.url")
            .if(body("additionalDocuments").exists())
            .notEmpty()
            .withMessage("Document URL is required"),
    ];
};

const updateStudentProfileValidator = () => {
    return [
        body("department").optional().trim(),
        body("course").optional().isMongoId(),
        body("branch").optional().trim().notEmpty(),
        body("specialization").optional().trim(),
        body("currentSemester").optional().isInt({ min: 1 }),
        body("section").optional().trim(),
        body("abcId").optional().trim(),
        body("aadhaarNumber").optional().trim(),
        body("panNumber").optional().trim(),
        body("aadhaarDocument").optional().trim(),
        body("panDocument").optional().trim(),
        body("tenthMarksheet").optional().trim(),
        body("twelfthMarksheet").optional().trim(),
        body("additionalDocuments")
            .optional()
            .isArray()
            .withMessage("Additional documents must be an array"),
    ];
};

export { createStudentValidator, updateStudentProfileValidator };
