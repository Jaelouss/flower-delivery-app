"use client";

import styled from "@emotion/styled";
import { flexColumn } from "../mixins";
import { theme } from "../theme";

export const Label = styled.label`
color:${theme.colors.dark};
font-family: ${theme.fontFamily.inter};
font-size: 14px;
font-weight: 500;
width:100%;
${flexColumn("flex-start", "center", "8px")}
`;
