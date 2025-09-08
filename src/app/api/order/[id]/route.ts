import { NextResponse } from "next/server";
import dbConnect from "@/lib/models/connection";
import Order from "@/lib/models/Order";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } },
) {
	await dbConnect();

	try {
		const order = await Order.findOne({ orderId: params.id });

		if (!order) {
			return NextResponse.json({ error: "Order not found" }, { status: 404 });
		}

		return NextResponse.json(order);
	} catch (error) {
		console.error("Error fetching order by ID:", error);
		return NextResponse.json(
			{ error: "Failed to fetch order" },
			{ status: 500 },
		);
	}
}
