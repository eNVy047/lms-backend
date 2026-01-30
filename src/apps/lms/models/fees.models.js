import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const feeSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true, // Index for faster queries
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
      required: true,
      index: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 12, // Assuming max 12 semesters
    },
    amount: {
      type: Number,
      required: true, // Total fee amount (Gross)
      min: 0,
    },
    concessionAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    scholarship: {
      type: Schema.Types.ObjectId,
      ref: "ScholarshipApplication" // Link to the approved application causing this concession
    },
    category: {
      type: String,
      enum: ["ACADEMIC", "HOSTEL", "TRANSPORT"],
      default: "ACADEMIC",
      required: true,
      index: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paymentType: {
      type: String,
      enum: ["FULL", "INSTALLMENT"],
      default: "FULL",
      required: true,
    },
    installments: [
      {
        installmentNumber: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
        dueDate: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ["PENDING", "PAID", "OVERDUE"],
          default: "PENDING",
        },
        paidDate: {
          type: Date,
        },
        paidAmount: {
          type: Number,
          default: 0,
        },
        transactionId: {
          type: String,
        },
        description: {
          type: String, // E.g., "Semester 1 - First Installment" or custom description
        },
        semester: {
          type: Number, // Allows semester-wise installments
        },
      },
    ],
    dueDate: {
      type: Date,
      required: true, // Main due date for full payment, or final installment due date
    },
    status: {
      type: String,
      enum: ["PAID", "PENDING", "OVERDUE", "PARTIAL"],
      default: "PENDING",
    },
    paidDate: {
      type: Date,
    },
    paidAmount: {
      type: Number,
      default: 0, // Total amount paid so far
    },
    transactionId: {
      type: String, // For full payment transactions
    },
    description: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Admin who created this fee
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Admin who last updated this fee
    },
  },
  { timestamps: true }
);

// Indexes for efficient queries
feeSchema.index({ student: 1, course: 1, semester: 1 });
feeSchema.index({ status: 1 });
feeSchema.index({ createdBy: 1 });

// Validation: Installments required if paymentType is INSTALLMENT
feeSchema.pre("validate", function (next) {
  if (this.paymentType === "INSTALLMENT") {
    if (!this.installments || this.installments.length === 0) {
      return next(new Error("Installments are required when payment type is INSTALLMENT"));
    }

    // Validate total installment amount equals fee amount
    const totalInstallmentAmount = this.installments.reduce(
      (sum, inst) => sum + inst.amount,
      0
    );

    if (Math.abs(totalInstallmentAmount - this.amount) > 0.01) {
      return next(
        new Error(
          `Total installment amount (${totalInstallmentAmount}) must equal fee amount (${this.amount})`
        )
      );
    }
  }

  // Calculate isPaid and status based on payments
  if (this.paidAmount >= this.amount) {
    this.isPaid = true;
    this.status = "PAID";
    if (!this.paidDate) {
      this.paidDate = new Date();
    }
  } else if (this.paidAmount > 0) {
    this.status = "PARTIAL";
    this.isPaid = false;
  } else if (this.dueDate < new Date() && this.paidAmount === 0) {
    this.status = "OVERDUE";
    this.isPaid = false;
  } else {
    this.status = "PENDING";
    this.isPaid = false;
  }

  next();
});

// Method to calculate total paid amount
feeSchema.methods.calculatePaidAmount = function () {
  if (this.paymentType === "FULL") {
    return this.isPaid ? this.amount : 0;
  } else {
    return this.installments.reduce(
      (sum, inst) => sum + (inst.status === "PAID" ? inst.paidAmount : 0),
      0
    );
  }
};

// Method to update payment status
feeSchema.methods.updatePaymentStatus = function () {
  const totalPaid = this.calculatePaidAmount();
  this.paidAmount = totalPaid;

  if (totalPaid >= this.amount) {
    this.isPaid = true;
    this.status = "PAID";
    this.paidDate = new Date();
  } else if (totalPaid > 0) {
    this.status = "PARTIAL";
  } else if (this.dueDate < new Date()) {
    this.status = "OVERDUE";
  } else {
    this.status = "PENDING";
  }
};

feeSchema.plugin(mongooseAggregatePaginate);

export const Fees = mongoose.model("Fees", feeSchema);
