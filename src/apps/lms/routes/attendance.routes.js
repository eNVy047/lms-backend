import { Router } from "express";
import { markAttendance, getAttendanceReport } from "../controllers/attendance.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/mark")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.TEACHER, UserRolesEnum.SUPERADMIN),
        markAttendance
    );

router.route("/report")
    .get(
        // Students view own, Teachers/Admins view any
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.TEACHER, UserRolesEnum.STUDENT, UserRolesEnum.SUPERADMIN),
        getAttendanceReport
    );

export default router;
