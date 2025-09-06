import { Schema, model, models } from 'mongoose';

export const ShopSchema = new Schema(
	{
		name: { type: String, required: true },
		address: { type: String, required: true },
		description: { type: String, default: '' },
		location: {
			lat: { type: Number, required: true },
			lng: { type: Number, required: true },
		},
	},
	{
		timestamps: true,
		strict: 'throw',
	}
);

export default models.Shop || model('Shop', ShopSchema);
