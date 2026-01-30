import { body } from "express-validator";

const createInstitutionSetupValidator = () => {
    return [
        body("institution")
            .trim()
            .notEmpty()
            .withMessage("Institution ID is required")
            .isMongoId(),
        body("registrationCertificate")
            .trim()
            .notEmpty()
            .withMessage("Registration certificate URL is required"),
        body("affiliationCertificate")
            .trim()
            .notEmpty()
            .withMessage("Affiliation certificate URL is required"),
        body("trustRegistration")
            .trim()
            .notEmpty()
            .withMessage("Trust registration certificate URL is required"),
        body("panNumber")
            .trim()
            .notEmpty()
            .withMessage("PAN number is required"),
        body("bankDetails.accountName")
            .trim()
            .notEmpty()
            .withMessage("Bank account name is required"),
        body("bankDetails.accountNumber")
            .trim()
            .notEmpty()
            .withMessage("Bank account number is required"),
        body("bankDetails.ifsc")
            .trim()
            .notEmpty()
            .withMessage("IFSC code is required"),
        body("bankDetails.bankName")
            .trim()
            .notEmpty()
            .withMessage("Bank name is required"),
        body("bankDetails.branch")
            .trim()
            .notEmpty()
            .withMessage("Bank branch is required"),
    ];
};

const updateInstitutionSetupValidator = () => {
    return [
        body("panNumber").optional().trim().notEmpty(),
        body("bankDetails.accountName").optional().trim().notEmpty(),
        // Add others as needed
    ];
};

const registerAddressValidator = () => {
    return [
        body("universityName").trim().notEmpty().withMessage("University name is required"),
        body("addressLine1").trim().notEmpty().withMessage("Address line 1 is required"),
        body("city").trim().notEmpty().withMessage("City is required"),
        body("pincode").trim().notEmpty().withMessage("Pincode is required"),
        body("country").trim().notEmpty().withMessage("Country is required"),
    ];
};

const verifyContactValidator = () => {
    return [
        body("email").trim().isEmail().withMessage("Valid email is required"),
        body("phone")
            .notEmpty()
            .withMessage("Phone is required")
            .custom((value) => {
                if (typeof value !== "object" || !value.countryCode || !value.number) {
                    throw new Error("Phone must include countryCode and number");
                }
                return true;
            }),
    ];
};

export {
    createInstitutionSetupValidator,
    updateInstitutionSetupValidator,
    registerAddressValidator,
    verifyContactValidator
};
