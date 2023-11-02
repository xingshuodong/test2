"use client"

import useAuth from '@/hooks/useAuth'
import { AppBar, Button, styled, Toolbar, Typography } from '@mui/material'
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