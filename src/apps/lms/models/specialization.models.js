import mongoose, { Schema } from "mongoose";

const specializationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        branch: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
        },
    },
    { timestamps: true }
);

export const Specialization = mongoose.model("Specialization", specializationSchema);
