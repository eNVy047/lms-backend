import { Router } from "express";
import { generatePayroll, getPayroll } from "../controllers/payroll.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/generate")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        generatePayroll
    );

router.route("/")
    .get(
        // Admin sees all, Employee sees own (needs filter in controller or ownership check)
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN, UserRolesEnum.TEACHER), // Teachers can view own 
        getPayroll
    );

export default router;
