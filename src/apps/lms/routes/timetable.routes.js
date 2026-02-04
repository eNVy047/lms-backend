import { Router } from "express";
import {
    createTimetableEntry,
    getTimetable,
    getTimetableById,
    updateTimetableEntry,
    deleteTimetableEntry
} from "../controllers/timetable.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), createTimetableEntry)
    .get(getTimetable);

router.route("/:id")
    .get(getTimetableById)
    .patch(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), updateTimetableEntry)
    .delete(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), deleteTimetableEntry);

export default router;
