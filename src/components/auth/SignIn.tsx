import { useThemeContext } from "@/context/theme.context";
import {
    Button,
    Divider,
    Link,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { updateQuery } from "@/utils/helperFunctions";
import { Views } from "@/models/view.models";
import { useAuthContext } from "@/context/auth.context";

const devEmail = process.env.NEXT_PUBLIC_DEV_EMAIL;
const devPassword = process.env.NEXT_PUBLIC_DEV_PASSWORD;

const SignIn = () => {
    const { theme } = useThemeContext();
    const { signInMutation, signInWithGoogleMutation } = useAuthContext();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [form, setForm] = useState<{
        email: string;
        password: string;
    }>({
        email: devEmail ?? "",
        password: devPassword ?? "",
    });

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Stack
            sx={{
                backgroundColor: theme.palette.background.default,
                height: "100%",
                p: 4,
            }}
            justifyContent={"center"}
            alignItems={"center"}
            gap={4}
        >
            {/* TITLE */}
            <Typography
                component={"div"}
                variant="h4"
                className="font-museo"
                textAlign={"center"}
            >
                Sign In
            </Typography>

            {/* GOOGLE SIGN IN */}
            <Button
                variant="outlined"
                onClick={async () => {
                    await signInWithGoogleMutation?.mutate();
                }}
                sx={{
                    width: fullScreen ? 300 : 360,
                }}
            >
                <GoogleIcon sx={{ mr: 2 }} /> Sign in with Google
            </Button>

            {/* DIVIDER */}
            <Stack
                direction="row"
                alignItems="center"
                sx={{ width: fullScreen ? 300 : 360 }}
            >
                <Divider sx={{ flexGrow: 1 }} />
                <Typography
                    component={"div"}
                    variant="body1"
                    sx={{ mx: 2 }}
                    textAlign={"center"}
                >
                    or continue with email
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
            </Stack>

            {/* EMAIL AND PASSWORD */}
            <Stack
                direction="column"
                alignItems="center"
                sx={{ width: fullScreen ? 300 : 360, gap: 3 }}
            >
                {/* EMAIL */}
                <TextField
                    variant="outlined"
                    type="email"
                    placeholder="Email"
                    sx={{
                        width: fullScreen ? 300 : 360,
                        ".MuiOutlinedInput-root": {
                            overflow: "hidden",
                            borderRadius: 120,
                            paddingLeft: 2,
                        },
                    }}
                    name="email"
                    value={form.email}
                    onChange={handleFieldChange}
                />

                {/* PASSWORD */}
                <TextField
                    variant="outlined"
                    type="password"
                    placeholder="Password"
                    sx={{
                        width: fullScreen ? 300 : 360,
                        ".MuiOutlinedInput-root": {
                            overflow: "hidden",
                            borderRadius: 120,
                            paddingLeft: 2,
                        },
                    }}
                    name="password"
                    value={form.password}
                    onChange={handleFieldChange}
                />

                {/* SIGN IN BUTTON */}
                <Button
                    variant="outlined"
                    onClick={() => signInMutation?.mutate(form)}
                    sx={{
                        width: fullScreen ? 300 : 360,
                    }}
                >
                    Continue
                </Button>

                {/* SIGN UP */}
                <Typography
                    component={"div"}
                    variant="body1"
                    sx={{ mx: 2 }}
                    textAlign={"center"}
                >
                    {"Don't have an account? "}
                    <Link
                        sx={{
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                        onClick={() => {
                            updateQuery({ view: Views.SIGN_UP });
                        }}
                    >
                        Sign up
                    </Link>
                    <br />
                    <Link
                        sx={{
                            cursor: "pointer",
                        }}
                    >
                        Forgot password?
                    </Link>
                </Typography>
            </Stack>
        </Stack>
    );
};

export default SignIn;
