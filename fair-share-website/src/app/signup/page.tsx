"use client"

import EmailSignup from "@/app/signup/EmailSignup";
import GoogleLogin from "@/components/GoogleLogin";
import { Avatar, Box, Chip, Divider, Grid, Paper, styled } from "@mui/material";
import { useSearchParams } from "next/navigation";



const SignupPage = () => {

  const search = useSearchParams();
  const from = search.get("redirectUrl") || "/";

  const PaperStyle = styled(Paper)({
    padding: "20px",
    width: '280px',
    margin: '20px auto',

  });

  const CenteredGrid = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px'

  });

  const GoogleBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  })



  return (
    <div>
      <Grid>
        <PaperStyle elevation={10}>
          <CenteredGrid>
            <h2>Sign Up to FairSite</h2>
            <EmailSignup/>
            <Divider>
              <Chip label="OR" />
            </Divider>
            <GoogleBox>
              <h4>Sign Up using Google</h4>
              <Avatar sx={{ cursor: 'pointer', margin: '0 auto' }}>
                <GoogleLogin from={from} />
              </Avatar>
            </GoogleBox>
          </CenteredGrid>
        </PaperStyle>
      </Grid>

    </div>
  );
};

export default SignupPage;