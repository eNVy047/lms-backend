import { body } from "express-validator";

const createCourseValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Course name is required"),
        body("institution")
            .trim()
            .notEmpty()
            .withMessage("Institution ID is required")
            .isMongoId()
            .withMessage("Invalid Institution ID"),
        body("branches")
            .optional()
            .isArray()
            .withMessage("Branches must be an array"),
        body("branches.*.name")
            .if(body("branches").exists())
            .trim()
            .notEmpty()
            .withMessage("Branch name is required"),
        body("branches.*.specializations")
            .if(body("branches").exists())
            .optional()
            .isArray()
            .withMessage("Specializations must be an array"),
        body("branches.*.specializations.*.name")
            .if(body("branches.*.specializations").exists())
            .trim()
            .notEmpty()
            .withMessage("Specialization name is required"),
    ];
};

const updateCourseValidator = () => {
    return [
        body("name").optional().trim().notEmpty().withMessage("Course name cannot be empty"),
        body("branches")
            .optional()
            .isArray()
            .withMessage("Branches must be an array"),
        body("branches.*.name")
            .if(body("branches").exists())
            .trim()
            .notEmpty()
            .withMessage("Branch name is required"),
        body("branches.*.specializations")
            .if(body("branches").exists())
            .optional()
            .isArray()
            .withMessage("Specializations must be an array"),
    ];
};

export { createCourseValidator, updateCourseValidator };
