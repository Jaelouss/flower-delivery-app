"use client";

import styled from "@emotion/styled";
import { flexColumn } from "../mixins";
import { theme } from "../theme";

export const Fieldset = styled.fieldset`
${flexColumn("flex-start", "center", "16px")}
width:100%;
padding: 24px;
border-radius: ${theme.border.radius};
background: ${theme.colors.white};
`;
