import { useAuthContext } from "@/context/auth.context";
import { Views } from "@/models/view.models";
import { updateQuery } from "@/utils/helperFunctions";
import { useRouter } from "next/router";
import { ComponentType, ComponentProps, useEffect } from "react";

/**
 * Checks if user is authenticated and if they are then stops them from accessing login and signup popups
 *
 * @param Component Child component to be wrapped
 * @returns The wrapped component
 */
export default function authCheck<T extends ComponentType<any>>(Component: T) {
    const WrappedComponent: React.FC<ComponentProps<T>> = (props) => {
        const router = useRouter();
        const { userSession } = useAuthContext();

        useEffect(() => {
            if (userSession) updateQuery({ view: Views.NULL });
        }, [userSession]);

        // If session exists, display the wrapped component
        return <Component {...props} />;
    };

    return WrappedComponent;
    1;
}
