import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const libraryAssetSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: ["BOOK", "JOURNAL", "MAGAZINE", "NEWSPAPER"],
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            index: true, // Searchable
        },
        author: {
            type: String, // Or array of strings
            trim: true,
        },
        publisher: {
            type: String,
            trim: true,
        },
        isbn: {
            type: String, // For Books/Journals
            trim: true,
        },
        issn: {
            type: String, // For Journals/Periodicals
            trim: true,
        },
        category: {
            type: String, // e.g., "Science", "History", "Fiction"
            trim: true,
        },
        publicationDate: {
            type: Date,
        },
        volume: {
            type: String, // For Journals/Magazines
        },
        issue: {
            type: String, // For Journals/Magazines
        },
        shelfLocation: {
            type: String, // e.g., "Row 5, Shelf B"
            trim: true,
        },
        price: {
            type: Number,
            min: 0,
        },
        // Inventory Tracking
        totalCopies: {
            type: Number,
            required: true,
            min: 0,
            default: 1,
        },
        availableCopies: {
            type: Number,
            required: true,
            min: 0,
            default: 1,
        },
        language: {
            type: String,
            default: "English",
        },
        description: {
            type: String,
        },
        coverImage: {
            type: String, // URL
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

libraryAssetSchema.plugin(mongooseAggregatePaginate);

export const LibraryAsset = mongoose.model("LibraryAsset", libraryAssetSchema);
