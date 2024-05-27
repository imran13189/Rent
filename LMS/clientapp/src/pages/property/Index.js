// material-ui
import { useState } from 'react';
import {
    Grid, Stack, Typography, Alert,
    AlertTitle ,Button} from '@mui/material';

// project import
import PropertyForm from './PropertyAd';
import AuthWrapper from './AuthWrapper';
import { Link, useNavigate } from 'react-router-dom';
// ================================|| REGISTER ||================================ //

const Register = () => { 
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();
    return (<AuthWrapper>
        <Grid className={`${showMessage ? 'hide' : 'show'}`} container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Property</Typography>
                    <Typography variant="body1" sx={{ textDecoration: 'none', color: "action.main" }} color="primary">
                        Fill your property details
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <PropertyForm setShowMessage={setShowMessage} />
            </Grid>
        </Grid>
        <Grid className={`${showMessage ? 'show' : 'hide'}`} container spacing={3}>
            <Grid item xs={12}>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Your Ad successfully posted!
                    </Alert>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack className={`${showMessage ? 'show' : 'hide'}`} sx={{ width: '100%' }} spacing={2}>
                    <Button
                        onClick={() => navigate(0) }
                        variant="contained"
                        title="Post new Ad"
                        sx={{ color: 'common.white', bgcolor: 'action.main' }}

                    >

                        Post&nbsp;Ad
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    </AuthWrapper>
    );

}

export default Register;
