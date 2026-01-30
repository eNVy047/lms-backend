import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const transportRouteSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        name: {
            type: String, // e.g. "Route 1: City Centre"
            required: true,
            trim: true,
        },
        routeNumber: {
            type: String,
            required: true,
            trim: true,
        },
        stops: [
            {
                name: { type: String, required: true },
                pickupTime: { type: String, required: true }, // "07:30"
                dropTime: { type: String, required: true }, // "16:30"
                fare: { type: Number, default: 0 }, // Specific fare for this stop if applicable
            },
        ],
        vehicle: {
            type: Schema.Types.ObjectId,
            ref: "Vehicle", // Linked vehicle
        },
        charges: {
            type: Number,
            required: true, // Base charge for this route
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

transportRouteSchema.plugin(mongooseAggregatePaginate);

export const TransportRoute = mongoose.model("TransportRoute", transportRouteSchema);

const vehicleSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        vehicleNumber: {
            type: String, // License Plate
            required: true,
            unique: true,
            trim: true,
            uppercase: true,
        },
        type: {
            type: String,
            enum: ["BUS", "VAN", "MINIBUS", "CAR"],
            default: "BUS",
        },
        capacity: {
            type: Number,
            required: true,
        },
        driverName: {
            type: String,
            required: true,
            trim: true,
        },
        driverPhone: {
            countryCode: { type: String, default: "+91" },
            number: {
                type: String,
                required: true,
                trim: true,
            },
        },
        driverLicense: {
            type: String,
            trim: true,
        },
        helperName: String,
        gpsDeviceId: String, // For future tracking
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
