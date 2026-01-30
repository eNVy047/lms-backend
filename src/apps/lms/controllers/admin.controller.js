
import { Teacher } from "../models/teacher.models.js";
import { Student } from "../models/student.models.js";
import { Courses } from "../models/courses.models.js";
import { Fees } from "../models/fees.models.js";
import { Attendance } from "../models/attendance.models.js";
import { AcademicRecord } from "../models/academicRecord.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

// --- Faculty Management Extensions ---

// Assign Faculty to Course
const assignFaculty = asyncHandler(async (req, res) => {
    const { teacherId, courseId, semester, section, subjectId, branch } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) throw new ApiError(404, "Faculty/Teacher not found");

    // Check availability or duplicates?
    const alreadyAssigned = teacher.assignments.some(a =>
        a.course.toString() === courseId &&
        a.semester == semester &&
        a.subject.toString() === subjectId &&
        (section ? a.section === section : true) // If section specific
    );

    if (alreadyAssigned) {
        throw new ApiError(400, "Faculty already assigned to this course/subject");
    }

    teacher.assignments.push({
        course: courseId,
        branch,
        semester,
        section,
        subject: subjectId
    });

    await teacher.save();

    return res.status(200).json(new ApiResponse(200, teacher.assignments, "Faculty assigned successfully"));
});

// --- Reports & Analytics ---

const generateReports = asyncHandler(async (req, res) => {
    const { type, institutionId } = req.query; // type: PERF, ENROLL, FEES, ATTENDANCE

    if (!type) throw new ApiError(400, "Report type required");

    let reportData = {};

    switch (type) {
        case "ENROLL":
            // Course Enrollment Stats
            // Group students by course
            reportData = await Student.aggregate([
                { $match: { institution: institutionId } }, // Match strictly by ObjectId if casted, or let mongoose handle
                // Ideally should convert string ID to ObjectId if aggregation
                {
                    $group: {
                        _id: "$course",
                        count: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: "courses",
                        localField: "_id",
                        foreignField: "_id",
                        as: "courseInfo"
                    }
                },
                {
                    $project: {
                        courseName: { $arrayElemAt: ["$courseInfo.name", 0] },
                        count: 1
                    }
                }
            ]);
            break;

        case "FEES":
            // Fee Collection Summaries
            // Group by status
            reportData = await Fees.aggregate([
                // Match institution via student lookup? Fees usually have direct link? Checking model...
                // Fees model has student, course. Student has institution.
                // Ideally fees should have institution or filter by student's institution.
                // Assuming Fees controller handles filtering by student list if needed.
                // Simple status aggregation for now.
                {
                    $group: {
                        _id: "$status",
                        totalAmount: { $sum: "$amount" },
                        collectedAmount: { $sum: "$paidAmount" },
                        count: { $sum: 1 }
                    }
                }
            ]);
            break;

        case "ATTENDANCE":
            // Attendance Analytics
            // Average presence per course?
            // Expensive aggregation on millions of rows potentially. Limiting scope.
            reportData = await Attendance.aggregate([
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]);
            // Ideally we want per-class percentages.
            // Leaving basic stats for MVP.
            break;

        case "PERF":
            // Student Performance
            // Average marks per exam type?
            reportData = await AcademicRecord.aggregate([
                {
                    $group: {
                        _id: "$exam",
                        avgMarks: { $avg: "$percentage" } // If percentage stored, or calc from marks/total
                    }
                },
                {
                    $lookup: {
                        from: "exams",
                        localField: "_id",
                        foreignField: "_id",
                        as: "examInfo"
                    }
                },
                {
                    $project: {
                        examName: { $arrayElemAt: ["$examInfo.name", 0] },
                        avgMarks: 1
                    }
                }
            ]);
            break;

        default:
            throw new ApiError(400, "Invalid report type selected");
    }

    return res.status(200).json(new ApiResponse(200, reportData, `${type} Report generated`));
});

export {
    assignFaculty,
    generateReports
};
