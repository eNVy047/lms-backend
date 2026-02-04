import { Router } from "express";
import {
    createHostel,
    getHostels,
    createRoom,
    getRooms,
    allotRoom
} from "../controllers/hostel.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), createHostel)
    .get(getHostels);

router.route("/rooms")
    .post(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), createRoom)
    .get(getRooms);

router.route("/allot")
    .post(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), allotRoom);

export default router;
