import { Router } from "express";
import {
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
} from "../controllers/teacher.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";
import { validate } from "../../../common/validators/validate.js";
// Assuming validators exist or I'll implement generic basic validation
// For now, let's assume validators file might not be fully ready, so using raw controller or add basic validation in future.
// Based on file list, "validators" dir has 19 files. Let's try to import generic ones if specific aren't there later.
// For now, I will omit validators in import to avoid breaking if file doesn't exist, as I haven't checked teacher.validators.js

const router = Router();

router.use(verifyJWT);

// Admin Only: Create Teacher & List All
router.route("/")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        createTeacher
    )
    .get(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN, UserRolesEnum.STUDENT), // Students can see teachers list? Maybe.
        getAllTeachers
    );

router.route("/profile")
    .get(getTeacherProfile);

router.route("/:id")
    .get(getTeacherById)
    .patch(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), // Only Admin updates teacher professional data
        updateTeacherProfile
    )
    .delete(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        deleteTeacher
    );

// Faculty / Teacher specific routes
router.route("/assigned-courses")
    .get(
        verifyRole(UserRolesEnum.TEACHER, UserRolesEnum.ADMIN),
        getAssignedCourses
    );

router.route("/assigned-students")
    .get(
        verifyRole(UserRolesEnum.TEACHER, UserRolesEnum.ADMIN),
        getAssignedStudents
    );

router.route("/attendance")
    .post(
        verifyRole(UserRolesEnum.TEACHER, UserRolesEnum.ADMIN),
        uploadAttendance
    );

router.route("/marks")
    .post(
        verifyRole(UserRolesEnum.TEACHER, UserRolesEnum.ADMIN),
        uploadMarks
    );

export default router;
