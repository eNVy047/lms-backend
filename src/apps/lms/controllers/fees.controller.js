import { Fees } from "../models/fees.models.js";
import { Student } from "../models/student.models.js";
import { Courses } from "../models/courses.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

/**
 * Create a new fee record (Admin only)
 * Supports both FULL and INSTALLMENT payment types
 */
const createFeeRecord = asyncHandler(async (req, res) => {
    const {
        student,
        course,
        semester,
        amount,
        paymentType = "FULL",
        installments = [],
        dueDate,
        description,
        concessionAmount, // Added
        scholarship       // Added (Application ID)
    } = req.body;

    // Verify student and course exist
    const studentExists = await Student.findById(student);
    if (!studentExists) {
        throw new ApiError(404, "Student not found");
    }

    const courseExists = await Courses.findById(course);
    if (!courseExists) {
        throw new ApiError(404, "Course not found");
    }

    // Validate installments if payment type is INSTALLMENT
    if (paymentType === "INSTALLMENT") {
        if (!installments || installments.length === 0) {
            throw new ApiError(400, "Installments required for INSTALLMENT payment type");
        }

        // Validate total installment amount
        const totalInstallmentAmount = installments.reduce((sum, inst) => sum + inst.amount, 0);
        if (Math.abs(totalInstallmentAmount - amount) > 0.01) {
            throw new ApiError(
                400,
                `Total installment amount (${totalInstallmentAmount}) must equal fee amount (${amount})`
            );
        }
    }

    // Create fee record with admin reference
    const fee = await Fees.create({
        student,
        course,
        semester,
        amount,
        paymentType,
        installments: paymentType === "INSTALLMENT" ? installments : [],
        dueDate,
        description,
        concessionAmount: concessionAmount || 0,
        scholarship: scholarship || null,
        createdBy: req.user._id, // Admin who created the fee
    });

    const populatedFee = await Fees.findById(fee._id)
        .populate("student", "fullName email enrollmentNumber")
        .populate("course", "name courseCode")
        .populate("createdBy", "fullName email");

    return res
        .status(201)
        .json(new ApiResponse(201, populatedFee, "Fee record created successfully"));
});

/**
 * Update an existing fee record (Admin only)
 */
const updateFeeRecord = asyncHandler(async (req, res) => {
    const { feeId } = req.params;
    const updateData = req.body;

    const fee = await Fees.findById(feeId);
    if (!fee) {
        throw new ApiError(404, "Fee record not found");
    }

    // Prevent update if already paid
    if (fee.isPaid) {
        throw new ApiError(400, "Cannot update a paid fee record");
    }

    // Update with admin tracking
    updateData.updatedBy = req.user._id;

    const updatedFee = await Fees.findByIdAndUpdate(feeId, updateData, {
        new: true,
        runValidators: true,
    })
        .populate("student", "fullName email enrollmentNumber")
        .populate("course", "name courseCode")
        .populate("createdBy", "fullName email")
        .populate("updatedBy", "fullName email");

    return res.status(200).json(new ApiResponse(200, updatedFee, "Fee record updated successfully"));
});

/**
 * Delete a fee record (Admin only)
 */
const deleteFeeRecord = asyncHandler(async (req, res) => {
    const { feeId } = req.params;

    const fee = await Fees.findById(feeId);
    if (!fee) {
        throw new ApiError(404, "Fee record not found");
    }

    // Prevent deletion if any payment has been made
    if (fee.paidAmount > 0) {
        throw new ApiError(400, "Cannot delete a fee record with payments");
    }

    await Fees.findByIdAndDelete(feeId);

    return res.status(200).json(new ApiResponse(200, {}, "Fee record deleted successfully"));
});

/**
 * Process full payment (Admin or Student)
 */
const processFullPayment = asyncHandler(async (req, res) => {
    const { feeId } = req.params;
    const { transactionId } = req.body;

    const fee = await Fees.findById(feeId);
    if (!fee) {
        throw new ApiError(404, "Fee record not found");
    }

    if (fee.isPaid) {
        throw new ApiError(400, "Fee is already paid");
    }

    if (fee.paymentType !== "FULL") {
        throw new ApiError(400, "This fee requires installment payments");
    }

    // Process payment
    fee.isPaid = true;
    fee.status = "PAID";
    fee.paidDate = new Date();
    fee.paidAmount = fee.amount;
    fee.transactionId = transactionId;
    fee.updatedBy = req.user._id;

    await fee.save();

    const populatedFee = await Fees.findById(fee._id)
        .populate("student", "fullName email enrollmentNumber")
        .populate("course", "name courseCode");

    return res.status(200).json(new ApiResponse(200, populatedFee, "Payment processed successfully"));
});

/**
 * Process installment payment (Admin or Student)
 */
