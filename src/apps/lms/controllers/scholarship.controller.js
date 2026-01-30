import { Scholarship, ScholarshipApplication } from "../models/scholarship.models.js";
import { Fees } from "../models/fees.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createScholarship = asyncHandler(async (req, res) => {
    const {
        institution, name, type, provider, description, amountType, value
    } = req.body;

    const scholarship = await Scholarship.create({
        institution,
        name,
        type,
        provider,
        description,
        amountType,
        value,
        createdBy: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, scholarship, "Scholarship scheme created"));
});

const applyScholarship = asyncHandler(async (req, res) => {
    const { institution, student, scholarship, documents } = req.body;

    // Validation: Check if already applied
    const existing = await ScholarshipApplication.findOne({ student, scholarship });
    if (existing) throw new ApiError(400, "Already applied for this scholarship");

    const application = await ScholarshipApplication.create({
        institution,
        student,
        scholarship,
        documents,
        status: "APPLIED"
    });

    return res.status(201).json(new ApiResponse(201, application, "Application submitted"));
});

const approveScholarship = asyncHandler(async (req, res) => {
    const { applicationId } = req.params;
    const { status, remarks, disbursedAmount } = req.body; // status: APPROVED or REJECTED

    const application = await ScholarshipApplication.findById(applicationId).populate("scholarship");
    if (!application) throw new ApiError(404, "Application not found");

    application.status = status;
    application.remarks = remarks;

    if (status === "APPROVED") {
        application.approvedDate = new Date();
        application.approvedBy = req.user._id;

        // Calculate amount if not strictly provided, based on scheme
        if (!disbursedAmount) {
            // Logic to calculate based on scheme value
            // For now, assume admin provides final amount approved or we use scheme value generic
            application.disbursedAmount = application.scholarship.value; // Simplification
        } else {
            application.disbursedAmount = disbursedAmount;
        }
    } else if (status === "REJECTED") {
        application.rejectionReason = remarks;
    }

    await application.save();

    return res.status(200).json(new ApiResponse(200, application, "Application processed"));
});

export { createScholarship, applyScholarship, approveScholarship };
