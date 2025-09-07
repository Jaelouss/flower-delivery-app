import { model, models, Schema } from "mongoose";

export const CouponSchema = new Schema(
	{
		title: { type: String, required: true },
		code: { type: String, required: true, unique: true },
		discount: { type: Number, required: true },
		description: { type: String, required: true },
		validFrom: { type: Date },
		validUntil: { type: Date, required: true },
		isActive: { type: Boolean, default: true },
	},
	{
		timestamps: true,
		strict: "throw",
	},
);

export default models.Coupon || model("Coupon", CouponSchema);
