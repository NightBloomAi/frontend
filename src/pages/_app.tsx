import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppThemeProvider, useThemeContext } from "@/context/theme.context";
import { AuthProvider } from "@/context/auth.context";
import { StageProvider } from "@/context/stage.context";
import { NavProvider } from "@/context/nav.context";
import { GoogleTagManager } from "@next/third-parties/google";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <StageProvider>
                <AppThemeProvider>
                    <ThemeWrapper>
                        <NavProvider>
                            <AuthProvider>
                                <Component {...pageProps} />
                                <GoogleTagManager gtmId="G-SKQVC2JL0B" />
                            </AuthProvider>
                        </NavProvider>
                    </ThemeWrapper>
                </AppThemeProvider>
            </StageProvider>
        </QueryClientProvider>
    );
}

/**
 * This component wraps the children components with the theme provider.
 * Allows us to use the useThemeContext in the children components.
 *
 * @param children Children components
 * @returns Wrapped children components with theme
 */
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useThemeContext();
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
