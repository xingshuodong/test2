"use client"

import EmailLogin from "@/app/login/EmailLogin";
import GoogleLogin from "@/components/GoogleLogin";
import { CenteredGrid, GoogleBox, PaperStyle } from "@/styles/AuthStyles";
import { Avatar, Chip, Divider, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";



const LoginPage = () => {

  const search = useSearchParams();
  const from = search.get("redirectUrl") || "/";

  return (
    <div>
      <Grid>
        <PaperStyle elevation={10}>
          <CenteredGrid>
            <h2>Login to FairSite</h2>
            <EmailLogin />
            <Divider>
              <Chip label="OR" />
            </Divider>
            <GoogleBox>
              <h4>Login using Google</h4>
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

export default LoginPage;