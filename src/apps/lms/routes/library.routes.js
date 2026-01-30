import { Router } from "express";
import { addAsset, getInventory, issueAsset, returnAsset } from "../controllers/library.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

// Assets
router.route("/assets")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN), // Librarian role to be added in future?
        addAsset
    )
    .get(getInventory);

// Transactions
router.route("/issue")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        issueAsset
    );

router.route("/return/:transactionId")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        returnAsset
    );

export default router;
