import { Router } from "express";
import {
    createFeeRecord,
    updateFeeRecord,
    deleteFeeRecord,
    processFullPayment,
    processInstallmentPayment,
    getFees,
    getFeeById,
    getStudentFees,
    getFeeStatistics,
} from "../controllers/fees.controller.js";
import {
    createFeeValidator,
    updateFeeValidator,
    processPaymentValidator,
} from "../validators/fees.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";
import { mongoIdPathVariableValidator } from "../../../common/validators/mongodb.validators.js";

const router = Router();

// Apply JWT authentication to all routes
router.use(verifyJWT);

// Fee CRUD operations (Admin only)
router
    .route("/")
    .post(createFeeValidator(), validate, createFeeRecord)
    .get(getFees);

// Get fee statistics
router.route("/statistics").get(getFeeStatistics);

// Student-specific fees
router
    .route("/student/:studentId")
    .get(mongoIdPathVariableValidator("studentId"), validate, getStudentFees);

// Fee operations by ID
router
    .route("/:feeId")
    .get(mongoIdPathVariableValidator("feeId"), validate, getFeeById)
    .patch(
        mongoIdPathVariableValidator("feeId"),
        updateFeeValidator(),
        validate,
        updateFeeRecord
    )
    .delete(mongoIdPathVariableValidator("feeId"), validate, deleteFeeRecord);

// Payment processing
router
    .route("/:feeId/pay")
    .post(
        mongoIdPathVariableValidator("feeId"),
        processPaymentValidator(),
        validate,
        processFullPayment
    );

// Installment payment processing
router
    .route("/:feeId/installment/:installmentNumber/pay")
    .post(
        mongoIdPathVariableValidator("feeId"),
        processPaymentValidator(),
        validate,
        processInstallmentPayment
    );

export default router;
