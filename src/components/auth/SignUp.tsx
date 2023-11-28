import { useThemeContext } from "@/context/theme.context";
import {
    Typography,
    Button,
    Divider,
    TextField,
    Link,
    useMediaQuery,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { updateQuery } from "@/utils/helperFunctions";
import { Views } from "@/models/view.models";
import { useAuthContext } from "@/context/auth.context";
import { useRouter } from "next/router";

const SignUp = () => {
    const router = useRouter();
    const { theme } = useThemeContext();
    const { signInWithGoogleMutation, signUpMutation } = useAuthContext();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [form, setForm] = useState<{
        email: string;
        password: string;
    }>({
        email: "",
        password: "",
    });

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                height: "100%",
            }}
        >
            <Stack
                sx={{
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
                    Sign Up
                </Typography>

                {/* GOOGLE SIGN UP */}
                <Button
                    variant="outlined"
                    onClick={async () => {
                        await signInWithGoogleMutation?.mutate();
                    }}
                    sx={{
                        width: fullScreen ? 300 : 360,
                    }}
                >
                    <GoogleIcon sx={{ mr: 2 }} /> Sign up with Google
                </Button>

                {/* DIVIDER */}
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        width: fullScreen ? 300 : 360,
                    }}
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
                    sx={{
                        width: fullScreen ? 300 : 360,
                        gap: 3,
                    }}
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

                    {/* SIGN UP BUTTON */}
                    <Button
                        variant="outlined"
                        onClick={() => {
                            signUpMutation?.mutate(form);
                        }}
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
                        {"By signing up, you agree to our "}
                        <Link
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                router.push("/terms-of-service");
                            }}
                        >
                            Terms of Service
                        </Link>
                        {" and "}
                        <Link
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                router.push("/privacy-policy");
                            }}
                        >
                            Privacy Policy
                        </Link>
                    </Typography>

                    {/* ALREADY HAVE AN ACCOUNT */}
                    <Typography
                        component={"div"}
                        variant="body1"
                        sx={{ mx: 2 }}
                        textAlign={"center"}
                    >
                        {"Already have an account? "}
                        <Link
                            onClick={() => {
                                updateQuery({ view: Views.SIGN_IN });
                            }}
                            sx={{
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default SignUp;
