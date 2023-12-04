import LogoAndSlogan from "@/components/home/LogoAndSlogan";
import Layout from "@/components/layouts/Layout";
import TopLoadingBar from "@/components/utils/TopLoadingBar";
import { useAuthContext } from "@/context/auth.context";
import { Views } from "@/models/view.models";
import { updateQuery } from "@/utils/helperFunctions";
import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

const Verified = () => {
    const router = useRouter();
    const { userSession, isLoading } = useAuthContext();

    useLayoutEffect(() => {
        if (userSession !== null && !isLoading) {
            router.push("/");
        }
    }, [isLoading, router, userSession]);

    return (
        <Layout>
            {isLoading && <TopLoadingBar />}
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                direction={"column"}
            >
                <LogoAndSlogan
                    title={"Email Verified"}
                    subtitle={
                        "Thank you for verifying your email! You can now sign into your new account"
                    }
                />
                <Button
                    variant="outlined"
                    sx={{
                        px: 4,
                    }}
                    onClick={() => {
                        router.push("/");
                        updateQuery({ view: Views.SIGN_IN });
                    }}
                >
                    Sign In
                </Button>
            </Stack>
        </Layout>
    );
};

export default Verified;
