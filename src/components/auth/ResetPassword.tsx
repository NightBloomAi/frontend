import React, { useState } from "react";
import toast from "react-hot-toast";
import { useThemeContext } from "@/context/theme.context";
import { Button, TextField, Typography, useMediaQuery } from "@mui/material";
import { API_CLIENT } from "@/services/ApiClient";
import { useMutation } from "react-query";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/router";

const ResetPassword = () => {
    const router = useRouter();
    const code = router.query.code;
    const { theme } = useThemeContext();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [form, setForm] = useState<{
        password: string;
        rePassword: string;
    }>({
        password: "",
        rePassword: "",
    });

    /**
     * Mutation to reset the user's password.
     */
    const resetPasswordMutation = useMutation({
        mutationKey: "resetPassword",
        mutationFn: async () => {
            if (form.password !== form.rePassword) {
                toast.error("Passwords do not match!");
                throw new Error("Passwords do not match!");
            }
            return await API_CLIENT.resetPassword({
                password: form.password,
                otp: code?.toString() ?? "",
            });
        },
        onSuccess: () => {
            toast.success("Password reset successfully!");
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
                    className="font-museo"
                    textAlign={"center"}
                >
                    Reset Password
                </Typography>

                <TextField
                    variant="outlined"
                    type="password"
                    placeholder="New Password"
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

                <TextField
                    variant="outlined"
                    type="password"
                    placeholder="Re-enter New Password"
                    sx={{
                        width: fullScreen ? 300 : 360,
                        ".MuiOutlinedInput-root": {
                            overflow: "hidden",
                            borderRadius: 120,
                            paddingLeft: 2,
                        },
                    }}
                    name="rePassword"
                    value={form.rePassword}
                    onChange={handleFieldChange}
                />

                {/* SUBMIT BUTTOM */}
                <Button
                    variant="outlined"
                    onClick={() => resetPasswordMutation?.mutate()}
                    sx={{
                        width: fullScreen ? 300 : 360,
                    }}
                >
                    Continue
                </Button>
            </Stack>
        </Box>
    );
};

export default ResetPassword;
