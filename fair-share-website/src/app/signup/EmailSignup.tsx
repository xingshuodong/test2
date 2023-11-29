import { addUser } from "@/firebase/controller";
import useAuth from "@/hooks/useAuth";
import { EmailPasswordType } from "@/types/EmailPassword";
import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";


const EmailSignup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<EmailPasswordType>();

    const { createUser } = useAuth();
    const search = useSearchParams();
    const from = search.get("redirectUrl") || "/";
    const { replace, refresh } = useRouter();

    const onSubmit: SubmitHandler<EmailPasswordType> = async (data) => {
        // console.log(data);
        const toastId = toast.loading("Loading...");
        try {
            // calling firebase authentication method to create a user
            const { user } = await createUser(data);
            // console.log(user)

            // navigating to the desired page
            startTransition(() => {
                refresh();
                replace(from);
                toast.dismiss(toastId);
                toast.success("User Account Created successfully");
                // add new user to firestore
                addUser({
                    name: user.displayName,
                    time_created: user.metadata.creationTime,
                    userId: user.uid
                })
            });
        } catch (error: any) {
            // Handle auth error
            toast.dismiss(toastId);
            toast.error(error.message || "User not signed in");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* name field */}
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
                {/* name error */}
                {errors.name && (
                    <Box sx={{ color: 'red', fontSize: '12px' }}>
                        Please enter your name.
                    </Box>
                )}
            </Box>
            {/* email field */}
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
                {/* email error */}
                {errors.email && (
                    <Box sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.email.message || "Email is required"}
                    </Box>
                )}
            </Box>
            {/* password field */}
            <Box sx={{ marginTop: '10px' }}>
                <TextField
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    variant="standard"
                    fullWidth
                    id="password"
                    autoComplete="new-password"
                    {...register("password", {
                        required: true,
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                        pattern: {
                            // value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                            // Updated the regex pattern below
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[(),\-_@$!%*#?&])[A-Za-z\d(),\-_@$!%*#?&]{6,}$/,
                            message: 'Password must minimum six characters, at least one letter, one number and one special character',
                        }
                    })}
                />
                {/* password error */}
                {errors.password && (
                    <Box sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.password.message || "Password is required"}
                    </Box>
                )}
            </Box>
            {/* confirm password field */}
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
                {/* confirm password error */}
                {errors.confirmPassword && (
                    <Box sx={{ color: 'red', fontSize: '12px' }}>
                        {errors.confirmPassword.message || "Please confirm your password."}
                    </Box>
                )}
            </Box>
            {/* signup button */}
            <Box sx={{ marginTop: '20px' }}>
                <Button variant="contained" fullWidth type="submit">
                    Sign Up
                </Button>
            </Box>
            {/* navigating to login */}
            <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                Already have an account? {" "}
                <Link href="/login">
                    Login
                </Link>
            </Box>
        </form>
    );
};

export default EmailSignup;
