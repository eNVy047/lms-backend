import { body } from "express-validator";

const createBranchValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("Branch name is required"),
        body("description")
            .optional()
            .trim(),
        body("branchHead.name")
            .trim()
            .notEmpty()
            .withMessage("Branch head name is required"),
        body("branchHead.phone")
            .notEmpty()
            .withMessage("Branch head phone is required")
            .custom((value) => {
                if (typeof value !== "object" || !value.countryCode || !value.number) {
                    throw new Error("Phone must include countryCode and number");
                }
                return true;
            }),
        body("course")
            .trim()
            .notEmpty()
            .withMessage("Course ID is required")
            .isMongoId(),
        body("owner")
            .trim()
            .notEmpty()
            .withMessage("Owner (Institution) ID is required")
            .isMongoId(),
    ];
};

const updateBranchValidator = () => {
    return [
        body("name").optional().trim().notEmpty(),
    ];
};

export { createBranchValidator, updateBranchValidator };
