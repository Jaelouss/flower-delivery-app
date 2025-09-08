"use client";

import { OrderSearchForm } from "@components";
import styled from "@emotion/styled";
import { flexColumn, theme } from "@styles";
import { useState } from "react";
import { OrderSearchCard } from "@/components/Cards/OrderSearchCard";
import type { SearchFormData } from "@/components/Forms/OrderSearchForm";
import { useSearchOrders } from "@/lib/api/order";

export default function Page() {
	const [searchParams, setSearchParams] = useState<SearchFormData>({});
	const { data: orders = [], refetch } = useSearchOrders(
		searchParams.email,
		searchParams.phone,
		searchParams.orderId,
	);

	const handleSearch = (values: SearchFormData) => {
		setSearchParams(values);
		refetch();
	};

	return (
		<StyledSection>
			<Title>Orders history</Title>
			<OrderSearchForm onSearch={handleSearch} />

			{orders.map((order) => (
				<OrderSearchCard key={order.orderId} order={order} />
			))}
		</StyledSection>
	);
}

const StyledSection = styled.section`
	${flexColumn("center", "center", "24px")};
	margin-block: 40px;
`;
const Title = styled.h1`
	color: ${theme.colors.dark};
	text-align: center;
	font-size: 32px;
	font-weight: 500;
	width: 100%;
	margin: 0;
`;
