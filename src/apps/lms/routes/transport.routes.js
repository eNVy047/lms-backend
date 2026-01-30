import { Router } from "express";
import { createRoute, getRoutes, createVehicle, getVehicles } from "../controllers/transport.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

// Routes
router.route("/routes")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        createRoute
    )
    .get(getRoutes);

// Vehicles
router.route("/vehicles")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        createVehicle
    )
    .get(getVehicles);

export default router;
