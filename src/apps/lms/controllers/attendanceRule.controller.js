import { AttendanceRule } from "../models/attendanceRule.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createAttendanceRule = asyncHandler(async (req, res) => {
    const { institution, name, targetRole, workingDays, minAttendancePercentage, lateGracePeriodMinutes, penaltyRules, sessionStartTime, sessionEndTime } = req.body;

    const rule = await AttendanceRule.create({
        institution,
        name,
        targetRole,
        workingDays,
        minAttendancePercentage,
        lateGracePeriodMinutes,
        penaltyRules,
        sessionStartTime,
        sessionEndTime,
        createdBy: req.user?._id,
    });

    return res.status(201).json(new ApiResponse(201, rule, "Attendance rule created successfully"));
});

const getAllAttendanceRules = asyncHandler(async (req, res) => {
    const { institutionId, role } = req.query;
    const filter = {};
    if (institutionId) filter.institution = institutionId;
    if (role) filter.targetRole = role;

    const rules = await AttendanceRule.find(filter);
    return res.status(200).json(new ApiResponse(200, rules, "Attendance rules fetched successfully"));
});

const updateAttendanceRule = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const rule = await AttendanceRule.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    );

    if (!rule) throw new ApiError(404, "Attendance rule not found");

    return res.status(200).json(new ApiResponse(200, rule, "Attendance rule updated successfully"));
});

const deleteAttendanceRule = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const rule = await AttendanceRule.findByIdAndDelete(id);

    if (!rule) throw new ApiError(404, "Attendance rule not found");

    return res.status(200).json(new ApiResponse(200, {}, "Attendance rule deleted successfully"));
});

export {
    createAttendanceRule,
    getAllAttendanceRules,
    updateAttendanceRule,
    deleteAttendanceRule
};
