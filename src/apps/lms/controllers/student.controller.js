import { Student } from "../models/student.models.js";
import { User } from "../../../common/models/user.models.js";
import { Courses } from "../models/courses.models.js";
import { Attendance } from "../models/attendance.models.js";
import { AcademicRecord } from "../models/academicRecord.models.js";
import { Fees } from "../models/fees.models.js";
import { Exam } from "../models/exam.models.js";
import { UserRolesEnum } from "../../../constants.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createStudent = asyncHandler(async (req, res) => {
    const {
        // User Details (if creating new)
        fullName,
        email,
        password,

        // Student Details
        institution,
        enrollmentNumber,
        rollNumber,
        department,
        batch,
        currentSemester,
        section,
        guardianName,
        guardianPhone,
        userId,
        // Academic Mapping
        course,
        branch,
        specialization,
        // Personal Attributes & IDs
        abcId,
        aadhaarNumber,
        panNumber,
        // Documents
        aadhaarDocument,
        panDocument,
        tenthMarksheet,
        twelfthMarksheet,
        additionalDocuments,
        // Transport & Hostel
        isHosteler,
        hostelRoomNumber,
        isTransportUser,
        transportRoute,
        transportStop
    } = req.body;

    let targetUserId = userId;

    // 1. Create User if not provided
    if (!targetUserId) {
        if (!email || !fullName || !password) {
            throw new ApiError(400, "FullName, Email, and Password are required to create a new user.");
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { "phone.number": guardianPhone }] // Check unique constraints
        });

        if (existedUser) {
            throw new ApiError(409, "User with email or phone already exists");
        }

        const newUser = await User.create({
            fullName,
            email,
            password,
            role: "STUDENT",
            phone: { number: guardianPhone || `ST${enrollmentNumber}` }, // Fallback logic
            institution: institution // If User model has institution link (good practice for multi-tenant)
        });
        targetUserId = newUser._id;
    } else {
        // Verify user exists
        const userExists = await User.findById(targetUserId);
        if (!userExists) {
            throw new ApiError(404, "User not found");
        }
    }

    // 2. Check if already a student
    const existingStudent = await Student.findOne({ user: targetUserId });
    if (existingStudent) {
        throw new ApiError(409, "User is already registered as a student");
    }

    const student = await Student.create({
        user: targetUserId,
        institution,
        enrollmentNumber,
        rollNumber,
        department,
        batch,
        currentSemester,
        section,
        guardianName,
        guardianPhone,
        course,
        branch,
        specialization,
        abcId,
        aadhaarNumber,
        panNumber,
        aadhaarDocument,
        panDocument,
        tenthMarksheet,
        twelfthMarksheet,
        additionalDocuments,
        isHosteler,         // Added
        hostelRoomNumber,   // Added
        isTransportUser,    // Added
        transportRoute,     // Added
        transportStop,      // Added
        createdBy: req.user._id
    });

    // Update User Role to STUDENT if linked manually
    if (userId) {
        await User.findByIdAndUpdate(userId, {
            $set: { role: UserRolesEnum.STUDENT }
        });
    }

    return res
        .status(201)
        .json(new ApiResponse(201, student, "Student profile created successfully"));
});

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    // Delete the student profile
    await Student.findByIdAndDelete(id);

    // Optionally revert user role or delete user? 
    // "Remove the profile" - we removed student profile.
    // Let's keep the user but maybe set role to USER? 
    await User.findByIdAndUpdate(student.user, {
        $set: { role: UserRolesEnum.USER }
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Student profile deleted successfully"));
});

const getStudentProfile = asyncHandler(async (req, res) => {
    // Get profile of the logged in user
    const student = await Student.findOne({ user: req.user._id })
        .populate("institution")
        .populate("user")
        .populate("course");

    if (!student) {
        throw new ApiError(404, "Student profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student profile fetched successfully"));
});

const getStudentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id)
        .populate("institution")
        .populate("user")
        .populate("course");

    if (!student) {
        throw new ApiError(404, "Student profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student profile fetched successfully"));
});

