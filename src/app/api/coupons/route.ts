import { NextResponse } from "next/server";
import Coupon from "@/lib/models/Coupon";
import dbConnect from "@/lib/models/connection";

export async function GET() {
	await dbConnect();

	try {
		const coupons = await Coupon.find({
			isActive: true,
		}).sort({ discount: -1 });

		return NextResponse.json(coupons);
	} catch (error) {
		console.error("Error fetching coupons:", error);
		return NextResponse.json(
			{ error: "Failed to fetch coupons" },
			{ status: 500 },
		);
	}
}
