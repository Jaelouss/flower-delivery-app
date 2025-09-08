"use client";

import styled from "@emotion/styled";
import { flexColumn, theme } from "@styles";

export interface CustomButtonProps {
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	variant: "primary" | "secondary";
	isFullWidth?: boolean;
	width?: string;
	value: string;
	margin?: string;
	form?: string;
	isSubmit?: boolean;
	disabled?: boolean;
	padding?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
	onClick,
	variant,
	isFullWidth,
	width,
	value,
	margin,
	disabled,
	form,
	isSubmit,
}) => {
	return (
		<ButtonStyled
			onClick={onClick}
			variant={variant}
			isFullWidth={isFullWidth || false}
			width={width}
			disabled={disabled}
			margin={margin}
			form={form}
			type={isSubmit ? "submit" : "button"}
		>
			{value}
		</ButtonStyled>
	);
};

type ButtonProps = {
	variant?: "primary" | "secondary";
	isFullWidth: boolean;
	width?: string;
	margin?: string;
	padding?: string;
};

const ButtonStyled = styled.button<ButtonProps>`
	cursor: pointer;
	width: ${({ isFullWidth, width }) => (isFullWidth ? "100%" : width || "300px")};
	padding:${({ padding }) => (padding ? padding : "16px 32px")} ;
	flex-shrink: 0;
	${flexColumn("center", "center")};
	border-radius: ${theme.border.radius};
	font-weight: 700;
	font-size: 16px;
	user-select: none;
	margin: ${({ margin }) => margin || "none"};

	${({ variant }) =>
		variant === "primary" &&
		`
		border: ${theme.border.transparent};
		background: ${theme.colors.button};
		box-shadow: ${theme.shadow.button};
		color: ${theme.colors.white};

		&:hover {
		  animation: gradientMove 3s linear infinite;
			background-size: 200% 200%;

		}

		@keyframes gradientMove {
		  0% {
		    background-position: 40% 80%;
		  }
		  50% {
		    background-position: 100% 40%;
		  }
		  100% {
		    background-position: 40% 80%;
		  }
		}


		&:active{
		background: transparent;
		border: ${theme.border.pink};
		box-shadow: ${theme.shadow.button};
		background: ${theme.colors.button};
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		}
		&:disabled{
		background: ${theme.colors.tertiary};
		color: ${theme.colors.white};
		  cursor: not-allowed;
  	pointer-events: none;
 		}
  `}
	${({ variant }) =>
		variant === "secondary" &&
		`
		background: transparent;
		border: ${theme.border.transparent};
		color:${theme.colors.hotPink};
		text-decoration: underline solid;
		&:disabled{
		color:${theme.colors.secondaryDark};
	}
  `};
`;
