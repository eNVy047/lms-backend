import { Router } from "express";
import {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem
} from "../controllers/inventory.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), createInventoryItem)
    .get(getAllInventoryItems);

router.route("/:id")
    .get(getInventoryItemById)
    .patch(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), updateInventoryItem)
    .delete(verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), deleteInventoryItem);

export default router;
