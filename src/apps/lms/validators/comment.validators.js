import { body } from "express-validator";

const createCommentValidator = () => {
    return [
        body("content").trim().notEmpty().withMessage("Content is required"),
        body("contentId").trim().notEmpty().isMongoId().withMessage("Content ID is required"),
        body("contentType")
            .trim()
            .notEmpty()
            .isIn(["Video", "Assignment", "Exam", "Subject", "Note", "Announcement"])
            .withMessage("Invalid content type"),
    ];
};

export { createCommentValidator };
