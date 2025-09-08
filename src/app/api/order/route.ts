import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/models/connection";
import Order from "@/lib/models/Order";

export async function POST(request: Request) {
	await dbConnect();

	try {
		const body = await request.json();

		const orderId = randomUUID().slice(0, 8).toUpperCase();

		const createdAt = new Date();
		const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		const newOrder = new Order({
			...body,
			orderId,
			createdAt,
			timezone,
		});

		await newOrder.save();

		return NextResponse.json(
			{ message: "Order created", orderId },
			{ status: 201 },
		);
	} catch (error) {
		console.error("Error creating order:", error);
		return NextResponse.json(
			{ error: "Failed to create order" },
			{ status: 500 },
		);
	}
}
