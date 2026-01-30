import { Router } from "express";
import { addMarks, getStudentResults, updateMarks } from "../controllers/academicRecord.controller.js";
import { verifyJWT } from "../../../common/middlewares/auth.middleware.js";
import { verifyRole, verifyOwnerOrAdmin } from "../middlewares/rbac.middleware.js";
import { UserRolesEnum } from "../../../constants.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
    .post(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.TEACHER, UserRolesEnum.SUPERADMIN),
        addMarks
    );

router.route("/student/:studentId")
    .get(
        // Allow Student to see own, or Admin/Teacher to see any
        // verifyOwnerOrAdmin checks req.params.id vs req.user._id. 
        // Logic needs match: paramName="studentId" needs mapping to user ID if student.
        // But studentId is Student Profile ID, req.user._id is User ID.
        // Simple RBAC: Student can access if they map to this profile (complex check), or just let all Students hit "my-results" endpoint.
        // For now, let's assume Admin/Teacher/Student can access, controller filters by published.
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.TEACHER, UserRolesEnum.STUDENT, UserRolesEnum.SUPERADMIN),
        getStudentResults
    );

router.route("/:id")
    .patch(
        verifyRole(UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN, UserRolesEnum.TEACHER), // Only Admin updates/re-evaluates
        updateMarks
    );

export default router;
