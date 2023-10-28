"use client"

import useAuth from '@/hooks/useAuth'
import { AppBar, Button, styled, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { startTransition, useState } from 'react'
import toast from 'react-hot-toast'

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
})


const Navbar = () => {
    // const [user, setUser] = useState<any | null>("Suez")
    const { user, logout } = useAuth();
    const { refresh } = useRouter();
    // console.log(user)

    const { uid } = user || {};

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
    
    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Typography variant='h6'>Fair Site</Typography>
                {/* <Menu sx={{display:{xs:"block", sm:"none"}}}/>
                <AccountCircle sx={{display:{xs:"none", sm:"block"}}}/> */}
                {
                    uid ? <Button onClick={handleLogout} variant="contained" color='primary'>Logout</Button> : <Link href="/login"><Button variant="contained" color='secondary'>Login</Button></Link>
                }
            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar