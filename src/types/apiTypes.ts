import { InferSchemaType } from 'mongoose';
import { CouponSchema } from '@/lib/models/Coupon';
import { FlowerSchema } from '@/lib/models/Flower';
import { ShopSchema } from '@/lib/models/Shop';
import { OrderSchema } from '@/lib/models/Order';

export type Flower = InferSchemaType<typeof FlowerSchema>;
export type Shop = InferSchemaType<typeof ShopSchema>;
export type Order = InferSchemaType<typeof OrderSchema>;
export type Coupon = InferSchemaType<typeof CouponSchema>;

export type ApiFlower = {
	_id: string;
	name: string;
	price: number;
	description: string;
	shopId: string;
	createdAt: string;
	updatedAt?: string;
};
export type Pagination = {
	currentPage: number;
	totalPages: number;
	total: number;
	hasMore: boolean;
};
export type ApiFlowersResponse = {
	flowers: ApiFlower[];
	pagination: Pagination;
};

export type ApiOrder = {
	_id: string;
	orderId: string;
	items: Array<{
		flowerId: string;
		name: string;
		price: number;
		quantity: number;
	}>;
	total: number;
	email: string;
	phone: string;
	address: string;
	shopId: string;
	createdAt: string;
	updatedAt?: string;
	timezone?: string;
};

export type ApiShop = {
	_id: string;
	name: string;
	address: string;
	description: string;
	location: {
		lat: number;
		lng: number;
	};
	createdAt: string;
	updatedAt?: string;
};

export type ApiCoupon = {
	_id: string;
	code: string;
	discount: number;
	description: string;
	validFrom?: string;
	validUntil: string;
	isActive?: boolean;
	createdAt: string;
	updatedAt?: string;
};

export type CartItem = {
	flowerId: string;
	name: string;
	price: number;
	quantity: number;
};

export type CreateOrderData = {
	items: CartItem[];
	total: number;
	email: string;
	phone: string;
	address: string;
	shopId: string;
};

export type CreateOrderResponse = {
	message: string;
	orderId: string;
};
