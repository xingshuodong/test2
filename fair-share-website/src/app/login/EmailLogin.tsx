import useAuth from "@/hooks/useAuth";
import { Box, Button, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

interface IFormInput {
  email: string;
  password: any;
}


const EmailLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const { signIn } = useAuth();

  const search = useSearchParams();
  const from = search.get("redirectUrl") || "/";
  const { replace, refresh } = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const { email, password } = data;
    const toastId = toast.loading("Loading...");
    try {
        // calling firebase authentication method to sign in
      await signIn(email, password);
      // redirecting after successful login
      startTransition(() => {
        refresh();
        replace(from);
        toast.dismiss(toastId);
        toast.success("User signed in successfully");
      });
    } catch (error:any) {
      // handle auth error
      toast.dismiss(toastId);
      toast.error(error.message || "User not signed in");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          type="email"
          label="Email"
          placeholder="Enter email"
          variant="standard"
          fullWidth
          // required
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
          // required
          id="password"
          autoComplete="new-password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && (
          <span>
            Please enter a password.
          </span>
        )}
        <Box sx={{ marginTop: '20px', cursor: 'pointer' }}>
          <Link href="#">
            Forgot password?
          </Link>
        </Box>
      </Box>
      <Box sx={{ marginTop: '20px', cursor: 'pointer' }}>
        <Button variant="contained" fullWidth type="submit">
          Login
        </Button>
      </Box>
      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        Don&apos;t have an account? {" "}
        <Link href="/signup">
           Signup
        </Link>
      </Box>
    </form>
  );
};

export default EmailLogin;