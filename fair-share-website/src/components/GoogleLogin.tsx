import useAuth from "@/hooks/useAuth";
import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import toast from "react-hot-toast";


const GoogleLogin = ({ from }) => {
    const { googleLogin } = useAuth();
    const { replace, refresh } = useRouter();

    const handleGoogleLogin = async () => {
        const toastId = toast.loading("Loading...");
        try {
            const { user } = await googleLogin();
            startTransition(() => {
                refresh();
                replace(from);
                toast.dismiss(toastId);
                toast.success("User signed in successfully");
            });
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.message || "User not signed in");
        }
    };

    return (

        <Button variant="contained" color='secondary' onClick={handleGoogleLogin}>
            <Google className="text-3xl mr-3" />
            Continue with google
        </Button>
    );
};

export default GoogleLogin;