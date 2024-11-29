'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function QueryProvider({ children }: Readonly<React.PropsWithChildren>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 3 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
