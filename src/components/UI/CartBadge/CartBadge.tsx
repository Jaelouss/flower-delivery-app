"use client";
import styled from "@emotion/styled";
import { useCartStore } from "@store/useCartStore";
import { flexRow, theme } from "@styles";

interface CartBadgeProps {}

export const CartBadge: React.FC<CartBadgeProps> = () => {
	const { totalQuantity } = useCartStore();

	if (totalQuantity === 0) return null;

	return <Badge>{totalQuantity}</Badge>;
};

const Badge = styled.div`
	${flexRow("center", "center")}
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(20%, -10%);
	background: ${theme.colors.button};
	width: 24px;
	height: 24px;
	border-radius: 50%;
	color: ${theme.colors.bg};
	font-size: 14px;
	font-weight: 700;
	line-height: 1;
`;
