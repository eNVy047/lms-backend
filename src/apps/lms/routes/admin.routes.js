
import { Router } from "express";
import { assignFaculty, generateReports } from "../controllers/admin.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

// Only Admins (or Super Admins) can access these
router.use(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN));

router.route("/assign-faculty")
    .post(assignFaculty);

router.route("/reports")
    .get(generateReports);

export default router;
