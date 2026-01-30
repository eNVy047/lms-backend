import { Teacher } from "../models/teacher.models.js";
import { User } from "../../../common/models/user.models.js";
import { UserRolesEnum } from "../../../constants.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { Attendance } from "../models/attendance.models.js";
import { AcademicRecord } from "../models/academicRecord.models.js";
import { Student } from "../models/student.models.js";
import { Courses } from "../models/courses.models.js";

const createTeacher = asyncHandler(async (req, res) => {
    const {
        // User Details
        fullName,
        email,
        password,
        phone, // { countryCode, number }

        institution,
        employeeId,
        department,
        designation,
        qualifications,
        experience,
        specializations,
        joiningDate,      // Added newly
        subjectsHandled,  // Added newly
        assignments,      // Added newly 
        userId
    } = req.body;

    let targetUserId = userId;

    if (!targetUserId) {
        if (!email || !fullName || !password) {
            throw new ApiError(400, "FullName, Email, and Password are required to create a new user.");
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            throw new ApiError(409, "User with email already exists");
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
            role: "TEACHER",
            phone: phone || { number: employeeId }, // Fallback logic
            institution: institution
        });
        targetUserId = newUser._id;
    } else {
        const userExists = await User.findById(targetUserId);
        if (!userExists) {
            throw new ApiError(404, "User not found");
        }
    }

    const existingTeacher = await Teacher.findOne({ user: targetUserId });
    if (existingTeacher) {
        throw new ApiError(409, "User is already registered as a teacher");
    }

    const teacher = await Teacher.create({
        user: targetUserId,
        institution,
        employeeId,
        department,
        designation,
        qualifications,
        experience,
        specializations,
        joiningDate: joiningDate || new Date(),
        subjectsHandled,
        assignments,
        createdBy: req.user._id
    });

    // Update User Role to TEACHER if manual
    if (userId) {
        await User.findByIdAndUpdate(userId, {
            $set: { role: UserRolesEnum.TEACHER }
        });
    }

    return res
        .status(201)
        .json(new ApiResponse(201, teacher, "Teacher profile created successfully"));
});

const deleteTeacher = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findById(id);

    if (!teacher) {
        throw new ApiError(404, "Teacher info not found");
    }

    await Teacher.findByIdAndDelete(id);

    // Revert role
    await User.findByIdAndUpdate(teacher.user, {
        $set: { role: UserRolesEnum.USER }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Teacher profile deleted successfully"));
});

const getTeacherProfile = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findOne({ user: req.user._id }).populate("institution").populate("user");

    if (!teacher) {
        throw new ApiError(404, "Teacher profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Teacher profile fetched successfully"));
});

const getTeacherById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findById(id).populate("institution").populate("user");

    if (!teacher) {
        throw new ApiError(404, "Teacher profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Teacher profile fetched successfully"));
});

const updateTeacherProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { department, designation, experience, specializations, qualifications } = req.body;

    const teacher = await Teacher.findByIdAndUpdate(
        id,
        {
            $set: {
                department,
                designation,
                experience,
                specializations,
                qualifications
            },
        },
        { new: true }
    );

    if (!teacher) {
        throw new ApiError(404, "Teacher profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, teacher, "Teacher profile updated successfully"));
});

const getAllTeachers = asyncHandler(async (req, res) => {
    const { institutionId } = req.query;
    const filter = institutionId ? { institution: institutionId } : {};

    const teachers = await Teacher.find(filter).populate("user", "fullName email");

    return res.status(200).json(new ApiResponse(200, teachers, "Teachers fetched successfully"));
})

const getAssignedCourses = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findOne({ user: req.user._id })
        .populate("assignments.course", "name")
        .populate("assignments.subject", "name code");

    if (!teacher) throw new ApiError(404, "Teacher profile not found");

    return res.status(200).json(new ApiResponse(200, teacher.assignments, "Assigned courses fetched"));
});

const getAssignedStudents = asyncHandler(async (req, res) => {
    const { courseId, semester, section } = req.query;

    // 1. Verify Assignment
    const teacher = await Teacher.findOne({ user: req.user._id });
    if (!teacher) throw new ApiError(404, "Teacher profile not found");

    const isAssigned = teacher.assignments.some(a =>
        a.course.toString() === courseId &&
        a.semester == semester &&
        (a.section === section || !a.section)
    );

    if (!isAssigned && req.user.role !== UserRolesEnum.ADMIN) {
        throw new ApiError(403, "You are not assigned to this course/semester");
    }

    // 2. Fetch Students
    const filter = { course: courseId, currentSemester: semester };
    if (section) filter.section = section;

    const students = await Student.find(filter)
        .select("fullName enrollmentNumber user")
        .populate("user", "fullName email");

    return res.status(200).json(new ApiResponse(200, students, "Students list fetched"));
});

const uploadAttendance = asyncHandler(async (req, res) => {
    const { courseId, semester, section, subjectId, date, attendanceData } = req.body;

    const teacher = await Teacher.findOne({ user: req.user._id });
    if (!teacher) throw new ApiError(404, "Teacher profile not found");

    const isAssigned = teacher.assignments.some(a =>
        a.course.toString() === courseId &&
        a.semester == semester &&
        a.subject.toString() === subjectId
    );

    if (!isAssigned && req.user.role !== UserRolesEnum.ADMIN) {
        throw new ApiError(403, "You are not assigned to teach this subject");
    }

    if (!attendanceData || !Array.isArray(attendanceData)) {
        throw new ApiError(400, "Invalid attendance data");
    }

    const operations = attendanceData.map(record => ({
        updateOne: {
            filter: {
                student: record.studentId,
                date: date,
                subject: subjectId
            },
            update: {
                $set: {
                    status: record.status,
                    remarks: record.remarks,
                    institution: teacher.institution,
                    course: courseId,
                    semester: semester,
                    section: section,
                    markedBy: req.user._id,
                    isSubjectWise: true
                }
            },
            upsert: true
        }
    }));

    await Attendance.bulkWrite(operations);
    return res.status(200).json(new ApiResponse(200, {}, "Attendance uploaded successfully"));
});

const uploadMarks = asyncHandler(async (req, res) => {
    const { courseId, semester, subjectId, examId, marksData } = req.body;

    const teacher = await Teacher.findOne({ user: req.user._id });
    if (!teacher) throw new ApiError(404, "Teacher profile not found");

    const isAssigned = teacher.assignments.some(a =>
        a.course.toString() === courseId &&
        a.subject.toString() === subjectId
    );

    if (!isAssigned && req.user.role !== UserRolesEnum.ADMIN) {
        throw new ApiError(403, "You are not assigned to teach this subject");
    }

    const operations = marksData.map(record => ({
        updateOne: {
            filter: {
                student: record.studentId,
                exam: examId,
                subject: subjectId
            },
            update: {
                $set: {
                    marksObtained: record.marksObtained,
                    totalMarks: record.totalMarks,
                    remarks: record.remarks,
                    institution: teacher.institution,
                    status: "SUBMITTED",
                    createdBy: req.user._id
                }
            },
            upsert: true
        }
    }));

    await AcademicRecord.bulkWrite(operations);
    return res.status(200).json(new ApiResponse(200, {}, "Marks uploaded successfully"));
});

export {
    createTeacher,
    getTeacherProfile,
    getTeacherById,
    updateTeacherProfile,
    getAllTeachers,
    deleteTeacher,
    getAssignedCourses,
    getAssignedStudents,
    uploadAttendance,
    uploadMarks
};

