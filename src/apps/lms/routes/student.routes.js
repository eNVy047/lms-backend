import { Router } from "express";
import {
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
} from "../controllers/student.controller.js";
import {
    createStudentValidator,
    updateStudentProfileValidator
} from "../validators/student.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { validate } from "../../../common/validators/validate.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

// Admin Only: Create Student & View All Students
router.route("/")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        createStudentValidator(),
        validate,
        createStudent
    )
    .get(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN, UserRolesEnum.TEACHER),
        getAllStudents
    );

// Current User Profile (Any authenticated user can see their own if mapped)
// But logically only a student would hit this endpoint contextually, checking if they have a student profile
router.route("/profile")
    .get(getStudentProfile);

// Specific Student Operations
router.route("/:id")
    .get(
        // Allow Admin, Teacher, or the Student themselves? 
        // For now, let's say Admin/Teacher can view anyone, Student can view themselves? 
        // The getStudentById controller doesn't check ownership yet, so let's restrict to Admin/Teacher for now
        // OR implement ownership check. For simplicity in this "listing" context, let's keep it Admin/Teacher.
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN, UserRolesEnum.TEACHER),
        getStudentById
    )
    .patch(
        // Admin updates profile (e.g. status), or Student updates personal details?
        // Let's allow Admin for full control
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        updateStudentProfileValidator(),
        validate,
        updateStudentProfile
    )
    .delete(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        deleteStudent
    );

// New Functionalities
router.route("/register-course")
    .post(
        verifyRole(UserRolesEnum.STUDENT, UserRolesEnum.ADMIN), // Student can self-register? Or Admin.
        registerCourse
    );

router.route("/:studentId/attendance")
    .get(
        verifyRole(UserRolesEnum.STUDENT, UserRolesEnum.TEACHER, UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        viewAttendance
    );

router.route("/:studentId/marks")
    .get(
        verifyRole(UserRolesEnum.STUDENT, UserRolesEnum.TEACHER, UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        viewMarks
    );

router.route("/:studentId/pay-fees")
    .post(
        verifyRole(UserRolesEnum.STUDENT, UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        payFees
    );

export default router;
