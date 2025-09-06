import { Schema, model, models, Types } from 'mongoose';

export const FlowerSchema = new Schema(
	{
		name: { type: String, required: true },
		price: { type: Number, required: true },
		description: { type: String, default: '' },
		imageUrl: { type: String, default: '' },
		shopId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Shop',
		},
		createdAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
		strict: 'throw',
	}
);

export default models.Flower || model('Flower', FlowerSchema);
