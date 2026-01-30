import { Courses } from "../models/courses.models.js";
import { Institution } from "../models/institution.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createCourse = asyncHandler(async (req, res) => {
    const { name, institution, branches } = req.body;

    // Verify institution exists
    const institutionExists = await Institution.findById(institution);
    if (!institutionExists) {
        throw new ApiError(404, "Institution not found");
    }

    const course = await Courses.create({
        name,
        institution,
        branches,
        createdBy: req.user?._id,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, course, "Course created successfully"));
});

const getAllCourses = asyncHandler(async (req, res) => {
    const { institutionId } = req.query;
    const filter = institutionId ? { institution: institutionId } : {};

    const courses = await Courses.find(filter)
        .populate("institution", "name")
        .populate("createdBy", "fullName email");

    return res
        .status(200)
        .json(new ApiResponse(200, courses, "Courses fetched successfully"));
});

const getCourseById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await Courses.findById(id)
        .populate("institution", "name")
        .populate("createdBy", "fullName email")
        .populate("updatedBy", "fullName email");

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, course, "Course fetched successfully"));
});

const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, branches } = req.body;

    const course = await Courses.findByIdAndUpdate(
        id,
        {
            $set: {
                name,
                branches,
                updatedBy: req.user?._id
            }
        },
        { new: true, runValidators: true }
    )
        .populate("institution", "name")
        .populate("createdBy", "fullName email")
        .populate("updatedBy", "fullName email");

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, course, "Course updated successfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await Courses.findByIdAndDelete(id);

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Course deleted successfully"));
});

export {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};
