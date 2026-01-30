import { body } from "express-validator";

const createSpecializationValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Specialization name is required"),
        body("description")
            .optional()
            .trim(),
        body("branch")
            .trim()
            .notEmpty()
            .withMessage("Branch ID is required")
            .isMongoId(),
        body("institution")
            .trim()
            .notEmpty()
            .withMessage("Institution ID is required")
            .isMongoId(),
    ];
};

const updateSpecializationValidator = () => {
    return [
        body("name").optional().trim().notEmpty(),
        body("description").optional().trim(),
        body("branch").optional().isMongoId(),
    ];
};

export { createSpecializationValidator, updateSpecializationValidator };
