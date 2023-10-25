"use client"

import EmailLogin from "@/components/EmailLogin";
import GoogleLogin from "@/components/GoogleLogin";
import { Avatar, Grid, Paper, styled } from "@mui/material";
import { useSearchParams } from "next/navigation";



const LoginPage = () => {

  const search = useSearchParams();
  const from = search.get("redirectUrl") || "/";

  const PaperStyle = styled(Paper)({
    padding: "20px",
    height: "50vh",
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


  return (
    <div>
      <Grid>
        <PaperStyle elevation={10}>
          <CenteredGrid>
            <h2>Login using Google</h2>
            <Avatar sx={{ cursor: 'pointer' }}>
              <GoogleLogin from={from} />
            </Avatar>
            <EmailLogin/>
          </CenteredGrid>
        </PaperStyle>
      </Grid>

    </div>
  );
};

export default LoginPage;