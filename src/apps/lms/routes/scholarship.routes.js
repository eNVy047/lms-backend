import { Router } from "express";
import { createScholarship, applyScholarship, approveScholarship } from "../controllers/scholarship.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

// Schemes
router.route("/schemes")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        createScholarship
    );

// Applications
router.route("/apply")
    .post(
        verifyRole(UserRolesEnum.STUDENT, UserRolesEnum.ADMIN), // Student applies, Admin can apply on behalf
        applyScholarship
    );

router.route("/application/:applicationId/process")
    .patch(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        approveScholarship
    );

export default router;
