import { NextResponse } from "next/server";
import dbConnect from "@/lib/models/connection";
import Order from "@/lib/models/Order";
import type { Order as OrderType } from "@/types/apiTypes";

export async function GET(request: Request) {
	await dbConnect();

	try {
		const { searchParams } = new URL(request.url);
		const email = searchParams.get("email");
		const phone = searchParams.get("phone");
		const orderId = searchParams.get("orderId");

		if (!email && !phone && !orderId) {
			return NextResponse.json(
				{
					error:
						"Provide at least one search parameter: email, phone, or orderId",
				},
				{ status: 400 },
			);
		}

		const query: Partial<Pick<OrderType, "email" | "phone" | "orderId">> = {};

		if (email) query.email = email;
		if (phone) query.phone = phone;
		if (orderId) query.orderId = orderId;

		const orders = await Order.find(query).sort({ createdAt: -1 }).exec();

		if (orders.length === 0) {
			return NextResponse.json({ message: "No orders found" }, { status: 404 });
		}

		return NextResponse.json(orders);
	} catch (error) {
		console.error("Error searching orders:", error);
		return NextResponse.json(
			{ error: "Failed to search orders" },
			{ status: 500 },
		);
	}
}
