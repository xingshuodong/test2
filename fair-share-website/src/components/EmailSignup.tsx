import useAuth from "@/hooks/useAuth";
import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

interface IFormInput {
    name: string,
    email: string;
    password: string;
    confirmPassword: string,
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
        const { name, email, password } = data;
        const toastId = toast.loading("Loading...");
        try {
            await createUser(email, password);
            startTransition(() => {
                refresh();
                replace(from);
                toast.dismiss(toastId);
                toast.success("User Account Created successfully");
            });
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.message || "User not signed in");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <Box>
                <TextField
                    type="text"
                    label="Name"
                    placeholder="name"
                    variant="standard"
                    fullWidth
                    id="name"
                    {...register("name", { required: true })}
                />
                {errors.name && (
                    <span className="text-red-500 text-base mt-1">
                        Please enter your name.
                    </span>
                )}
            </Box>
            <Box>
                <TextField
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                    variant="standard"
                    fullWidth
                    required
                    id="email"
                    autoComplete="email"
                    {...register("email", {
                        required: true,
                        pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
                    })}
                />
                {errors.email && (
                    <span>
                        Please enter a valid email address.
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
                    required
                    id="password"
                    autoComplete="new-password"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password && (
                    <span>
                        Please enter a password.
                    </span>
                )}
            </Box>
            <Box className="form-control">
                <TextField
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    variant="standard"
                    fullWidth
                    required
                    autoComplete="new-password"
                    {...register("confirmPassword", {
                        required: true,
                        minLength: 6,
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
            <Box sx={{ marginTop: '20px' }}>
                Already have an account?
                <Link className="text-blue-500 underline ml-1" href="/login">
                    Login
                </Link>
            </Box>
        </form>
    );
};

export default EmailSignup;