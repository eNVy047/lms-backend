import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const libraryTransactionSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        asset: {
            type: Schema.Types.ObjectId,
            ref: "LibraryAsset",
            required: true,
        },
        // Polymorphic Borrower (Student or Teacher)
        borrowerModel: {
            type: String,
            required: true,
            enum: ["Student", "Teacher"],
        },
        borrowerId: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "borrowerModel", // Dynamic reference
        },
        issuedBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // Librarian/Admin
            required: true,
        },
        issueDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        returnDate: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["ISSUED", "RETURNED", "OVERDUE", "LOST", "DAMAGED"],
            default: "ISSUED",
            required: true,
            index: true,
        },
        fineAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
        fineStatus: {
            type: String,
            enum: ["PAID", "UNPAID", "WAIVED"],
            default: "UNPAID",
        },
        remarks: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

// Index to quickly find overdue items
libraryTransactionSchema.index({ status: 1, dueDate: 1 });
// Index to find current items held by a user
libraryTransactionSchema.index({ borrowerId: 1, status: 1 });

libraryTransactionSchema.plugin(mongooseAggregatePaginate);

export const LibraryTransaction = mongoose.model("LibraryTransaction", libraryTransactionSchema);
