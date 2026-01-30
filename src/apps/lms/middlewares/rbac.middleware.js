import { ApiError } from "../../../common/utils/ApiError.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { UserRolesEnum } from "../../../constants.js";

/**
 * Middleware to restrict access to specific roles
 * @param {string[]} roles - Array of allowed roles (e.g. ["ADMIN", "TEACHER"])
 */
export const verifyRole = (...roles) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user) {
            throw new ApiError(401, "Unauthorized access: User not authenticated");
        }

        if (!roles.includes(req.user.role)) {
            throw new ApiError(403, "Forbidden: You do not have permission to perform this action");
        }

        next();
    });
};

/**
 * Middleware to allow Admin OR the owner of the resource
 * Checks if req.user.role is ADMIN/SUPERADMIN OR if req.user._id matches the target ID
 * @param {string} paramName - Name of the route parameter containing the user ID (default: "id")
 */
export const verifyOwnerOrAdmin = (paramName = "id") => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user) {
            throw new ApiError(401, "Unauthorized");
        }

        const isAdmin = [UserRolesEnum.ADMIN, UserRolesEnum.SUPERADMIN].includes(req.user.role);
        const targetId = req.params[paramName];
        const isOwner = req.user._id.toString() === targetId;

        if (!isAdmin && !isOwner) {
            throw new ApiError(403, "Forbidden: You can only access your own data");
        }

        next();
    });
};
