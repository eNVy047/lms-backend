import { Router } from "express";
import {
    createTimetableSettings,
    getTimetableSettings,
    updateTimetableSettings,
    deleteTimetableSettings
} from "../controllers/timetableSettings.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), createTimetableSettings)
    .get(getTimetableSettings);

router.route("/:id")
    .patch(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), updateTimetableSettings)
    .delete(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), deleteTimetableSettings);

export default router;
