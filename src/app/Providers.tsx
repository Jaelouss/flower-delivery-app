'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Global } from '@emotion/react';
import { globalStyles } from '@/styles/globalStyles';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Global styles={globalStyles} />
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
}
