import { Timetable } from "../models/timetable.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createTimetableEntry = asyncHandler(async (req, res) => {
    const {
        institution, course, branch, semester, section, batch,
        dayOfWeek, startTime, endTime, periodNumber, subject, teacher, roomNumber
    } = req.body;

    try {
        const entry = await Timetable.create({
            institution,
            course,
            branch,
            semester,
            section,
            batch,
            dayOfWeek,
            startTime,
            endTime,
            periodNumber,
            subject,
            teacher,
            roomNumber,
            createdBy: req.user?._id,
        });

        return res.status(201).json(new ApiResponse(201, entry, "Timetable entry created successfully"));
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(409, "Conflict detected: Teacher or Section already scheduled for this time");
        }
        throw error;
    }
});

const getTimetable = asyncHandler(async (req, res) => {
    const { institutionId, courseId, sectionId, teacherId, dayOfWeek } = req.query;
    const filter = {};
    if (institutionId) filter.institution = institutionId;
    if (courseId) filter.course = courseId;
    if (sectionId) filter.section = sectionId;
    if (teacherId) filter.teacher = teacherId;
    if (dayOfWeek) filter.dayOfWeek = dayOfWeek;

    const timetable = await Timetable.find(filter)
        .populate("course", "name")
        .populate("section", "name")
        .populate("subject", "name")
        .populate("teacher", "user")
        .sort({ dayOfWeek: 1, startTime: 1 });

    return res.status(200).json(new ApiResponse(200, timetable, "Timetable fetched successfully"));
});

const getTimetableById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const entry = await Timetable.findById(id)
        .populate("course", "name")
        .populate("section", "name")
        .populate("subject", "name")
        .populate("teacher", "user");

    if (!entry) throw new ApiError(404, "Timetable entry not found");

    return res.status(200).json(new ApiResponse(200, entry, "Timetable entry fetched successfully"));
});

const updateTimetableEntry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    updateData.updatedBy = req.user?._id;

    const entry = await Timetable.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    );

    if (!entry) throw new ApiError(404, "Timetable entry not found");

    return res.status(200).json(new ApiResponse(200, entry, "Timetable entry updated successfully"));
});

const deleteTimetableEntry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const entry = await Timetable.findByIdAndDelete(id);

    if (!entry) throw new ApiError(404, "Timetable entry not found");

    return res.status(200).json(new ApiResponse(200, {}, "Timetable entry deleted successfully"));
});

export {
    createTimetableEntry,
    getTimetable,
    getTimetableById,
    updateTimetableEntry,
    deleteTimetableEntry,
};
