"use client"

import { addCompany } from '@/firebase/controller';
import { AddCompanyType } from '@/types/AddCompany';
import { Box, Button, Container, Grid, Paper, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type pageProps = {

};



const CreateCompanyPage: React.FC<pageProps> = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddCompanyType>();

    const router = useRouter();

    const onSubmit: SubmitHandler<AddCompanyType> = async (data ) => {
        // console.log(data);
        const toastId = toast.loading("Loading...");
        try {
            addCompany(data)
            router.push('/dashboard')
            toast.dismiss(toastId);
            toast.success("Company created successfully");


        } catch (error: any) {
            // Handle auth error
            toast.dismiss(toastId);
            toast.error(error.message || "User not signed in");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{textAlign: 'center', mt: 4, mb: 4 }}><h2>Create A New Company</h2></Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ marginTop: '10px' }}>
                    <TextField
                        type="text"
                        label="Name"
                        placeholder="Name"
                        variant="outlined"
                        fullWidth
                        id="name"
                        autoComplete="name"
                        {...register("name", { required: true })}
                    />
                    {/* name error */}
                    {errors.name && (
                        <Box sx={{ color: 'red', fontSize: '12px' }}>
                            Please enter your company name.
                        </Box>
                    )}
                </Box>

                {/* login button */}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" fullWidth type="submit">
                        Create
                    </Button>
                </Box>


            </form>
        </Container>
    )
}
export default CreateCompanyPage;