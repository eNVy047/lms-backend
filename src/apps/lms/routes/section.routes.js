import { Router } from "express";
import {
    createSection,
    getAllSections,
    getSectionById,
    updateSection,
    deleteSection
} from "../controllers/section.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), createSection)
    .get(getAllSections);

router.route("/:id")
    .get(getSectionById)
    .patch(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), updateSection)
    .delete(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), deleteSection);

export default router;
