import { LeaveRequest } from "../models/leave.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { leaveStatusMailgenContent, sendEmail } from "../../../common/utils/mail.js";

const applyLeave = asyncHandler(async (req, res) => {
    const { institution, leaveType, startDate, endDate, reason } = req.body;
    const leave = await LeaveRequest.create({
        user: req.user._id,
        institution,
        leaveType,
        startDate,
        endDate,
        reason
    });
    return res.status(201).json(new ApiResponse(201, leave, "Leave application submitted"));
});

const updateLeaveStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, comment } = req.body;

    const leave = await LeaveRequest.findByIdAndUpdate(
        id,
        { $set: { status, comment, approvedBy: req.user._id } },
        { new: true }
    ).populate("user", "fullName email");

    if (!leave) throw new ApiError(404, "Leave request not found");

    // Send email notification to user
    await sendEmail({
        email: leave.user.email,
        subject: `Leave Request ${status.toUpperCase()}`,
        mailgenContent: leaveStatusMailgenContent(
            leave.user.fullName,
            leave.leaveType,
            status,
            leave.startDate.toDateString(),
            leave.endDate.toDateString(),
            comment
        ),
    });

    return res.status(200).json(new ApiResponse(200, leave, `Leave request ${status}`));
});

const getMyLeaves = asyncHandler(async (req, res) => {
    const leaves = await LeaveRequest.find({ user: req.user._id });
    return res.status(200).json(new ApiResponse(200, leaves, "Your leaves fetched"));
});

const getAllLeaveRequests = asyncHandler(async (req, res) => {
    const { institutionId, status } = req.query;
    const filter = { institution: institutionId };
    if (status) filter.status = status;
    const leaves = await LeaveRequest.find(filter).populate("user", "fullName email");
    return res.status(200).json(new ApiResponse(200, leaves, "Leave requests fetched"));
});

export { applyLeave, updateLeaveStatus, getMyLeaves, getAllLeaveRequests };
