import type { InferSchemaType } from "mongoose";
import type { CouponSchema } from "@/lib/models/Coupon";
import type { FlowerSchema } from "@/lib/models/Flower";
import type { OrderSchema } from "@/lib/models/Order";
import type { ShopSchema } from "@/lib/models/Shop";

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
	flowerPic: string;
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
	items: CartItem[];
	total: number;
	name: string;
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
	imageUrl: string;
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
	description: string;
	shopId: string;
	flowerPic: string;
};

export type CreateOrderData = {
	items: CartItem[];
	total: number;
	email: string;
	phone: string;
	name: string;
	address: string;
	shopId: string;
	deliveryTime: string;
};

export type CreateOrderResponse = {
	message: string;
	orderId: string;
};
