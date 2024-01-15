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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Checkbox from '@mui/material/Checkbox';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import PropertyFiles from './PropertyFiles';
import MapModal from './MapModal';
import NewLocationModal from './NewLocationModal';
import { useDispatch, useSelector } from "react-redux";
import PropertyService from './../../services/PropertyService';
// ============================|| FIREBASE - REGISTER ||============================ //

const PropertyForm = () => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [files, setFormFiles] = React.useState([]);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const { positionDetails } = useSelector((state) => state.property);
   
 
    const handleOpen = () => setOpen(true);
    

    useEffect(() => {
        debugger;
        var data = positionDetails;
    }, [positionDetails]);

    return (
        <>
            <Formik
                initialValues={{
                    Bathrooms: 1,
                    termcondition:false,
                    submit: null
                    
                }}
               
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        
                        const formData = new FormData();
                        for (var key in values) {
                            formData.append(key, values[key]);
                        }

                        for (let i = 0; i < files.length; i++) {
                            let image = files[i];
                            formData.append('formFiles', image);
                        }
                        
                        
                        debugger;
                        const result = await PropertyService.SaveProperty(formData);
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
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, setSubmitting , touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstname-signup">Location*</InputLabel>
                                    <TextField
                                        label=""
                                        value={positionDetails.LocationName}
                                        name="LocationName"
                                        onMouseDown={handleOpen}
                                        onChange={handleChange}
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
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={`${values.Parking}`}
                                        exclusive
                                        onChange={handleChange}
                                        aria-label="Platform"
                                        name="Parking"
                                    >
                                        <ToggleButton size="small" name="Parking" color="info" value="1">Car</ToggleButton>
                                        <ToggleButton size="small" name="Parking" color="success" value="2">Bike</ToggleButton>
                                    </ToggleButtonGroup>
                                </Stack>
                               
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <Stack spacing={1} direction="row">
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={`${values.IsFurnished}`}
                                        exclusive
                                        onChange={handleChange}
                                        aria-label="Platform"
                                        name="IsFurnished"
                                    >
                                        <ToggleButton size="small" name="IsFurnished" color="info" value="1">Furnished</ToggleButton>
                                        <ToggleButton size="small" name="IsFurnished" color="success" value="2">Semi-Furnished</ToggleButton>
                                        <ToggleButton size="small" name="IsFurnished" color="secondary" value="3">Non-Furnished</ToggleButton>
                                    </ToggleButtonGroup>
                                  
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
                                    <PropertyFiles setFormFiles={setFormFiles }></PropertyFiles>
                                </Stack>

                            </Grid>
                           
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    <Checkbox name="termcondition" onChange={handleChange}  size="small" /> By Publishing, you agree to our &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#" color="action.main">
                                        Terms of Service
                                    </Link>
                                    &nbsp; and &nbsp;
                                    <Link variant="subtitle2" color="action.main"  component={RouterLink} to="#">
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
                                    <Button disabled={!values.termcondition} fullWidth size="large" type="submit" variant="contained" sx={{bgcolor:"action.main"} }>
                                        Publish 
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">Need help?</Typography>
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


