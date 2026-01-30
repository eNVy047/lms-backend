import { Router } from "express";
import { createExam, getAllExams, publishExam } from "../controllers/exam.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        createExam
    )
    .get(getAllExams);

router.route("/:id/publish")
    .patch(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN),
        publishExam
    );

export default router;
