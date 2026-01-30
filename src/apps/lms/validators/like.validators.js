import { body } from "express-validator";

const toggleLikeValidator = () => {
    return [
        body("contentId")
            .trim()
            .notEmpty()
            .withMessage("Content ID is required")
            .isMongoId()
            .withMessage("Invalid Content ID"),
        body("contentType")
            .trim()
            .notEmpty()
            .withMessage("Content type is required")
            .isIn(["Video", "Assignment", "Exam", "Comment", "Note", "Announcement", "Subject"])
            .withMessage("Invalid content type"),
    ];
};

export { toggleLikeValidator };
