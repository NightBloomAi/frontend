import toast from "react-hot-toast";
import { Typography, Button, useMediaQuery, TextField } from "@mui/material";
import { useThemeContext } from "@/context/theme.context";
import { API_CLIENT } from "@/services/ApiClient";
import { useMutation } from "react-query";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";

const ForgotPassword = () => {
    const { theme } = useThemeContext();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [form, setForm] = useState<{
        email: string;
    }>({
        email: "",
    });

    const forgotPasswordMutation = useMutation({
        mutationKey: "forgotPassword",
        mutationFn: async () => {
            return await API_CLIENT.forgotPassword({
                email: form.email,
            });
        },
        onSuccess: () => {
            toast.success("A password reset email has been sent!");
        },
        onError: () => {
            toast.error("Failed to reset password!");
        },
    });

    /**
     * Handles the change of a field in the form.
     */
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
                    textAlign={"center"}
                    fontFamily={"MuseoModerno"}
                >
                    Forgot Password
                </Typography>

                <TextField
                    variant="outlined"
                    type="text"
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

                {/* SUBMIT BUTTOM */}
                <Button
                    variant="outlined"
                    onClick={() => forgotPasswordMutation?.mutate()}
                    sx={{
                        width: fullScreen ? 300 : 360,
                    }}
                >
                    Send Email
                </Button>
            </Stack>
        </Box>
    );
};

export default ForgotPassword;
