import { Result } from "../models/result.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createResult = asyncHandler(async (req, res) => {
    const {
        student,
        institution,
        contentId,
        contentType,
        resultType,
        score,
        totalScore,
        isPublished,
        grade
    } = req.body;

    const percentage = (score / totalScore) * 100;

    // Simple status logic: 40% is pass
    let status = percentage >= 40 ? "PASS" : "FAIL";
    if (score === 0 && status === "FAIL") status = "FAIL"; // Maintain existing logic if any

    const result = await Result.create({
        student,
        institution,
        contentId,
        contentType,
        resultType,
        score,
        totalScore,
        percentage,
        grade,
        status,
        isPublished,
        publishedAt: isPublished ? new Date() : null
    });

    return res.status(201).json(new ApiResponse(201, result, "Result created successfully"));
});

const getResults = asyncHandler(async (req, res) => {
    const { studentId, institutionId, contentType, resultType } = req.query;
    const filter = {};
    if (studentId) filter.student = studentId;
    if (institutionId) filter.institution = institutionId;
    if (contentType) filter.contentType = contentType;
    if (resultType) filter.resultType = resultType;

    const results = await Result.find(filter)
        .populate("student", "fullName rollNumber")
        .populate("institution", "name");

    return res.status(200).json(new ApiResponse(200, results, "Results fetched successfully"));
});

export { createResult, getResults };
