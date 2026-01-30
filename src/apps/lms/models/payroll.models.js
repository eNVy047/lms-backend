import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const payrollSchema = new Schema(
    {
        institution: {
            type: Schema.Types.ObjectId,
            ref: "Institution",
            required: true,
            index: true,
        },
        // Linked to any user system (Teacher, Admin, Staff)
        employee: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        month: {
            type: Number, // 1-12
            required: true,
        },
        year: {
            type: Number, // 2024
            required: true,
        },

        // Earnings
        basicSalary: { type: Number, required: true, min: 0 },
        hra: { type: Number, default: 0 }, // House Rent Allowance
        da: { type: Number, default: 0 }, // Dearness Allowance
        allowances: [
            {
                name: String, // e.g. "Medical", "Transport"
                amount: Number
            }
        ],
        bonus: { type: Number, default: 0 },

        // Deductions
        pf: { type: Number, default: 0 }, // Provident Fund
        tax: { type: Number, default: 0 }, // TDS
        professionalTax: { type: Number, default: 0 },
        leavesDeduction: { type: Number, default: 0 }, // Calculated from Attendance
        otherDeductions: [
            {
                name: String, // e.g. "Loan Repayment"
                amount: Number
            }
        ],

        // Totals
        totalEarnings: { type: Number, required: true },
        totalDeductions: { type: Number, required: true },
        netSalary: { type: Number, required: true }, // In Hand

        status: {
            type: String,
            enum: ["DRAFT", "GENERATED", "PAID"],
            default: "DRAFT",
            index: true,
        },
        paymentDate: Date,
        transactionId: String,

        generatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

payrollSchema.index({ institution: 1, employee: 1, month: 1, year: 1 }, { unique: true });

payrollSchema.plugin(mongooseAggregatePaginate);

export const Payroll = mongoose.model("Payroll", payrollSchema);
