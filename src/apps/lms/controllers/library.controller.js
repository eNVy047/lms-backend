import { LibraryAsset } from "../models/libraryAsset.models.js";
import { LibraryTransaction } from "../models/libraryTransaction.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

// --- Assets ---
const addAsset = asyncHandler(async (req, res) => {
    const {
        institution, type, title, author, publisher, isbn,
        totalCopies, availableCopies, shelfLocation
    } = req.body;

    const asset = await LibraryAsset.create({
        institution,
        type,
        title,
        author,
        publisher,
        isbn,
        totalCopies,
        availableCopies: availableCopies || totalCopies,
        shelfLocation,
        createdBy: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, asset, "Asset added to library"));
});

const getInventory = asyncHandler(async (req, res) => {
    const { institutionId, type, search } = req.query;
    const filter = {};
    if (institutionId) filter.institution = institutionId;
    if (type) filter.type = type;
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } }
        ];
    }

    const assets = await LibraryAsset.find(filter);
    return res.status(200).json(new ApiResponse(200, assets, "Inventory fetched"));
});

// --- Transactions ---
const issueAsset = asyncHandler(async (req, res) => {
    const { assetId, borrowerModel, borrowerId, dueDate } = req.body;

    const asset = await LibraryAsset.findById(assetId);
    if (!asset) throw new ApiError(404, "Asset not found");
    if (asset.availableCopies < 1) throw new ApiError(400, "Asset not available");

    // Reduce inventory
    asset.availableCopies -= 1;
    await asset.save();

    const transaction = await LibraryTransaction.create({
        asset: assetId,
        borrowerModel,
        borrowerId,
        issuedBy: req.user._id,
        issueDate: new Date(),
        dueDate: dueDate, // or calculate based on rules
        status: "ISSUED"
    });

    return res.status(201).json(new ApiResponse(201, transaction, "Asset issued successfully"));
});

const returnAsset = asyncHandler(async (req, res) => {
    const { transactionId } = req.params;
    const { finePaid } = req.body; // If collecting fine immediately

    const transaction = await LibraryTransaction.findById(transactionId);
    if (!transaction) throw new ApiError(404, "Transaction not found");
    if (transaction.status === "RETURNED") throw new ApiError(400, "Already returned");

    // Calculate fine logic could be here (mocked for now)
    // if (new Date() > transaction.dueDate) ...

    transaction.status = "RETURNED";
    transaction.returnDate = new Date();
    if (finePaid) transaction.finePaid = finePaid;

    await transaction.save();

    // Restore inventory
    const asset = await LibraryAsset.findById(transaction.asset);
    if (asset) {
        asset.availableCopies += 1;
        await asset.save();
    }

    return res.status(200).json(new ApiResponse(200, transaction, "Asset returned successfully"));
});

export { addAsset, getInventory, issueAsset, returnAsset };