const processInstallmentPayment = asyncHandler(async (req, res) => {
    const { feeId, installmentNumber } = req.params;
    const { paidAmount, transactionId } = req.body;

    const fee = await Fees.findById(feeId);
    if (!fee) {
        throw new ApiError(404, "Fee record not found");
    }

    if (fee.paymentType !== "INSTALLMENT") {
        throw new ApiError(400, "This fee does not have installments");
    }

    // Find the installment
    const installment = fee.installments.find(
        (inst) => inst.installmentNumber === parseInt(installmentNumber)
    );

    if (!installment) {
        throw new ApiError(404, "Installment not found");
    }

    if (installment.status === "PAID") {
        throw new ApiError(400, "This installment is already paid");
    }

    // Process installment payment
    installment.status = "PAID";
    installment.paidDate = new Date();
    installment.paidAmount = paidAmount || installment.amount;
    installment.transactionId = transactionId;

    // Update overall fee status
    fee.updatePaymentStatus();
    fee.updatedBy = req.user._id;

    await fee.save();

    const populatedFee = await Fees.findById(fee._id)
        .populate("student", "fullName email enrollmentNumber")
        .populate("course", "name courseCode");

    return res
        .status(200)
        .json(new ApiResponse(200, populatedFee, "Installment payment processed successfully"));
});

/**
 * Get all fees with filters (Admin)
 */
const getFees = asyncHandler(async (req, res) => {
    const {
        studentId,
        courseId,
        semester,
        status,
        paymentType,
        page = 1,
        limit = 10,
    } = req.query;

    const filter = {};
    if (studentId) filter.student = studentId;
    if (courseId) filter.course = courseId;
    if (semester) filter.semester = parseInt(semester);
    if (status) filter.status = status;
    if (paymentType) filter.paymentType = paymentType;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        populate: [
            { path: "student", select: "fullName email enrollmentNumber" },
            { path: "course", select: "name courseCode" },
            { path: "createdBy", select: "fullName email" },
        ],
        sort: { createdAt: -1 },
    };

    const fees = await Fees.aggregatePaginate(Fees.aggregate([{ $match: filter }]), options);

    return res.status(200).json(new ApiResponse(200, fees, "Fees fetched successfully"));
});

/**
 * Get fee by ID
 */
const getFeeById = asyncHandler(async (req, res) => {
    const { feeId } = req.params;

    const fee = await Fees.findById(feeId)
        .populate("student", "fullName email enrollmentNumber")
        .populate("course", "name courseCode")
        .populate("createdBy", "fullName email")
        .populate("updatedBy", "fullName email");

    if (!fee) {
        throw new ApiError(404, "Fee record not found");
    }

    return res.status(200).json(new ApiResponse(200, fee, "Fee fetched successfully"));
});

/**
 * Get fees for a specific student
 */
const getStudentFees = asyncHandler(async (req, res) => {
    const { studentId } = req.params;
    const { status, semester } = req.query;

    const filter = { student: studentId };
    if (status) filter.status = status;
    if (semester) filter.semester = parseInt(semester);

    const fees = await Fees.find(filter)
        .populate("course", "name courseCode")
        .sort({ semester: 1, createdAt: -1 });

    return res.status(200).json(new ApiResponse(200, fees, "Student fees fetched successfully"));
});

/**
 * Get fee statistics
 */
const getFeeStatistics = asyncHandler(async (req, res) => {
    const { courseId, semester } = req.query;

    const matchStage = {};
    if (courseId) matchStage.course = courseId;
    if (semester) matchStage.semester = parseInt(semester);

    const stats = await Fees.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: null,
                totalFees: { $sum: "$amount" },
                totalPaid: { $sum: "$paidAmount" },
                totalPending: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "PENDING"] }, "$amount", 0],
                    },
                },
                totalOverdue: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "OVERDUE"] }, { $subtract: ["$amount", "$paidAmount"] }, 0],
                    },
                },
                paidCount: {
                    $sum: { $cond: [{ $eq: ["$status", "PAID"] }, 1, 0] },
                },
                pendingCount: {
                    $sum: { $cond: [{ $eq: ["$status", "PENDING"] }, 1, 0] },
                },
                overdueCount: {
                    $sum: { $cond: [{ $eq: ["$status", "OVERDUE"] }, 1, 0] },
                },
                partialCount: {
                    $sum: { $cond: [{ $eq: ["$status", "PARTIAL"] }, 1, 0] },
                },
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(200, stats[0] || {}, "Fee statistics fetched successfully")
        );
});

export {
    createFeeRecord,
    updateFeeRecord,
    deleteFeeRecord,
    processFullPayment,
    processInstallmentPayment,
    getFees,
    getFeeById,
    getStudentFees,
    getFeeStatistics,
};
