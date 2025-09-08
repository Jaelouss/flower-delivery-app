import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { origin, destination } = await request.json();

		if (
			!origin ||
			!destination ||
			!origin.lat ||
			!origin.lng ||
			!destination.lat ||
			!destination.lng
		) {
			return NextResponse.json(
				{ error: "Invalid coordinates" },
				{ status: 400 },
			);
		}

		const API_KEY = process.env.GOOGLE_MAPS_SERVER_KEY;

		const geocodeRes = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${destination.lat},${destination.lng}&key=${API_KEY}`,
		);
		const geocodeData = await geocodeRes.json();

		if (!geocodeData.results[0]) {
			return NextResponse.json({ error: "Address not found" }, { status: 404 });
		}

		const addressComponents = geocodeData.results[0].address_components;
		let city = "",
			street = "";

		addressComponents.forEach((comp) => {
			if (
				comp.types.includes("locality") ||
				comp.types.includes("administrative_area_level_2")
			) {
				city = comp.long_name;
			}
			if (comp.types.includes("route")) {
				street = comp.long_name;
			}
			if (comp.types.includes("street_number")) {
				street += " " + comp.long_name;
			}
		});

		const directionsRes = await fetch(
			`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=driving&key=${API_KEY}`,
		);
		const directionsData = await directionsRes.json();

		if (!directionsData.routes[0]) {
			return NextResponse.json({ error: "Route not found" }, { status: 404 });
		}

		const duration = directionsData.routes[0].legs[0].duration.text;

		return NextResponse.json({
			city,
			street,
			deliveryTime: duration,
		});
	} catch (error) {
		console.error("Maps API error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
