import mongoose, { Schema } from "mongoose";
import { User } from "../../../common/models/user.models.js";
import { Address } from "./address.models.js";

import {
  AvailableOrderStatuses,
  AvailablePaymentProviders,
  OrderStatusEnum,
  PaymentProviderEnum,
} from "../../../constants.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const orderSchema = new Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    discountedOrderPrice: {
      type: Number,
      required: true,
    },
    // Simplified Order Items (Generic)
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: [{
      name: String,
      quantity: { type: Number, default: 1 },
      price: Number
    }],
    address: {
      addressLine1: {
        required: true,
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        required: true,
        type: String,
      },
      country: {
        required: true,
        type: String,
      },
      pincode: {
        required: true,
        type: String,
      },
      state: {
        required: true,
        type: String,
      },
    },
    status: {
      type: String,
      enum: AvailableOrderStatuses,
      default: OrderStatusEnum.PENDING,
    },
    paymentProvider: {
      type: String,
      enum: AvailablePaymentProviders,
      default: PaymentProviderEnum.UNKNOWN,
    },
    paymentId: {
      type: String,
    },
    // This field shows if the payment is done or not
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongooseAggregatePaginate);

export const EcomOrder = mongoose.model("EcomOrder", orderSchema);
