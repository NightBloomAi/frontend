import themeDark from "@/styles/themeDark";
import themeLight from "@/styles/themeLight";
import { Theme } from "@mui/material";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

/******************************************************************************
    INTERFACES
*******************************************************************************/
type ThemeContextType = {
    theme: Theme;
    setAppTheme: (theme: "light" | "dark") => void;
};

/******************************************************************************
    INITIALISE CONTEXT
*******************************************************************************/
const ThemeContext = createContext<ThemeContextType>({
    theme: themeDark,
    setAppTheme: () => {},
});

/******************************************************************************
    PROVIDER
*******************************************************************************/
const AppThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(themeDark);

    // Set theme of the app
    const setAppTheme = (theme: "light" | "dark") => {
        switch (theme) {
            case "light":
                setTheme(themeLight);
                break;
            case "dark":
                setTheme(themeDark);
                break;
            default:
                setTheme(themeDark);
                break;
        }
        // Save theme to local storage
        localStorage.setItem("theme", theme);
    };

    useEffect(() => {
        // Get theme from local storage
        const localTheme = localStorage.getItem("theme") as "light" | "dark";
        // Set theme of the app
        setAppTheme(localTheme);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setAppTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/******************************************************************************
    CONTEXT HOOK
*******************************************************************************/
const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context)
        throw new Error(
            "useThemeContext must be used within a AppThemeProvider"
        );
    return context;
};

export { AppThemeProvider, useThemeContext };
