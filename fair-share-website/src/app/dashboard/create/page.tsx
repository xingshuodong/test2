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

    const onSubmit: SubmitHandler<AddCompanyType> = async (data) => {
        // console.log(data);
        const toastId = toast.loading("Loading...");
        try {
            // importing addCompany function to add new Company data to firestore
            addCompany(data)
            toast.dismiss(toastId);
            toast.success("Company created successfully");
            // redirecting to dashboard page after successful creation
            router.push('/dashboard')


        } catch (error: any) {
            // Handle error
            toast.dismiss(toastId);
            toast.error(error.message || "User not signed in");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}><h2>Create A New Company</h2></Box>
            {/* add a new company form */}
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

                {/* Company create button */}
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