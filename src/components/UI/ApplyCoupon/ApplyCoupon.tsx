"use client";

import styled from "@emotion/styled";
import { useCartStore } from "@store/useCartStore";
import { Box, Fieldset, Input, Label } from "@styles";
import { useForm } from "react-hook-form";
import { useCouponCheck } from "@/lib/api/coupons";
import { CustomButton } from "../CustomButton/CustomButton";

interface ApplyCouponFormValues {
	coupon: string;
}

export const ApplyCoupon: React.FC = () => {
	const { applyCoupon } = useCartStore();

	const {
		register,
		handleSubmit,
		watch,
		setError,
		clearErrors,
		formState: { isSubmitting },
	} = useForm<ApplyCouponFormValues>({ defaultValues: { coupon: "" } });

	const couponCode = watch("coupon");

	const { refetch, isFetching } = useCouponCheck(couponCode, {
		forceDisabled: true,
	});

	const onSubmit = async () => {
		clearErrors("coupon");

		if (!couponCode) {
			setError("coupon", { type: "manual", message: "Enter the coupon code" });
			return;
		}

		const { data } = await refetch();

		if (!data) {
			setError("coupon", {
				type: "manual",
				message: "Incorrect or inactive coupon",
			});
			applyCoupon(null);
			return;
		}

		applyCoupon(data);
	};

	return (
		<form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
			<Fieldset>
				<Title>Coupon Code</Title>
				<Box gap='8px'>
					<Label>
						<Input
							placeholder='Enter coupon code'
							type='text'
							{...register("coupon")}
						/>
					</Label>
					<CustomButton
						padding='16px'
						width='80px'
						value={isSubmitting || isFetching ? "Wait..." : "Apply"}
						variant='secondary'
						isSubmit
						disabled={isSubmitting || isFetching}
					/>
				</Box>
			</Fieldset>
		</form>
	);
};

const Title = styled.h2`
  margin: 0;
  color: #1f2937;
  font-size: 24px;
  font-weight: 500;
`;
