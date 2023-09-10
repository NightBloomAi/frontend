"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextProvider from "../../contexts/authContext";

function Providers({ children, }: React.PropsWithChildren) {
    const [client] = React.useState(new QueryClient());

    return (
        <QueryClientProvider client={client}>
            <AuthContextProvider>{children}</AuthContextProvider>
        </QueryClientProvider>
    );
}

export default Providers;
