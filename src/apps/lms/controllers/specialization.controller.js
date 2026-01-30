import { Specialization } from "../models/specialization.models.js";
import { Branch } from "../models/branch.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createSpecialization = asyncHandler(async (req, res) => {
    const { name, description, branch, institution } = req.body;

    const branchExists = await Branch.findById(branch);
    if (!branchExists) throw new ApiError(404, "Branch not found");

    const specialization = await Specialization.create({
        name,
        description,
        branch,
        institution,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, specialization, "Specialization created successfully"));
});

const getAllSpecializations = asyncHandler(async (req, res) => {
    const { branchId, institutionId } = req.query;
    const filter = {};
    if (branchId) filter.branch = branchId;
    if (institutionId) filter.institution = institutionId;

    const specializations = await Specialization.find(filter).populate("branch", "name");

    return res
        .status(200)
        .json(new ApiResponse(200, specializations, "Specializations fetched successfully"));
});

const getSpecializationById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const specialization = await Specialization.findById(id).populate("branch", "name");

    if (!specialization) {
        throw new ApiError(404, "Specialization not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, specialization, "Specialization fetched successfully"));
});

const updateSpecialization = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, branch } = req.body;

    const specialization = await Specialization.findByIdAndUpdate(
        id,
        { $set: { name, description, branch } },
        { new: true }
    );

    if (!specialization) {
        throw new ApiError(404, "Specialization not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, specialization, "Specialization updated successfully"));
});

const deleteSpecialization = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const specialization = await Specialization.findByIdAndDelete(id);

    if (!specialization) {
        throw new ApiError(404, "Specialization not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Specialization deleted successfully"));
});

export {
    createSpecialization,
    getAllSpecializations,
    getSpecializationById,
    updateSpecialization,
    deleteSpecialization,
};
