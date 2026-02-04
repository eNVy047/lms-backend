import { Router } from "express";
import {
    logVisitorEntry,
    logVisitorExit,
    getVisitors
} from "../controllers/visitor.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN, UserRolesEnum.TEACHER), logVisitorEntry)
    .get(getVisitors);

router.route("/:id/exit")
    .patch(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN, UserRolesEnum.TEACHER), logVisitorExit);

export default router;
