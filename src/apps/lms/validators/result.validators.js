import { body } from "express-validator";

const createResultValidator = () => {
    return [
        body("student").trim().notEmpty().isMongoId().withMessage("Student ID is required"),
        body("institution").trim().notEmpty().isMongoId().withMessage("Institution ID is required"),
        body("contentId").trim().notEmpty().isMongoId().withMessage("Content ID is required"),
        body("contentType")
            .trim()
            .notEmpty()
            .isIn(["Quizz", "Assignment", "Exam", "Other"])
            .withMessage("Invalid content type"),
        body("resultType")
            .trim()
            .notEmpty()
            .isIn(["MID-TERM", "FINAL", "QUICK-TEST", "INTERNAL", "EXTERNAL", "OTHERS"])
            .withMessage("Invalid result type"),
        body("score").notEmpty().isNumeric().withMessage("Score must be a number"),
        body("totalScore").notEmpty().isNumeric().withMessage("Total score must be a number"),
        body("isPublished").optional().isBoolean(),
        body("grade").optional().trim(),
    ];
};

export { createResultValidator };