const updateStudentProfile = asyncHandler(async (req, res) => {
    // If admin updates or student updates themselves. 
    // Let's assume params.id is the STUDENT ID (not user id)
    const { id } = req.params;
    const {
        department,
        currentSemester,
        section,
        guardianName,
        guardianPhone,
        course,
        branch,
        specialization,
        abcId,
        aadhaarNumber,
        panNumber,
        aadhaarDocument,
        panDocument,
        tenthMarksheet,
        twelfthMarksheet,
        additionalDocuments
    } = req.body;

    const student = await Student.findByIdAndUpdate(
        id,
        {
            $set: {
                department,
                currentSemester,
                section,
                guardianName,
                guardianPhone,
                course,
                branch,
                specialization,
                abcId,
                aadhaarNumber,
                panNumber,
                aadhaarDocument,
                panDocument,
                tenthMarksheet,
                twelfthMarksheet,
                additionalDocuments
            },
        },
        { new: true }
    )
        .populate("institution")
        .populate("user")
        .populate("course");

    if (!student) {
        throw new ApiError(404, "Student profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, student, "Student profile updated successfully"));
});

const getAllStudents = asyncHandler(async (req, res) => {
    // Should filter by institution usually, but for now generic list
    const { institutionId } = req.query;
    const filter = institutionId ? { institution: institutionId } : {};

    // Using aggregate paginate logic if needed, or simple find
    const students = await Student.find(filter)
        .populate("user", "fullName email")
        .populate("course", "name");

    return res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));
})

const registerCourse = asyncHandler(async (req, res) => {
    const { studentId, courseId, branch, semester } = req.body;

    const student = await Student.findById(studentId);
    if (!student) throw new ApiError(404, "Student not found");

    if (student.course && student.course.toString() !== courseId) {
        // If already registered, check if allowing switch or throw error
        throw new ApiError(400, "Student is already registered in a course");
    }

    const course = await Courses.findById(courseId);
    if (!course) throw new ApiError(404, "Course not found");

    // Seat Availability Check
    const currentCount = await Student.countDocuments({ course: courseId });
    if (currentCount >= course.capacity) {
        throw new ApiError(400, "Course seat capacity full");
    }

    // Update Student
    student.course = courseId;
    if (branch) student.branch = branch;
    if (semester) student.currentSemester = semester;
    await student.save();

    return res.status(200).json(new ApiResponse(200, student, "Course registration successful"));
});

const viewAttendance = asyncHandler(async (req, res) => {
    const { studentId } = req.params;
    const { month, year } = req.query; // Optional filters

    const filter = { student: studentId };
    if (month && year) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        filter.date = { $gte: startDate, $lte: endDate };
    }

    const attendance = await Attendance.find(filter).sort({ date: -1 });
    return res.status(200).json(new ApiResponse(200, attendance, "Attendance records fetched"));
});

const viewMarks = asyncHandler(async (req, res) => {
    const { studentId } = req.params;

    // Fetch published exams to ensure student only sees published results
    const publishedExams = await Exam.find({ publishStatus: "PUBLISHED" }).distinct('_id');

    const marks = await AcademicRecord.find({
        student: studentId,
        exam: { $in: publishedExams }
    })
        .populate("exam", "name examType")
        .populate("subject", "name code");

    return res.status(200).json(new ApiResponse(200, marks, "Marks/Results fetched"));
});

const payFees = asyncHandler(async (req, res) => {
    const { studentId } = req.params;
    const { feeId, amount, transactionId, paymentType } = req.body; // paymentType: FULL or INSTALLMENT

    // Check fee record
    const fee = await Fees.findOne({ _id: feeId, student: studentId });
    if (!fee) throw new ApiError(404, "Fee record not found for this student");

    if (fee.isPaid) throw new ApiError(400, "Fee already paid");

    // Logic delegates to Fees controller-like logic but implemented here as requested
    // Ideally we should reuse the Fees controller function, but for direct endpoint compliance:

    if (fee.paymentType === "FULL") {
        fee.isPaid = true;
        fee.status = "PAID";
        fee.paidDate = new Date();
        fee.paidAmount = fee.amount;
        fee.transactionId = transactionId;
    } else {
        // Installment logic
        // Need to know WHICH installment if type is installment, or auto-pay next pending?
        // Let's assume paying earliest pending installment if no specific ID provided, 
        // OR user must provide installmentNumber? 
        // For simplicity and safety, let's just mark the fee as PAID if amount matches total pending? 
        // Creating a simple wrapper for "Pay Request"

        // Detailed implementation would duplicate Fees controller code. 
        // Let's just update Paid Amount and check status
        fee.paidAmount += Number(amount);
        fee.transactionId = transactionId; // Overwrites last txn id

        // Recalculate status
        if (fee.paidAmount >= fee.amount) {
            fee.status = "PAID";
            fee.isPaid = true;
        } else {
            fee.status = "PARTIAL";
        }

        // Also update installment status logic would be needed here for consistency...
        // Recommendation: Use Fees Controller Endpoints. 
    }

    await fee.save();
    return res.status(200).json(new ApiResponse(200, fee, "Fee payment processed"));
});

export {
    createStudent,
    getStudentProfile,
    getStudentById,
    updateStudentProfile,
    getAllStudents,
    deleteStudent,
    registerCourse,
    viewAttendance,
    viewMarks,
    payFees
};
