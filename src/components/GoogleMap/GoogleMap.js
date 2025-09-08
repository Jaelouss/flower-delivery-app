"use client";

import { useCallback, useEffect, useRef } from "react";

export const GoogleMap = ({
	storeLocation,
	userAddress,
	onDeliveryTimeCalculated,
}) => {
	const mapRef = useRef(null);
	const userMarkerRef = useRef(null);
	const mapInstanceRef = useRef(null);
	const directionsServiceRef = useRef(null);
	const directionsRendererRef = useRef(null);
	const lastProcessedAddressRef = useRef(null);

	const handleDeliveryTimeCalculated = useCallback(
		(time) => {
			onDeliveryTimeCalculated?.(time);
		},
		[onDeliveryTimeCalculated],
	);

	const fallbackCalculateDeliveryTime = useCallback(
		async (origin, destination) => {
			try {
				const res = await fetch("/api/maps", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						origin: origin,
						destination: destination,
					}),
				});

				if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

				const data = await res.json();

				if (data.error) {
					console.error("API error:", data.error);
					handleDeliveryTimeCalculated(null);
					return;
				}

				handleDeliveryTimeCalculated(data.deliveryTime);
			} catch (error) {
				console.error("Fetch error:", error.message);
				handleDeliveryTimeCalculated(null);
			}
		},
		[handleDeliveryTimeCalculated],
	);

	const calculateAndShowRoute = useCallback(
		(origin, destination) => {
			if (!directionsServiceRef.current || !directionsRendererRef.current) {
				console.error("Directions services not initialized");
				fallbackCalculateDeliveryTime(origin, destination);
				return;
			}

			directionsServiceRef.current.route(
				{
					origin: origin,
					destination: destination,
					travelMode: window.google.maps.TravelMode.DRIVING,
				},
				(response, status) => {
					if (status === "OK") {
						directionsRendererRef.current.setDirections(response);

						const duration = response.routes[0].legs[0].duration.text;

						handleDeliveryTimeCalculated(duration);

						const bounds = new window.google.maps.LatLngBounds();
						bounds.extend(origin);
						bounds.extend(destination);
						mapInstanceRef.current.fitBounds(bounds);
					} else {
						console.error("Directions request failed:", status);
						fallbackCalculateDeliveryTime(origin, destination);
					}
				},
			);
		},
		[handleDeliveryTimeCalculated, fallbackCalculateDeliveryTime],
	);

	const handleLocationClick = useCallback(
		(location) => {
			if (userMarkerRef.current) {
				userMarkerRef.current.setMap(null);
			}

			userMarkerRef.current = new window.google.maps.Marker({
				position: location,
				map: mapInstanceRef.current,
				title: "Your address",
				icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
			});

			calculateAndShowRoute(storeLocation, location);
		},
		[calculateAndShowRoute, storeLocation],
	);

	const processUserAddress = useCallback(
		(address) => {
			if (!window.google || !mapInstanceRef.current) {
				console.error("Google Maps not ready");
				return;
			}

			const geocoder = new window.google.maps.Geocoder();
			const fullAddress = `${address.street}, ${address.city}`;

			geocoder.geocode({ address: fullAddress }, (results, status) => {
				if (status === "OK" && results[0]) {
					const location = results[0].geometry.location;
					const locationObj = {
						lat: location.lat(),
						lng: location.lng(),
					};

					if (userMarkerRef.current) {
						userMarkerRef.current.setMap(null);
					}

					userMarkerRef.current = new window.google.maps.Marker({
						position: locationObj,
						map: mapInstanceRef.current,
						title: "Your address",
						icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
					});

					calculateAndShowRoute(storeLocation, locationObj);
				} else {
					console.error("Geocode failed:", status);
					handleDeliveryTimeCalculated(null);
				}
			});
		},
		[calculateAndShowRoute, storeLocation, handleDeliveryTimeCalculated],
	);

	useEffect(() => {
		if (
			!storeLocation ||
			typeof storeLocation.lat !== "number" ||
			typeof storeLocation.lng !== "number"
		) {
			console.error("Invalid storeLocation:", storeLocation);
			return;
		}

		if (mapInstanceRef.current) {
			return;
		}

		const existingScript = document.querySelector(
			'script[src*="maps.googleapis.com"]',
		);

		if (!window.google) {
			if (!existingScript) {
				const script = document.createElement("script");
				script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_CLIENT_KEY}&libraries=places`;
				script.async = true;
				script.defer = true;
				script.onload = initMap;
				document.head.appendChild(script);
			} else {
				const checkGoogleInterval = setInterval(() => {
					if (window.google) {
						clearInterval(checkGoogleInterval);
						initMap();
					}
				}, 100);

				return () => clearInterval(checkGoogleInterval);
			}
		} else {
			initMap();
		}

		function initMap() {
			try {
				const map = new window.google.maps.Map(mapRef.current, {
					center: storeLocation,
					zoom: 13,
				});

				mapInstanceRef.current = map;

				directionsServiceRef.current =
					new window.google.maps.DirectionsService();
				directionsRendererRef.current =
					new window.google.maps.DirectionsRenderer({
						suppressMarkers: true,
					});
				directionsRendererRef.current.setMap(map);

				new window.google.maps.Marker({
					position: storeLocation,
					map: map,
					title: "Store",
					icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
				});

				map.addListener("click", (event) => {
					const clickedLocation = {
						lat: event.latLng.lat(),
						lng: event.latLng.lng(),
					};

					handleLocationClick(clickedLocation);
				});
			} catch (error) {
				console.error("Map initialization error:", error);
			}
		}
	}, [storeLocation, handleLocationClick]);

	useEffect(() => {
		if (!mapInstanceRef.current || !userAddress?.city || !userAddress?.street) {
			return;
		}

		const currentAddress = `${userAddress.street}, ${userAddress.city}`;
		if (lastProcessedAddressRef.current === currentAddress) {
			return;
		}

		lastProcessedAddressRef.current = currentAddress;

		processUserAddress(userAddress);
	}, [userAddress?.city, userAddress?.street, processUserAddress]);

	return <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>;
};
