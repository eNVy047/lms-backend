import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const studentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },
        enrollmentNumber: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        rollNumber: {
            type: String,
            required: true,
            trim: true
        },
        // Academic Mapping
        course: {
            type: Schema.Types.ObjectId,
            ref: "Courses",
            required: true
        },
        branch: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true
        },
        specialization: {
            type: Schema.Types.ObjectId,
            ref: "Specialization"
        },
        currentSemester: {
            type: Number,
            required: true,
            min: 1
        },
        section: {
            type: String,
            trim: true
        },
        batch: {
            type: String, // e.g., "2023-2027"
            required: true,
            trim: true
        },

        // Personal Attributes & IDs
        abcId: {
            type: String,
            trim: true
        },
        aadhaarNumber: {
            type: String,
            trim: true
        },
        panNumber: {
            type: String,
            trim: true
        },

        // Documents
        aadhaarDocument: {
            type: String, // URL
            trim: true
        },
        panDocument: {
            type: String, // URL
            trim: true
        },
        tenthMarksheet: {
            type: String, // URL
            trim: true
        },
        twelfthMarksheet: {
            type: String, // URL
            trim: true
        },
        additionalDocuments: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true }
            }
        ],

        // Other existing fields
        department: {
            type: String,
            trim: true
        },
        guardianName: {
            type: String,
            trim: true
        },
        guardianPhone: {
            countryCode: { type: String, default: "+91" },
            number: {
                type: String,
                trim: true,
            },
        },

        // Hostel Details
        isHosteler: {
            type: Boolean,
            default: false
        },
        hostelRoomNumber: {
            type: String,
            trim: true
        },

        // Transport Details
        isTransportUser: {
            type: Boolean,
            default: false
        },
        transportRoute: {
            type: Schema.Types.ObjectId,
            ref: "TransportRoute"
        },
        transportStop: {
            type: String, // Name of the stop from the route
            trim: true
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

studentSchema.plugin(mongooseAggregatePaginate);

export const Student = mongoose.model("Student", studentSchema);
