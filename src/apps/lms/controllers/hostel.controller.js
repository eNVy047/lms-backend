import { Hostel, HostelRoom, HostelAllotment } from "../models/hostel.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

// --- Hostel ---
const createHostel = asyncHandler(async (req, res) => {
    const { institution, name, type, capacity, warden, address } = req.body;
    const hostel = await Hostel.create({ institution, name, type, capacity, warden, address });
    return res.status(201).json(new ApiResponse(201, hostel, "Hostel created successfully"));
});

const getHostels = asyncHandler(async (req, res) => {
    const { institutionId } = req.query;
    const filter = institutionId ? { institution: institutionId } : {};
    const hostels = await Hostel.find(filter).populate("warden", "fullName");
    return res.status(200).json(new ApiResponse(200, hostels, "Hostels fetched successfully"));
});

// --- Rooms ---
const createRoom = asyncHandler(async (req, res) => {
    const { hostel, roomNumber, capacity, roomType, pricePerSemester } = req.body;
    const room = await HostelRoom.create({ hostel, roomNumber, capacity, roomType, pricePerSemester });
    return res.status(201).json(new ApiResponse(201, room, "Room created successfully"));
});

const getRooms = asyncHandler(async (req, res) => {
    const { hostelId } = req.query;
    const filter = hostelId ? { hostel: hostelId } : {};
    const rooms = await HostelRoom.find(filter).populate("hostel", "name");
    return res.status(200).json(new ApiResponse(200, rooms, "Rooms fetched successfully"));
});

// --- Allotment ---
const allotRoom = asyncHandler(async (req, res) => {
    const { student, room } = req.body;
    const hostelRoom = await HostelRoom.findById(room);
    if (!hostelRoom) throw new ApiError(404, "Room not found");
    if (hostelRoom.occupancy >= hostelRoom.capacity) throw new ApiError(400, "Room is full");

    const allotment = await HostelAllotment.create({ student, room });
    hostelRoom.occupancy += 1;
    if (hostelRoom.occupancy >= hostelRoom.capacity) hostelRoom.status = "FULL";
    await hostelRoom.save();

    return res.status(201).json(new ApiResponse(201, allotment, "Room allotted successfully"));
});

export { createHostel, getHostels, createRoom, getRooms, allotRoom };
