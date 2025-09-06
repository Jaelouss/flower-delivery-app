import { Schema, model, models } from 'mongoose';

export const CouponSchema = new Schema(
	{
		code: { type: String, required: true, unique: true },
		discount: { type: Number, required: true },
		description: { type: String, required: true },
		validFrom: { type: Date, default: Date.now },
		validUntil: { type: Date, required: true },
		isActive: { type: Boolean, default: true },
	},
	{
		timestamps: true,
		strict: 'throw',
	}
);

export default models.Coupon || model('Coupon', CouponSchema);
