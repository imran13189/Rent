import { Link } from "react-router-dom";

// material-ui
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";

// project import
import AuthLogin from "./auth-forms/AuthLogin";
import AuthWrapper from "./AuthWrapper";

// ================================|| LOGIN ||================================ //

const Login = () => {


    return (
        <Grid container spacing={3}>
            <Grid item sm={ 7} md={7} lg={7}>
                <div className="login">&nbsp;</div>
            </Grid>
            
            <Grid item xs={12} sm={5} lg={5}>
                <AuthWrapper>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}  lg={12}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="baseline"
                                sx={{ mb: { xs: -0.5, sm: 0.5 } }}
                            >
                                <Typography variant="h3">Sign In / Register</Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <AuthLogin />
                        </Grid>
                    </Grid>
                </AuthWrapper>
            </Grid>
        </Grid>
    );
}

export default Login;
