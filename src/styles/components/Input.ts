"use client";

import styled from "@emotion/styled";
import { flexRow } from "../mixins";
import { theme } from "../theme";

export const Input = styled.input`
${flexRow("center", "center")}
padding: 12px 16px;
border-radius: ${theme.border.radius};
border: ${theme.border.secondaryDark};
width:100%;

&:placeholder{
color: ${theme.colors.tertiary};
font-size: 16px;
font-weight: 400;
}
`;
