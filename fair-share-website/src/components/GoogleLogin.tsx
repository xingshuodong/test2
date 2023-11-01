import { addUser } from "@/firebase/controller";
import useAuth from "@/hooks/useAuth";
import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import toast from "react-hot-toast";

type GoogleLoginProps = {
  from: string;
};

const GoogleLogin: React.FC<GoogleLoginProps> = ({ from }) => {
  const { googleLogin } = useAuth();
  const { replace, refresh } = useRouter();

  const handleGoogleLogin = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const { user } = await googleLogin();
      // console.log(user);
      startTransition(() => {
        refresh();
        replace(from);
        toast.dismiss(toastId);
        toast.success("User signed in successfully");
        // add new user to firestore
        addUser({
          email: user.email,
          time_created: user.metadata.creationTime
        })
      });
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message || "User not signed in");
    }
  };

  return (
    <Button variant="contained" onClick={handleGoogleLogin}>
      <Google />
    </Button>
  );
};

export default GoogleLogin;
