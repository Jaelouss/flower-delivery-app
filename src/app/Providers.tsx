"use client";

import { GlobalQueryLoader } from "@components";
import { Global, ThemeProvider } from "@emotion/react";
import { globalStyles, theme } from "@styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Global styles={globalStyles} />
				{children}
				<GlobalQueryLoader />
			</ThemeProvider>
		</QueryClientProvider>
	);
}
