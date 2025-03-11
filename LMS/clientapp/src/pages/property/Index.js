// material-ui
import { useState, useEffect } from 'react';
import { Grid, Stack, Typography, Alert, AlertTitle, Button } from '@mui/material';

// project import
import PropertyForm from './PropertyAd';
import AuthWrapper from './AuthWrapper';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from './../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPosition, fetchProperties, setUserProperty } from './../../store/reducers/property';
import UnauthorizedPage from './../components-overview/UnauthorizedPage';
// ================================|| REGISTER ||================================ //

const Register = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [isAuthorized, setAuthorize] = useState(false);
    const [showUnAuthorized, setUnAuthorized] = useState(false);
    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.users);

    useEffect(() => {
        if (userDetails) {
            if (params.id) {
                
                const fetchData = async () => {
                    const property = await UserService.getProperty(params.id);
                    if (userDetails?.userId == property?.userId) {
                        
                        dispatch(setUserProperty({ userProperty: property }));


                        dispatch(setSelectedPosition({ positionDetails: { lat: property.lat, lng: property.long, LocationName: property.locationName, LocationId: property.locationId } }));

                        dispatch(
                            fetchProperties({
                                page: 0,
                                LocationId: property?.locationId,
                                LocationName: null,
                                Long: property.long,
                                Lat: property.lat
                            })
                        );
                        setAuthorize(true);
                        setUnAuthorized(false);
                    }
                    else {
                        setAuthorize(false);
                        setUnAuthorized(true);
                    }
                };
                fetchData();
            }
            else {
                setAuthorize(true);
                setUnAuthorized(false);
            }

        }


    }, [userDetails]);

        return (<>{isAuthorized &&
                     <AuthWrapper>
                <Grid className={`${showMessage ? 'hide' : 'show'}`} container spacing={3}>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                            <Typography variant="h3">Property</Typography>
                            <Typography variant="body1" sx={{ textDecoration: 'none', color: 'action.main' }} color="primary">
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
                                onClick={() => navigate(0)}
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
             }
            {showUnAuthorized && <UnauthorizedPage></UnauthorizedPage>}
        </>
        )
   
          

};

export default Register;
