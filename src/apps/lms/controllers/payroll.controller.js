import { Payroll } from "../models/payroll.models.js";
import { User } from "../../../common/models/user.models.js";
import { ApiError } from "../../../common/utils/ApiError.js";
import { ApiResponse } from "../../../common/utils/ApiResponse.js";
import { asyncHandler } from "../../../common/utils/asyncHandler.js";

const generatePayroll = asyncHandler(async (req, res) => {
    const {
        institution, employee, month, year,
        basicSalary, hra, da, allowances, bonus,
        pf, tax, professionalTax, otherDeductions
    } = req.body;

    // Calculate totals
    const totalAllowances = (allowances || []).reduce((sum, item) => sum + item.amount, 0);
    const totalEarnings = basicSalary + (hra || 0) + (da || 0) + totalAllowances + (bonus || 0);

    const totalOtherDeductions = (otherDeductions || []).reduce((sum, item) => sum + item.amount, 0);
    // Logic for leaves deduction could be fetched from Attendance here in future
    const leavesDeduction = 0;

    const totalDeductions = (pf || 0) + (tax || 0) + (professionalTax || 0) + leavesDeduction + totalOtherDeductions;
    const netSalary = totalEarnings - totalDeductions;

    // Check for duplicate for this month/year/employee
    const existing = await Payroll.findOne({ institution, employee, month, year });
    if (existing && existing.status !== "DRAFT") {
        throw new ApiError(400, "Payroll already generated/finalized for this month");
    }

    // Upsert or Create
    const payroll = await Payroll.findOneAndUpdate(
        { institution, employee, month, year },
        {
            institution,
            employee,
            month,
            year,
            basicSalary,
            hra,
            da,
            allowances,
            bonus,
            pf,
            tax,
            professionalTax,
            leavesDeduction,
            otherDeductions,
            totalEarnings,
            totalDeductions,
            netSalary,
            status: "GENERATED",
            generatedBy: req.user._id
        },
        { new: true, upsert: true }
    );

    return res.status(201).json(new ApiResponse(201, payroll, "Payroll generated successfully"));
});

const getPayroll = asyncHandler(async (req, res) => {
    const { employeeId, month, year } = req.query;
    const filter = {};
    if (employeeId) filter.employee = employeeId;
    if (month) filter.month = month;
    if (year) filter.year = year;

    const payrolls = await Payroll.find(filter).populate("employee", "fullName email");
    return res.status(200).json(new ApiResponse(200, payrolls, "Payroll data fetched"));
});

export { generatePayroll, getPayroll };
