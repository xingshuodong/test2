"use client"

import useAuth from '@/hooks/useAuth'
import { AccountCircle, Menu } from '@mui/icons-material'
import { AppBar, Button, styled, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
})

interface User {
    uid: string;
}


const Navbar = () => {
    // const [user, setUser] = useState<any | null>("Suez")
    const { user } = useAuth();
    console.log(user)

    const { uid } = user || {};


    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Typography variant='h6'>Fair Site</Typography>
                {/* <Menu sx={{display:{xs:"block", sm:"none"}}}/>
                <AccountCircle sx={{display:{xs:"none", sm:"block"}}}/> */}
                {
                    uid ? <Button variant="contained" color='primary'>Logout</Button> : <Link href="/login"><Button variant="contained" color='secondary'>Login</Button></Link>
                }
            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar