"use client"

import useAuth from '@/hooks/useAuth'

// Material UI
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Link from 'next/link'
import React from 'react'
import Logout from './Logout'

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
})


const Navbar = () => {
    const { user } = useAuth();
    // console.log(user)
    
    const { uid } = user || {};

    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Typography variant='h6'>Fair Site</Typography>
                
                {
                    uid ? <Logout/> : <Link href="/login"><Button variant="contained" color='secondary'>Login</Button></Link>
                }
            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar