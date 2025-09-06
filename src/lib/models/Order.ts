import { Schema, model, models } from 'mongoose';

export const OrderSchema = new Schema(
	{
		orderId: { type: String, unique: true, required: true },
		items: [
			{
				flowerId: {
					type: Schema.Types.ObjectId,
					ref: 'Flower',
					required: true,
				},
				name: { type: String, required: true },
				price: { type: Number, required: true },
				quantity: { type: Number, required: true },
			},
		],
		total: { type: Number, required: true },
		email: { type: String, required: true },
		phone: { type: String, required: true },
		address: { type: String, required: true },
		shopId: {
			type: Schema.Types.ObjectId,
			ref: 'Shop',
			required: true,
		},
		createdAt: { type: Date, default: Date.now },
		timezone: { type: String },
	},
	{
		timestamps: true,
		strict: 'throw',
	}
);

export default models.Order || model('Order', OrderSchema);
