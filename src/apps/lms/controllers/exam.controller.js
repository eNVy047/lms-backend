import { Exam } from "../models/exam.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createExam = asyncHandler(async (req, res) => {
    const { name, examType, date, course, semester, institution } = req.body;

    const exam = await Exam.create({
        name,
        examType,
        date,
        course,
        semester,
        institution,
        createdBy: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, exam, "Exam created successfully"));
});

const getAllExams = asyncHandler(async (req, res) => {
    const { institutionId, courseId, semester, publishStatus } = req.query;
    const filter = {};

    if (institutionId) filter.institution = institutionId;
    if (courseId) filter.course = courseId;
    if (semester) filter.semester = parseInt(semester);
    if (publishStatus) filter.publishStatus = publishStatus;

    const exams = await Exam.find(filter)
        .populate("course", "name")
        .sort({ date: -1 });

    return res.status(200).json(new ApiResponse(200, exams, "Exams fetched successfully"));
});

const publishExam = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const exam = await Exam.findByIdAndUpdate(
        id,
        {
            $set: {
                publishStatus: "PUBLISHED",
                publishedAt: new Date(),
                publishedBy: req.user._id
            }
        },
        { new: true }
    );

    if (!exam) {
        throw new ApiError(404, "Exam not found");
    }

    return res.status(200).json(new ApiResponse(200, exam, "Exam published successfully"));
});

export { createExam, getAllExams, publishExam };
