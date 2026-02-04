import { Router } from "express";
import {
    applyLeave,
    updateLeaveStatus,
    getMyLeaves,
    getAllLeaveRequests
} from "../controllers/leave.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/apply")
    .post(applyLeave)
    .get(getMyLeaves);

router.route("/requests")
    .get(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN, UserRolesEnum.TEACHER), getAllLeaveRequests);

router.route("/:id/status")
    .patch(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), updateLeaveStatus);

export default router;
