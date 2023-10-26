import useAuth from "@/hooks/useAuth";
import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

interface IFormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const EmailSignup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<IFormInput>();

    const { createUser } = useAuth();
    const search = useSearchParams();
    const from = search.get("redirectUrl") || "/";
    const { replace, refresh } = useRouter();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        const { email, password } = data;
        const toastId = toast.loading("Loading...");
        try {
            // calling firebase authentication method to create a user
            await createUser(email, password);

            // navigating to the desired page
            startTransition(() => {
                refresh();
                replace(from);
                toast.dismiss(toastId);
                toast.success("User Account Created successfully");
            });
        } catch (error : any) {
            // Handle auth error
            toast.dismiss(toastId);
            toast.error(error.message || "User not signed in");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ marginTop: '10px' }}>
                <TextField
                    type="text"
                    label="Name"
                    placeholder="Name"
                    variant="standard"
                    fullWidth
                    id="name"
                    autoComplete="name"
                    {...register("name", { required: true })}
                />
                {errors.name && (
                    <span className="text-red-500 text-base mt-1">
                        Please enter your name.
                    </span>
                )}
            </Box>
            <Box sx={{ marginTop: '10px' }}>
                <TextField
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    variant="standard"
                    fullWidth
                    id="email"
                    autoComplete="email"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
                            message: 'Please enter a valid email address',
                        },
                    })}
                />
                {errors.email && (
                    <span>
                        {errors.email.message}
                    </span>
                )}
            </Box>
            <Box sx={{ marginTop: '10px' }}>
                <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    variant="standard"
                    fullWidth
                    id="password"
                    autoComplete="new-password"
                    {...register("password", { required: true, minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                />
                {errors.password && (
                    <span>
                        {errors.password.message}
                    </span>
                )}
            </Box>
            <Box sx={{ marginTop: '10px' }}>
                <TextField
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    variant="standard"
                    fullWidth
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                        required: true,
                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                        validate: (value) =>
                            value === getValues("password") || "The passwords do not match.",
                    })}
                />
                {errors.confirmPassword && (
                    <span>
                        {errors.confirmPassword.message || "Please confirm your password."}
                    </span>
                )}
            </Box>
            <Box sx={{ marginTop: '20px' }}>
                <Button variant="contained" fullWidth type="submit">
                    Sign Up
                </Button>
            </Box>
            <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                Already have an account? <br />
                <Link href="/login">
                    Login
                </Link>
            </Box>
        </form>
    );
};

export default EmailSignup;
