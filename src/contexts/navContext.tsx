import { usePathname, useRouter } from "next/navigation";
import React, {
    createContext,
    ReactNode,
    use,
    useContext,
    useEffect,
} from "react";

/******************************************************************************
    INTERFACES
*******************************************************************************/
interface INavContext {
    activeNav: INavItem;
    setActiveNav: (navItem: INavItem) => void;
}

export type INavItem = "home" | "favourites" | "style-guide";

/******************************************************************************
    INITIALISE CONTEXT
*******************************************************************************/
const NavContext = createContext<INavContext>({
    activeNav: "home",
    setActiveNav: () => {},
});

/******************************************************************************
    PROVIDER
*******************************************************************************/
const NavProvider = ({ children }: { children: ReactNode }) => {
    const [activeNav, setActiveNav] = React.useState<INavItem>("home");
    const path = usePathname();

    useEffect(() => {
        const updateActiveNav = (path: string) => {
            if (path === "/") setActiveNav("home");
            else if (path === "/favorites/") setActiveNav("favourites");
            else if (path === "/style-guide/") setActiveNav("style-guide");
        };
        updateActiveNav(path);
    }, [path]);

    return (
        <NavContext.Provider value={{ activeNav, setActiveNav }}>
            {children}
        </NavContext.Provider>
    );
};

/******************************************************************************
    CONTEXT HOOK
*******************************************************************************/
const useNavContext = (): INavContext => {
    const context = useContext(NavContext);
    if (!context)
        throw new Error("useNavContext must be used within a NavProvider");
    return context;
};

export { NavProvider, useNavContext };
