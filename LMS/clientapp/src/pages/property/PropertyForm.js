import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
// material-ui
import {
  
    Select,
    MenuItem,
    TextField,
    ButtonGroup,
    Button,
    Divider,
   
    FormHelperText,
    Grid,
    Link,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import

import AnimateButton from 'components/@extended/AnimateButton';
//import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import PropertyFiles from './PropertyFiles';
import MapModal from './MapModal';
import NewLocationModal from './NewLocationModal';
import { useDispatch, useSelector } from "react-redux";
// ============================|| FIREBASE - REGISTER ||============================ //

const PropertyForm = () => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = () => {
        //const temp = strengthIndicator(value);
        //setLevel(strengthColor(temp));
    };

    const { positionDetails } = useSelector((state) => state.property);
   

 
    const handleOpen = () => setOpen(true);
    

    useEffect(() => {
        debugger;
        changePassword('');
    }, [positionDetails]);

    return (
        <>
            <Formik
                initialValues={{
                    Bathrooms:1,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    LocationName: Yup.string().max(255).required('Location name is required'),
                    PropertyType: Yup.string().max(255).required('Last Name is required'),
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">Location*</InputLabel>
                                    <TextField
                                        label=""
                                        value={positionDetails.LocationName}
                                        name="LocationName"
                                        InputProps={{
                                            type: 'search',
                                            endAdornment: (
                                                <InputAdornment position="end" >
                                                    <LocationOnOutlined
                                                        aria-label="toggle password visibility"
                                                        onClick={handleOpen}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                    </LocationOnOutlined>
                                                </InputAdornment>
                                            )
                                        }}

                                    />
                                   
                                    {touched.firstname && errors.firstname && (
                                        <FormHelperText error id="helper-text-firstname-signup">
                                            {errors.firstname}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                          
                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="company-signup">Property Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.PropertyType}
                                        label="Age"
                                        name="PropertyType"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>1 BHK</MenuItem>
                                        <MenuItem value={20}>2 BHK</MenuItem>
                                        <MenuItem value={30}>3 BHK</MenuItem>
                                    </Select>
                                    {touched.company && errors.company && (
                                        <FormHelperText error id="helper-text-company-signup">
                                            {errors.company}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Rent Amount</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="number"
                                        value={values.email}
                                        name="RentAmount"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="00.00"
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">No. of Bathrooms</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        id="Bathrooms"
                                        type="text"
                                        value={values.Bathrooms}
                                        name="Bathrooms"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        startAdornment={
                                            <InputAdornment position="end">
                                                <RemoveOutlinedIcon
                                                    aria-label="toggle password visibility"
                                                    onClick={() => { parseInt(values.Bathrooms)>=1?setFieldValue("Bathrooms", parseInt(values.Bathrooms) -1):0; }}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </RemoveOutlinedIcon>
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <AddOutlinedIcon
                                                    aria-label="toggle password visibility"
                                                    onClick={() => { setFieldValue("Bathrooms", parseInt(values.Bathrooms)+1); } }
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                </AddOutlinedIcon>
                                            </InputAdornment>
                                        }
                                        placeholder="0"
                                        inputProps={{}}
                                    />
                                    {touched.Bathrooms && errors.Bathrooms && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                               
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Stack spacing={1} >
                                    <InputLabel htmlFor="email-signup">Parking</InputLabel>
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button>Car</Button>
                                        <Button>Bike</Button>
                                    </ButtonGroup>
                                   
                                </Stack>
                               
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Stack spacing={1} direction="row">
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button>Furnished</Button>
                                        <Button>Semi-Furnished</Button>
                                        <Button>Non-Furnished</Button>
                                    </ButtonGroup>
                                    {touched.Bathrooms && errors.Bathrooms && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                               
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">Description</InputLabel>
                                    <TextField
                                        id="outlined-textarea"
                                        label=""
                                        placeholder=""
                                        multiline
                                    />
                                    {touched.Bathrooms && errors.Bathrooms && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>

                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Stack spacing={1} direction="row">
                                    <PropertyFiles></PropertyFiles>
                                </Stack>

                            </Grid>
                           
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    By Signing up, you agree to our &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        Terms of Service
                                    </Link>
                                    &nbsp; and &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        Privacy Policy
                                    </Link>
                                </Typography>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                        Create Account
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">Sign up with</Typography>
                                </Divider>
                            </Grid>
                            
                        </Grid>
                    </form>
                )}
            </Formik>
            <MapModal open={open} setOpen={setOpen}></MapModal>
            <NewLocationModal></NewLocationModal>
        </>
    );
};

export default PropertyForm;


