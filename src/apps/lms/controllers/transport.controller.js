import { TransportRoute, Vehicle } from "../models/transport.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

// --- Routes ---
const createRoute = asyncHandler(async (req, res) => {
    const { name, routeNumber, stops, vehicle, charges, institution } = req.body;

    const route = await TransportRoute.create({
        institution,
        name,
        routeNumber,
        stops,
        vehicle,
        charges,
        createdBy: req.user._id
    });

    return res.status(201).json(new ApiResponse(201, route, "Route created successfully"));
});

const getRoutes = asyncHandler(async (req, res) => {
    const { institutionId } = req.query;
    const filter = institutionId ? { institution: institutionId } : {};

    const routes = await TransportRoute.find(filter).populate("vehicle");
    return res.status(200).json(new ApiResponse(200, routes, "Routes fetched"));
});

// --- Vehicles ---
const createVehicle = asyncHandler(async (req, res) => {
    const {
        institution, vehicleNumber, type, capacity,
        driverName, driverPhone, driverLicense, gpsDeviceId
    } = req.body;

    const vehicle = await Vehicle.create({
        institution,
        vehicleNumber,
        type,
        capacity,
        driverName,
        driverPhone,
        driverLicense,
        gpsDeviceId
    });

    return res.status(201).json(new ApiResponse(201, vehicle, "Vehicle added"));
});

const getVehicles = asyncHandler(async (req, res) => {
    const { institutionId } = req.query;
    const filter = institutionId ? { institution: institutionId } : {};

    const vehicles = await Vehicle.find(filter);
    return res.status(200).json(new ApiResponse(200, vehicles, "Vehicles fetched"));
});

export { createRoute, getRoutes, createVehicle, getVehicles };
