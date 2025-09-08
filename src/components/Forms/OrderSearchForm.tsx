"use client";

import { CustomButton } from "@UI";
import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { flexColumn, flexRow, Input, Label, theme } from "@styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useOrderSearchStore } from "@/store/useOrderSearchStore";

export interface OrderSearchFormProps {
	onSearch: (values: SearchFormData) => void;
}

const searchSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email" })
		.optional()
		.or(z.literal("")),
	phone: z.string().optional(),
	orderId: z.string().optional(),
});

export type SearchFormData = z.infer<typeof searchSchema>;

export const OrderSearchForm: React.FC<OrderSearchFormProps> = ({
	onSearch,
}) => {
	const { data, save } = useOrderSearchStore();

	const { register, handleSubmit, reset } = useForm<SearchFormData>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			email: data.email || "",
			phone: data.phone || "",
			orderId: data.orderId || "",
		},
	});

	const onSubmit = (values: SearchFormData) => {
		save(values);
		onSearch(values);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormBox>
				<Label>
					Email
					<Input
						{...register("email")}
						placeholder='your.email@example.com'
						type='text'
					/>
				</Label>
				<Label>
					Phone
					<Input
						{...register("phone")}
						placeholder='+1 (555) 123-4567'
						type='text'
					/>
				</Label>
				<Label>
					ID number
					<Input {...register("orderId")} placeholder='#123456' type='text' />
				</Label>
			</FormBox>
			<CustomButton
				isSubmit
				value='Search order'
				variant='secondary'
				width='250px'
			/>
		</Form>
	);
};

const Form = styled.form`
  ${flexColumn("center", "center", "24px")};
  border-radius: ${theme.border.radius};
  background: ${theme.colors.white};
  padding: 24px;
	width:100%;
`;

const FormBox = styled.div`
  ${flexRow("flex-start", "space-between", "48px")};
	width:100%;
`;
