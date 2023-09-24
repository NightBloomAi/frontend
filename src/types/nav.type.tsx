import { INavItem } from "@/contexts/navContext";

type NavItem = {
    id?: INavItem;
    name: string;
    href: string;
    icon: React.ReactElement;
};

export type { NavItem };
