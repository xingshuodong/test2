import useAuth from '@/hooks/useAuth';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { startTransition } from 'react'
import toast from 'react-hot-toast';

type LogoutProps = {
    
};

const Logout:React.FC<LogoutProps> = () => {
    const { logout } = useAuth();
    const { refresh } = useRouter();

    const handleLogout = async () => {
        const toastId = toast.loading("Loading...");
        try {
          await logout();
          toast.dismiss(toastId);
          toast.success("Successfully logout!");
          startTransition(() => {
            refresh();
          });
        } catch (error) {
          toast.error("Successfully not logout!");
          toast.dismiss(toastId);
        }
      };
    
    return <div>
        <Button onClick={handleLogout} variant="contained" color='primary'>Logout</Button> 
    </div>
}
export default Logout;