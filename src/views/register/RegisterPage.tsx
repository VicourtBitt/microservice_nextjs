"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    TextField,
    Button,
    Typography,
    Box,
    Grid
} from "@mui/material"
import { useTheme } from "@/theme/ThemeProvider"
import { registerFormSchema, RegisterFormSchema } from "@/lib/validation/registerForm"


export default function RegisterPage() {
    const { themeMode } = useTheme()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
    })

    const onSubmit = async (data: RegisterFormSchema) => {
        const { username, phone, email, preferred_attendant } = data

        const response = await fetch(`${process.env.FETCH_URL}client/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                client_name: username,
                client_phone: phone,
                client_email: email,
                client_attendant_id: preferred_attendant,
            }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error("Error:", errorData)
            return
        }
        const responseData = await response.json()
        console.log("Success:", responseData)
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: "100%" }}>
            <Grid size={{ xs: 12, sm: 8, md: 6, lg: 4 }}>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 1,
                        backgroundColor: themeMode === 'dark' ? 'background.paper' : '#fff',
                        color: themeMode === 'dark' ? 'text.primary' : 'inherit',
                    }}
                >
                    <Typography variant="h4" align="center">
                        Register into MDAN
                    </Typography>
                    <TextField
                        label="Username"
                        {...register("username")}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        label="Phone"
                        {...register("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="Preferred Attendant"
                        {...register("preferred_attendant")}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        {...register("confirmPassword")}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}