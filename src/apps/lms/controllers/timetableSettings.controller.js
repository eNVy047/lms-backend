import { TimetableSettings } from "../models/timetableSettings.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createTimetableSettings = asyncHandler(async (req, res) => {
    const { institution, name, workingDays, startTime, endTime, periodDuration, periodsPerDay, breaks } = req.body;

    const settings = await TimetableSettings.create({
        institution,
        name,
        workingDays,
        startTime,
        endTime,
        periodDuration,
        periodsPerDay,
        breaks,
        createdBy: req.user?._id,
    });

    return res.status(201).json(new ApiResponse(201, settings, "Timetable settings created successfully"));
});

const getTimetableSettings = asyncHandler(async (req, res) => {
    const { institutionId } = req.query;
    const filter = institutionId ? { institution: institutionId } : {};
    const settings = await TimetableSettings.find(filter);
    return res.status(200).json(new ApiResponse(200, settings, "Timetable settings fetched successfully"));
});

const updateTimetableSettings = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    updateData.updatedBy = req.user?._id;

    const settings = await TimetableSettings.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    );

    if (!settings) throw new ApiError(404, "Timetable settings not found");

    return res.status(200).json(new ApiResponse(200, settings, "Timetable settings updated successfully"));
});

const deleteTimetableSettings = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const settings = await TimetableSettings.findByIdAndDelete(id);

    if (!settings) throw new ApiError(404, "Timetable settings not found");

    return res.status(200).json(new ApiResponse(200, {}, "Timetable settings deleted successfully"));
});

export {
    createTimetableSettings,
    getTimetableSettings,
    updateTimetableSettings,
    deleteTimetableSettings
};
