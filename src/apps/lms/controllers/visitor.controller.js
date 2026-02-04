import { Visitor } from "../models/visitor.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const logVisitorEntry = asyncHandler(async (req, res) => {
    const { institution, name, phone, purpose, whomToMeet, idType, idNumber } = req.body;
    const visitor = await Visitor.create({
        institution, name, phone, purpose, whomToMeet, idType, idNumber
    });
    return res.status(201).json(new ApiResponse(201, visitor, "Visitor log created"));
});

const logVisitorExit = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visitor = await Visitor.findByIdAndUpdate(
        id,
        { $set: { outTime: new Date(), status: "OUT" } },
        { new: true }
    );
    if (!visitor) throw new ApiError(404, "Visitor log not found");
    return res.status(200).json(new ApiResponse(200, visitor, "Visitor exit logged"));
});

const getVisitors = asyncHandler(async (req, res) => {
    const { institutionId, status } = req.query;
    const filter = { institution: institutionId };
    if (status) filter.status = status;
    const visitors = await Visitor.find(filter).populate("whomToMeet", "fullName");
    return res.status(200).json(new ApiResponse(200, visitors, "Visitor logs fetched"));
});

export { logVisitorEntry, logVisitorExit, getVisitors };
