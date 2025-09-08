"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { theme } from "../theme";

export const NavLink = styled(Link, {
	shouldForwardProp: (prop) => prop !== "$isActive",
})<{ $isActive: boolean }>`
	width: 124px;
	height: 40px;
	padding: 4px 0;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: ${({ $isActive }) => ($isActive ? theme.colors.greenAccent : theme.colors.dark)};
	font-size: 16px;
	font-weight: ${({ $isActive }) => ($isActive ? 700 : 400)};
	text-decoration: none;
	cursor:pointer;
`;
