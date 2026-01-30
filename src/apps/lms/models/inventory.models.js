import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const inventoryItemSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        name: {
            type: String, // e.g. "student Desk", "Projector", "Lab Beaker"
            required: true,
            trim: true,
            index: true,
        },
        category: {
            type: String, // "FURNITURE", "ELECTRONICS", "LAB_EQUIPMENT", "STATIONERY"
            required: true,
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        unit: {
            type: String, // "PCS", "BOX", "KG"
            default: "PCS",
        },
        purchaseDate: Date,
        purchasePrice: Number,
        supplier: {
            name: String,
            contact: String
        },
        location: {
            type: String, // Room Number / Block
            trim: true
        },
        status: {
            type: String,
            enum: ["FUNCTIONAL", "DAMAGED", "MAINTENANCE", "DISPOSED"],
            default: "FUNCTIONAL"
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

inventoryItemSchema.plugin(mongooseAggregatePaginate);

export const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);
