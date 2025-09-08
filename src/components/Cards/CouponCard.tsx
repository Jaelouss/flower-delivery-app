"use client";

import { CustomButton } from "@UI";
import styled from "@emotion/styled";
import { PercentIcon } from "@phosphor-icons/react";
import { Box, flexColumn, Icon, theme } from "@styles";
import { useState } from "react";
import type { Coupon } from "@/types/apiTypes";

export interface CouponCardProps {
	coupon: Coupon;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
	const { expires, isDisabled } = couponExpiries(coupon);
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(coupon.code).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		});
	};

	return (
		<CouponBox>
			<List>
				<IconWrapper>
					<Icon $size={[18, 31]} color={theme.colors.hotPink}>
						<PercentIcon />
					</Icon>
				</IconWrapper>
				<TitleWrapper>
					<CouponTitle>{coupon.title}</CouponTitle>
					<Box justify='space-between'>
						<Code>{coupon.code}</Code>
						<DateExp>{expires}</DateExp>
					</Box>
				</TitleWrapper>
			</List>
			<CustomButton
				value={
					isDisabled ? "Check back later" : copied ? "Copied!" : "Copy code"
				}
				variant='primary'
				disabled={isDisabled}
				isFullWidth
				onClick={handleCopy}
			/>
		</CouponBox>
	);
};

const couponExpiries = (coupon: Coupon) => {
	const today = new Date();
	const from = coupon.validFrom ? new Date(coupon.validFrom) : today;
	const to = coupon.validUntil ? new Date(coupon.validUntil) : from;

	const formatDate = (date: Date) => {
		const day = String(date.getDate()).padStart(2, "0");
		const month = date.toLocaleString("en-US", { month: "short" });
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	};

	const isDisabled = today < from || today > to;

	let expires: string;
	if (!coupon.validFrom) {
		expires = `Expires: ${formatDate(to)}`;
	} else if (
		from.getDate() === to.getDate() &&
		from.getMonth() === to.getMonth() &&
		from.getFullYear() === to.getFullYear()
	) {
		expires = `Can use only ${formatDate(from)}`;
	} else {
		expires = `Valid from ${formatDate(from)} to ${formatDate(to)}`;
	}

	return { expires, isDisabled };
};

const CouponBox = styled(Box)`
	flex-direction: column;
	gap: 24px;
	border: 4px solid rgba(34, 175, 39, 0.6);
	border-radius: 4px;
	background:
		linear-gradient(0deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)),
		url('/pictures/coupons/bg.jpg') center/cover no-repeat;
	width: 408.0px;
	height: 300.0px;
	padding: 24px;
`;
const List = styled.ul`
${flexColumn("flex-start", "center", "75px")};
width:100%;
`;
const IconWrapper = styled.li`
${flexColumn("center", "center")};
width: 50.0px;
height: 49.0px;
padding: 9px 16px;
border-radius: 100px;
border: ${theme.border.pink};
`;
const TitleWrapper = styled.li`
${flexColumn("flex-start", "center", "8px")};
width:100%;
`;
const CouponTitle = styled.h2`
color: #000;
font-size: 16px;
font-weight: 700;
margin:0;
`;
const Code = styled.span`
font-size: 16px;
font-weight: 700;
background: ${theme.colors.button};
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`;
const DateExp = styled.span`
color:${theme.colors.secondaryDark};
font-size: 14px;
`;
