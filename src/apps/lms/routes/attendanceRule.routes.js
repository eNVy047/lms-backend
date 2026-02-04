import { Router } from "express";
import {
    createAttendanceRule,
    getAllAttendanceRules,
    updateAttendanceRule,
    deleteAttendanceRule
} from "../controllers/attendanceRule.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), createAttendanceRule)
    .get(getAllAttendanceRules);

router.route("/:id")
    .patch(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), updateAttendanceRule)
    .delete(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), deleteAttendanceRule);

export default router;
