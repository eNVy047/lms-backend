import { Attendance } from "../models/attendance.models.js";
import { Student } from "../models/student.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const markAttendance = asyncHandler(async (req, res) => {
    // Bulk create for a class/subject
    const {
        institution,
        course,
        semester,
        section,
        subject,
        date,
        attendanceData // Array of { studentId, status, remarks }
    } = req.body;

    if (!attendanceData || !Array.isArray(attendanceData)) {
        throw new ApiError(400, "Attendance data is required");
    }

    const records = attendanceData.map(record => ({
        student: record.studentId,
        institution,
        course,
        semester,
        section, // optional
        subject, // optional (if subject-wise)
        date: date || new Date(),
        status: record.status,
        remarks: record.remarks,
        markedBy: req.user._id,
        isSubjectWise: !!subject
    }));

    // Optionally check duplicates for same date/subject/student to prevent double entry
    // For bulk insert, we might iterate or use insertMany (but insertMany might fail partials on index unique)
    // Indexes: { student: 1, date: 1, subject: 1 } usually unique.

    // Let's use bulkWrite for better handling of upserts
    const operations = records.map(record => ({
        updateOne: {
            filter: {
                student: record.student,
                date: record.date,
                subject: record.subject || null
            },
            update: { $set: record },
            upsert: true
        }
    }));

    await Attendance.bulkWrite(operations);

    return res.status(201).json(new ApiResponse(201, {}, "Attendance marked successfully"));
});

const getAttendanceReport = asyncHandler(async (req, res) => {
    const { studentId, month, year, subjectId } = req.query;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const filter = {
        student: studentId,
        date: { $gte: startDate, $lte: endDate }
    };
    if (subjectId) filter.subject = subjectId;

    const records = await Attendance.find(filter).sort({ date: 1 });

    // Calculate stats
    const present = records.filter(r => r.status === 'PRESENT').length;
    const absent = records.filter(r => r.status === 'ABSENT').length;
    const leave = records.filter(r => r.status === 'LEAVE').length;
    const total = records.length;
    const percentage = total > 0 ? (present / total) * 100 : 0;

    return res.status(200).json(new ApiResponse(200, {
        records,
        stats: { total, present, absent, leave, percentage }
    }, "Attendance report fetched"));
});

export { markAttendance, getAttendanceReport };
