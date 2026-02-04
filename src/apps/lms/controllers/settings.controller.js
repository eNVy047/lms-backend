import { Settings } from "../models/settings.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const getSettings = asyncHandler(async (req, res) => {
    const { institutionId } = req.params;
    const settings = await Settings.findOne({ institution: institutionId });
    if (!settings) throw new ApiError(404, "Settings not found");
    return res.status(200).json(new ApiResponse(200, settings, "Settings fetched successfully"));
});

const updateSettings = asyncHandler(async (req, res) => {
    const { institutionId } = req.params;
    const updateData = req.body;
    updateData.updatedBy = req.user?._id;

    const settings = await Settings.findOneAndUpdate(
        { institution: institutionId },
        { $set: updateData },
        { new: true, upsert: true }
    );

    return res.status(200).json(new ApiResponse(200, settings, "Settings updated successfully"));
});

export { getSettings, updateSettings };
