import { usePathname, useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext, useEffect } from "react";

/******************************************************************************
    INTERFACES
*******************************************************************************/
interface INavContext {
    activeNav: INavItem;
    setActiveNav: (navItem: INavItem) => void;
}

export type INavItem =
    | "home"
    | "favourites"
    | "style-guide"
    | "privacy-policy"
    | "terms-of-service"
    | "not-found";

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
            switch (path) {
                case "/":
                    setActiveNav("home");
                    break;
                case "/favorites/":
                    setActiveNav("favourites");
                    break;
                case "/style-guide/":
                    setActiveNav("style-guide");
                    break;
                case "/privacy-policy/":
                    setActiveNav("privacy-policy");
                    break;
                case "/terms-of-service/":
                    setActiveNav("terms-of-service");
                    break;
                default:
                    setActiveNav("not-found");
                    break;
            }
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
