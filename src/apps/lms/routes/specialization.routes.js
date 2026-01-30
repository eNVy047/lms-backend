import { Router } from "express";
import {
    createSpecialization,
    getAllSpecializations,
    getSpecializationById,
    updateSpecialization,
    deleteSpecialization
} from "../controllers/specialization.controller.js";
import {
    createSpecializationValidator,
    updateSpecializationValidator
} from "../validators/specialization.validators.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { validate } from "../../../common/validators/validate.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(createSpecializationValidator(), validate, createSpecialization)
    .get(getAllSpecializations);

router.route("/:id")
    .get(getSpecializationById)
    .patch(updateSpecializationValidator(), validate, updateSpecialization)
    .delete(deleteSpecialization);

export default router;
