// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import PropertyForm from './PropertyForm';
import AuthWrapper from './AuthWrapper';

// ================================|| REGISTER ||================================ //

const Register = () => (
    <AuthWrapper>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Property</Typography>
                    <Typography variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                        Fill your property details
                    </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <PropertyForm />
            </Grid>
        </Grid>
    </AuthWrapper>
);

export default Register;
