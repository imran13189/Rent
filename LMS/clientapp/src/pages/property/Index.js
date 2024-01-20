// material-ui
import { useState } from 'react';
import {
    Grid, Stack, Typography, Alert,
    AlertTitle } from '@mui/material';

// project import
import PropertyForm from './PropertyAd';
import AuthWrapper from './AuthWrapper';

// ================================|| REGISTER ||================================ //

const Register = () => { 
  const [showMessage, setShowMessage] = useState(false);
  return (  <AuthWrapper>
      <Grid className={`${showMessage ? 'hide' : 'show'}`} container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Property</Typography>
                    <Typography variant="body1" sx={{ textDecoration: 'none', color:"action.main" }} color="primary">
                        Fill your property details
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
              <PropertyForm setShowMessage={setShowMessage } />
            </Grid>
      </Grid>
      <Stack className={`${showMessage ? 'show' : 'hide'}`} sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              Your Ad successfully posted!
          </Alert>
      </Stack>
    </AuthWrapper>
);

}

export default Register;
