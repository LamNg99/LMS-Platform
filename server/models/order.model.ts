import mongoose, { Document, Model, Schema } from "mongoose";

export interface OrderProps extends Document {
  courseId: string;
  userId: string;
  paymentInfo: object;
}

const orderSchema = new Schema<OrderProps>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    paymentInfo: {
      type: Object,
      // require: true
    },
  },
  { timestamps: true }
);

const OrderModel: Model<OrderProps> = mongoose.model("Order", orderSchema);

export default OrderModel;
