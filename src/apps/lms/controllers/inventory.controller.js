import { InventoryItem } from "../models/inventory.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const createInventoryItem = asyncHandler(async (req, res) => {
    const { institution, name, category, quantity, unit, purchaseDate, purchasePrice, supplier, location, status } = req.body;

    const item = await InventoryItem.create({
        institution,
        name,
        category,
        quantity,
        unit,
        purchaseDate,
        purchasePrice,
        supplier,
        location,
        status,
        createdBy: req.user?._id,
    });

    return res.status(201).json(new ApiResponse(201, item, "Inventory item created successfully"));
});

const getAllInventoryItems = asyncHandler(async (req, res) => {
    const { institutionId, category, status } = req.query;
    const filter = {};
    if (institutionId) filter.institution = institutionId;
    if (category) filter.category = category;
    if (status) filter.status = status;

    const items = await InventoryItem.find(filter).populate("institution", "name");

    return res.status(200).json(new ApiResponse(200, items, "Inventory items fetched successfully"));
});

const getInventoryItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await InventoryItem.findById(id).populate("institution", "name");

    if (!item) throw new ApiError(404, "Inventory item not found");

    return res.status(200).json(new ApiResponse(200, item, "Inventory item fetched successfully"));
});

const updateInventoryItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    updateData.updatedBy = req.user?._id;

    const item = await InventoryItem.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
    );

    if (!item) throw new ApiError(404, "Inventory item not found");

    return res.status(200).json(new ApiResponse(200, item, "Inventory item updated successfully"));
});

const deleteInventoryItem = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const item = await InventoryItem.findByIdAndDelete(id);

    if (!item) throw new ApiError(404, "Inventory item not found");

    return res.status(200).json(new ApiResponse(200, {}, "Inventory item deleted successfully"));
});

export {
    createInventoryItem,
    getAllInventoryItems,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem,
};
