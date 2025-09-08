"use client";
import { ApplyCoupon, CustomButton } from "@UI";
import styled from "@emotion/styled";
import { useCartStore } from "@store/useCartStore";
import { useShopStore } from "@store/useShopStore";
import { Fieldset, Input, Label } from "@styles";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateOrder } from "@/lib/api/order";
import type { CreateOrderData } from "@/types/apiTypes";
import { RecaptchaField } from "../Recaptcha/Recaptcha";

type FormData = {
	email: string;
	phone: string;
	firstName: string;
	lastName: string;
	city: string;
	street: string;
};

interface CheckoutFormProps {
	onAddressChange?: (address: { city: string; street: string } | null) => void;
	deliveryTime?: string | null;
}

export const CheckoutForm = ({
	onAddressChange,
	deliveryTime,
}: CheckoutFormProps) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		trigger,
		reset,
	} = useForm<FormData>({
		mode: "onBlur",
		reValidateMode: "onChange",
	});

	const [cityBlurred, setCityBlurred] = useState(false);
	const [streetBlurred, setStreetBlurred] = useState(false);
	const [recaptchaValue, setRecaptchaValue] = useState(null);
	const router = useRouter();

	const createOrderMutation = useCreateOrder();
	const { items: cartItems, total, clearCart } = useCartStore();
	const { selectedShopId, resetShopStore } = useShopStore();

	const [validAddress, setValidAddress] = useState<{
		city: string;
		street: string;
	} | null>(null);

	const city = watch("city");
	const street = watch("street");

	const handleAddressChange = useCallback(
		(address: { city: string; street: string } | null) => {
			onAddressChange?.(address);
		},
		[onAddressChange],
	);

	const handleCityBlur = useCallback(async () => {
		setCityBlurred(true);
		await trigger("city");
	}, [trigger]);

	const handleStreetBlur = useCallback(async () => {
		setStreetBlurred(true);
		await trigger("street");
	}, [trigger]);

	useEffect(() => {
		if (!cityBlurred || !streetBlurred) {
			return;
		}

		const cityError = errors.city;
		const streetError = errors.street;

		if (!cityError && !streetError && city?.trim() && street?.trim()) {
			const newAddress = { city: city.trim(), street: street.trim() };

			if (
				!validAddress ||
				validAddress.city !== newAddress.city ||
				validAddress.street !== newAddress.street
			) {
				setValidAddress(newAddress);
				handleAddressChange(newAddress);
			}
		} else {
			if (validAddress) {
				setValidAddress(null);
				handleAddressChange(null);
			}
		}
	}, [
		city,
		street,
		errors.city,
		errors.street,
		cityBlurred,
		streetBlurred,
		validAddress,
		handleAddressChange,
	]);

	const onSubmit = (data: FormData) => {
		if (!validAddress || !deliveryTime) return;

		const orderData: CreateOrderData = {
			items: cartItems.map((item) => ({
				flowerId: item.flowerId,
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				description: item.description,
				shopId: item.shopId,
				flowerPic: item.flowerPic,
			})),
			total,
			deliveryTime,
			name: `${data.firstName} ${data.lastName}`,
			email: data.email,
			phone: data.phone,
			address: `${data.city}, ${data.street}`,
			shopId: selectedShopId!,
		};

		createOrderMutation.mutate(orderData, {
			onSuccess: (res) => {
				reset();
				setValidAddress(null);
				handleAddressChange(null);
				clearCart();
				resetShopStore();
				router.push(`/order/${res.orderId}`);
			},
			onError: (err: Error) => {
				console.error("Failed to create order:", err.message);
			},
		});
	};

	return (
		<>
			<form
				style={{ width: "100%" }}
				id='checkout-form'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Fieldset>
					<Title>Contact Information</Title>

					<Label>
						Email
						<Input
							placeholder='your.email@example.com'
							type='email'
							{...register("email", {
								required: "Email required",
								pattern: {
									value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
									message: "Incorrect Email",
								},
							})}
						/>
						{errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
					</Label>

					<Label>
						Phone Number
						<Input
							placeholder='+1 (555) 123-4567'
							type='tel'
							{...register("phone", {
								required: "The phone is required",
								pattern: {
									value: /^\+?[0-9\s\-()]{7,20}$/,
									message: "Incorrect phone number",
								},
							})}
						/>
						{errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
					</Label>
				</Fieldset>

				<Fieldset>
					<Title>Delivery Address</Title>
					<GridBox>
						<Label>
							First Name
							<Input
								placeholder='John'
								type='text'
								{...register("firstName", { required: "The name is required" })}
							/>
							{errors.firstName && (
								<ErrorMsg>{errors.firstName.message}</ErrorMsg>
							)}
						</Label>

						<Label>
							Last Name
							<Input
								placeholder='Doe'
								type='text'
								{...register("lastName", {
									required: "The last name is required",
								})}
							/>
							{errors.lastName && (
								<ErrorMsg>{errors.lastName.message}</ErrorMsg>
							)}
						</Label>

						<Label>
							City
							<Input
								placeholder='Odesa'
								type='text'
								{...register("city", { required: "The city is required" })}
								onBlur={handleCityBlur}
							/>
							{errors.city && <ErrorMsg>{errors.city.message}</ErrorMsg>}
						</Label>

						<Label>
							Street Address
							<Input
								placeholder='123 Main Street'
								type='text'
								{...register("street", { required: "The street is required" })}
								onBlur={handleStreetBlur}
							/>
							{errors.street && <ErrorMsg>{errors.street.message}</ErrorMsg>}
						</Label>
					</GridBox>
				</Fieldset>
			</form>

			<ApplyCoupon />

			<RecaptchaField onChange={setRecaptchaValue} />

			<CustomButton
				isSubmit
				disabled={!isValid || !recaptchaValue}
				isFullWidth
				variant='primary'
				value='Complete order'
				form='checkout-form'
			/>
		</>
	);
};

const Title = styled.h2`
	margin: 0;
	color: #1F2937;
	font-size: 24px;
	font-weight: 500;
`;

const ErrorMsg = styled.span`
	color: #dc2626;
	font-size: 14px;
	margin-top: 4px;
	display: block;
`;

const GridBox = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;
`;
