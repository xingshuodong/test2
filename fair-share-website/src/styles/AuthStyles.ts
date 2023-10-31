import { Box, Grid, Paper, styled } from "@mui/material";

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

export {PaperStyle, CenteredGrid, GoogleBox}