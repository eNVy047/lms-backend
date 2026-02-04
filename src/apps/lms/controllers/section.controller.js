import { Section } from "../models/section.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createSection = asyncHandler(async (req, res) => {
    const { institution, name, course, branch, semester, batch, capacity } = req.body;

    const section = await Section.create({
        institution,
        name,
        course,
        branch,
        semester,
        batch,
        capacity,
        createdBy: req.user?._id,
    });

    return res.status(201).json(new ApiResponse(201, section, "Section created successfully"));
});

const getAllSections = asyncHandler(async (req, res) => {
    const { institutionId, courseId, semester, batch } = req.query;
    const filter = {};
    if (institutionId) filter.institution = institutionId;
    if (courseId) filter.course = courseId;
    if (semester) filter.semester = semester;
    if (batch) filter.batch = batch;

    const sections = await Section.find(filter)
        .populate("institution", "name")
        .populate("course", "name");

    return res.status(200).json(new ApiResponse(200, sections, "Sections fetched successfully"));
});

const getSectionById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const section = await Section.findById(id)
        .populate("institution", "name")
        .populate("course", "name");

    if (!section) throw new ApiError(404, "Section not found");

    return res.status(200).json(new ApiResponse(200, section, "Section fetched successfully"));
});

const updateSection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, capacity, semester, batch } = req.body;

    const section = await Section.findByIdAndUpdate(
        id,
        {
            $set: { name, capacity, semester, batch, updatedBy: req.user?._id },
        },
        { new: true }
    );

    if (!section) throw new ApiError(404, "Section not found");

    return res.status(200).json(new ApiResponse(200, section, "Section updated successfully"));
});

const deleteSection = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const section = await Section.findByIdAndDelete(id);

    if (!section) throw new ApiError(404, "Section not found");

    return res.status(200).json(new ApiResponse(200, {}, "Section deleted successfully"));
});

export {
    createSection,
    getAllSections,
    getSectionById,
    updateSection,
    deleteSection,
};
