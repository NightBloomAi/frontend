import React, { useEffect, ComponentType, ComponentProps } from "react";
import { useStageContext } from "@/contexts/stageContext";
import { useAuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import Loading from "../misc/loading";

/**
 * A higher-order component that wraps around a component to make it an authenticated route.
 * It checks if a user session exists, and if not, redirects the user to the login page.
 * While checking the user session, it displays a loading message.
 * Once a session is confirmed, it renders the wrapped component.
 *
 * @template T The type of the component to be wrapped.
 * @param {T} Component The component to be wrapped.
 * @return {React.FC<ComponentProps<T>>} The wrapped component.
 */
export default function authenticatedRoute<T extends ComponentType<any>>(
    Component: T
) {
    const WrappedComponent: React.FC<ComponentProps<T>> = (props) => {
        const router = useRouter();
        const { session, loading } = useAuthContext();
        const { isDevMode } = useStageContext();

        useEffect(() => {
            if (!loading && !session?.signedIn) router.push("/login");
        }, [router, loading, session, isDevMode]);

        // while checking user session, show "loading" message
        if (loading) return <Loading />;

        // If session exists, display the wrapped component
        return <Component {...props} />;
    };

    return WrappedComponent;
}
