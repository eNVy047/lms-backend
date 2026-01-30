import { AcademicRecord } from "../models/academicRecord.models.js";
import { Exam } from "../models/exam.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const addMarks = asyncHandler(async (req, res) => {
    const {
        student,
        exam,
        subject,
        marksObtained,
        totalMarks,
        grade,
        remarks,
        institution,
        status = "DRAFT"
    } = req.body;

    // Check optional: verify exam/student existence here or rely on mongoose

    const record = await AcademicRecord.create({
        student,
        exam,
        subject,
        marksObtained,
        totalMarks,
        grade,
        remarks,
        institution,
        status,
        createdBy: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, record, "Marks added successfully"));
});

const getStudentResults = asyncHandler(async (req, res) => {
    // Student can only see results of PUBLISHED exams
    const { studentId } = req.params; // Or derived from req.user if student
    // Ensure access control (Student sees own, Admin/Teacher sees any) handled by route middleware usually, 
    // or ownership check here.

    // Find published exams first
    const publishedExams = await Exam.find({ publishStatus: "PUBLISHED" }).distinct('_id');

    const results = await AcademicRecord.find({
        student: studentId,
        exam: { $in: publishedExams },
        status: "APPROVED" // Only approved marks
    })
        .populate("exam", "name examType date")
        .populate("subject", "name code");

    return res.status(200).json(new ApiResponse(200, results, "Results fetched successfully"));
});

const updateMarks = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { newMarks, reason } = req.body;

    const record = await AcademicRecord.findById(id);
    if (!record) {
        throw new ApiError(404, "Record not found");
    }

    // Push to history
    record.history.push({
        updatedBy: req.user._id,
        previousMarks: record.marksObtained,
        newMarks: newMarks,
        reason: reason
    });

    record.marksObtained = newMarks;
    record.updatedBy = req.user._id;
    await record.save();

    return res.status(200).json(new ApiResponse(200, record, "Marks updated successfully"));
});

export { addMarks, getStudentResults, updateMarks };
