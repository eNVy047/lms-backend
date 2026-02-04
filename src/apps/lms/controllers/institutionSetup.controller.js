import { InstitutionSetup } from "../models/institutionSetup.models.js";
import { Institution } from "../models/institution.models.js";
import { User } from "../../../common/models/user.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { sendVerificationOTP } from "../../../common/utils/twilio.js";

const createInstitutionSetup = asyncHandler(async (req, res) => {
    const {
        institution,
        registrationCertificate,
        affiliationCertificate,
        trustRegistration,
        panNumber,
        gstNumber,
        bankDetails
    } = req.body;

    // Verify institution exists
    const institutionExists = await Institution.findById(institution);
    if (!institutionExists) {
        throw new ApiError(404, "Institution not found");
    }

    // Check if setup already exists
    const existingSetup = await InstitutionSetup.findOne({ institution });
    if (existingSetup) {
        throw new ApiError(409, "Setup details already exist for this institution");
    }

    const setup = await InstitutionSetup.create({
        institution,
        registrationCertificate,
        affiliationCertificate,
        trustRegistration,
        panNumber,
        gstNumber,
        bankDetails
    });

    return res
        .status(201)
        .json(new ApiResponse(201, setup, "Institution setup details saved successfully"));
});

const getInstitutionSetup = asyncHandler(async (req, res) => {
    const { institutionId } = req.params;
    const setup = await InstitutionSetup.findOne({ institution: institutionId }).populate("institution");

    if (!setup) {
        throw new ApiError(404, "Setup details not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, setup, "Setup details fetched successfully"));
});

const updateInstitutionSetup = asyncHandler(async (req, res) => {
    // ID here is the SETUP document ID, or we could look up by institution ID
    const { id } = req.params;
    const { bankDetails, panNumber, gstNumber } = req.body;

    const setup = await InstitutionSetup.findByIdAndUpdate(
        id,
        {
            $set: {
                bankDetails, // Note: this might replace the whole object if not careful with deep merge. Mongoose $set replaces top level fields.
                panNumber,
                gstNumber
            },
        },
        { new: true }
    );

    if (!setup) {
        throw new ApiError(404, "Setup details not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, setup, "Setup details updated successfully"));
});

const registerAddress = asyncHandler(async (req, res) => {
    const { universityName, addressLine1, city, pincode, country } = req.body;

    if (!universityName || !addressLine1 || !city || !pincode || !country) {
        throw new ApiError(400, "All address fields are required");
    }

    // Combine for Institution model's simple address field
    const fullAddress = `${addressLine1}, ${city}, ${pincode}, ${country}`;

    // Create or Update Institution (Partial)
    let institution = await Institution.findOne({ owner: req.user._id });

    if (institution) {
        institution.name = universityName;
        institution.address = fullAddress;
        await institution.save({ validateBeforeSave: false });
    } else {
        institution = await Institution.create({
            name: universityName,
            address: fullAddress,
            owner: req.user._id,
            // Provide placeholder values for required fields that are collected in later steps
            email: `temp_${Date.now()}@placeholder.com`,
            domain: `temp_${Date.now()}.com`,
            logo: "https://via.placeholder.com/200x200.png"
        });
    }

    return res.status(200).json(
        new ApiResponse(200, institution, "University address registered successfully")
    );
});

const verifyContact = asyncHandler(async (req, res) => {
    const { email, phone } = req.body;

    if (!email || !phone || !phone.countryCode || !phone.number) {
        throw new ApiError(400, "Email and complete phone details (countryCode and number) are required");
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Update user's contact info temporarily for verification if needed, 
    // or just let the generic verify-otp endpoint handle the validation.
    // Here we trigger the OTP send.
    const { otp, hashedOtp, otpExpiry } = user.generatePhoneOTP();
    user.phoneVerificationToken = hashedOtp;
    user.phoneVerificationExpiry = otpExpiry;
    user.phone = phone; // Tentatively update phone
    user.email = email; // Tentatively update email
    await user.save({ validateBeforeSave: false });

    await sendVerificationOTP(`${phone.countryCode}${phone.number}`, otp);

    return res.status(200).json(
        new ApiResponse(200, { email, phone, otpSent: true }, "OTP sent to your phone number for verification")
    );
});

export {
    createInstitutionSetup,
    getInstitutionSetup,
    updateInstitutionSetup,
    registerAddress,
    verifyContact
};
