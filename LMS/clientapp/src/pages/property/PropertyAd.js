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
    Autocomplete,
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
import { Formik, useFormik } from 'formik';

// project import

import AnimateButton from 'components/@extended/AnimateButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import PropertyFiles from './PropertyFiles';
import MapModal from './MapModal';
import NewLocationModal from './NewLocationModal';
import { useDispatch, useSelector } from "react-redux";
import MasterService from './../../services/MasterService'
import PropertyService from './../../services/PropertyService';
import { setSelectedPosition, setShowMapModal } from "./../../store/reducers/property";
import LoadingButton from '@mui/lab/LoadingButton';

// ============================|| FIREBASE - REGISTER ||============================ //

const PropertyAd = ({ setShowMessage }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [files, setFormFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        LocationName:"",
        Bathrooms: 1,
        termcondition: false,
        submit: null,
        AvailableFrom: dayjs(new Date()),
        PropertyTypeId:0,
        RentAmount: ""
    });
    const dispatch = useDispatch();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const { positionDetails } = useSelector((state) => state.property);
    const { userDetails } = useSelector((state) => state.users);


    const handleOpen = () => dispatch(true);

    const digitsOnly = (value) => /^\d*[.{1}\d*]\d*$/.test(value);

    const SignupSchema = Yup.object().shape({
        LocationName: Yup.string().required("Location Required"),
        PropertyTypeId: Yup.number().min(1, "Type Required"),
        RentAmount: Yup.string().required().test('inputEntry', 'The field should have digits only', digitsOnly),
        termcondition: Yup.boolean()
            .oneOf([true], 'You must accept the terms and conditions.')
            .required('You must accept the terms and conditions.')
    });

    const handleLocations = (event) => {

        setOptions([]);
        if (event.target.value.length > 2) {
            MasterService.getLocations(event).then((data) => {
                setOptions(data);
            });
        }
        else {
            setOptions([]);
        }

    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignupSchema,
        onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
               
                setLoading(true);
                const formData = new FormData();
                for (var key in values) {
                    formData.append(key, values[key]);
                }

              
                formData.append("LocationId", positionDetails.LocationId);
                formData.append("UserId", userDetails.userId);

                for (let i = 0; i < files.length; i++) {
                    let image = files[i];
                    formData.append('formFiles', image);
                }


              
                const result = await PropertyService.SaveProperty(formData);
                setStatus({ success: false });
                setSubmitting(false);
                setShowMessage(true);
            } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                setLoading(false);
            }
        },
    });

    const handleLocation = (event, value) => {

        dispatch(setSelectedPosition({ positionDetails: { lat: value.Lat, lng: value.Long, LocationName: value.LocationName, LocationId: value.LocationId } }));
    }

    useEffect(() => {
        formik.setFieldValue("LocationName",positionDetails.LocationName);
    }, [positionDetails]);



    return (
        <>
            <form noValidate onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstname-signup">Location*</InputLabel>

                            <Autocomplete
                                autoComplete
                                includeInputInList
                                freeSolo
                                disableOpenOnFocus
                                filterOptions={x => {
                                    return x;
                                }}
                                name="LocationName"
                                id="free-solo-2-demo"
                                value={formik.values.LocationName}
                                disableClearable
                                options={options}
                                onChange={handleLocation}
                                getOptionLabel={(option) => typeof option === "string" ? option : option.LocationName}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Search location"
                                        onChange={handleLocations}
                                        value={formik.values.LocationName}
                                        InputProps={{
                                            style: { padding: 5 },
                                            ...params.InputProps,
                                            type: 'search',
                                            endAdornment: (
                                                <InputAdornment position="end" >
                                                    <LocationOnOutlined
                                                        aria-label="toggle password visibility"
                                                        edge="end"
                                                        size="large"
                                                        onClick={() => dispatch(setShowMapModal({ showMapModal: true }))}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >

                                                    </LocationOnOutlined>
                                                </InputAdornment>
                                            )
                                        }}

                                    />
                                )}


                            />

                            {formik.touched.LocationName && formik.errors.LocationName && (
                                <FormHelperText error id="helper-text-firstname-signup">
                                    {formik.errors.LocationName}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="company-signup">Property Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.PropertyTypeId}
                                label="Age"
                                name="PropertyTypeId"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                displayEmpty
                            >
                                <MenuItem value={0}>
                                    <em>select</em>
                                </MenuItem>
                                <MenuItem value={10}>1 BHK</MenuItem>
                                <MenuItem value={20}>2 BHK</MenuItem>
                                <MenuItem value={30}>3 BHK</MenuItem>
                            </Select>
                            {formik.touched.PropertyTypeId && formik.errors.PropertyTypeId && (
                                <FormHelperText error id="helper-text-company-signup">
                                    {formik.errors.PropertyTypeId}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="area">Area(Sq ft)</InputLabel>
                            <OutlinedInput
                                fullWidth
                                error={Boolean(formik.touched.Area && formik.errors.Area)}
                                id="area"
                                type="number"
                                value={formik.values.Area}
                                name="Area"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="Area"
                            />
                            {formik.touched.Area && formik.errors.Area && (
                                <FormHelperText error id="helper-text-area-signup">
                                    {formik.errors.Area}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="company-signup">Available From:</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker name="AvailableFrom" onChange={(value) => {
                                    
                                    formik.setFieldValue('AvailableFrom', value.$d.toISOString());
                                }} defaultValue={dayjs(new Date())} />
                            </LocalizationProvider>
                            {formik.touched.company && formik.errors.company && (
                                <FormHelperText error id="helper-text-company-signup">
                                    {errors.company}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="rent-amount">Rent Amount</InputLabel>
                            <OutlinedInput
                                fullWidth
                                error={Boolean(formik.touched.RentAmount && formik.errors.RentAmount)}
                                id="Rent-Amount"
                                type="number"
                                value={formik.values.RentAmount}
                                name="RentAmount"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="00.00"
                            />
                            {formik.touched.RentAmount && formik.errors.RentAmount && (
                                <FormHelperText error id="helper-text-rent-amount">
                                    {formik.errors.RentAmount}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="security-amount">Security Amount</InputLabel>
                            <OutlinedInput
                                fullWidth
                                error={Boolean(formik.touched.SecurityAmount && formik.errors.SecurityAmount)}
                                id="Security-Amount"
                                type="number"
                                value={formik.values.SecurityAmount}
                                name="SecurityAmount"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                placeholder="00.00"
                            />
                            {formik.touched.SecurityAmount && formik.errors.SecurityAmount && (
                                <FormHelperText error id="helper-text-security-amountpa">
                                    {formik.errors.SecurityAmount}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>
                   

                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="password-signup">Bathrooms</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="Bathrooms"
                                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                type="text"
                                value={formik.values.Bathrooms}
                                name="Bathrooms"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                startAdornment={
                                    <InputAdornment >
                                        <RemoveOutlinedIcon
                                            aria-label="toggle password visibility"
                                            onClick={() => { parseInt(formik.values.Bathrooms) >= 1 ? formik.setFieldValue("Bathrooms", parseInt(formik.values.Bathrooms) - 1) : 0; }}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                           
                                        </RemoveOutlinedIcon>
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment >
                                        <AddOutlinedIcon
                                            aria-label="toggle password visibility"
                                            onClick={() => { formik.setFieldValue("Bathrooms", parseInt(formik.values.Bathrooms) + 1); }}
                                            onMouseDown={handleMouseDownPassword}
                                         
                                        >
                                          
                                        </AddOutlinedIcon>
                                    </InputAdornment>
                                }
                                placeholder="0"
                              
                            />
                            {formik.touched.Bathrooms && formik.errors.Bathrooms && (
                                <FormHelperText error id="helper-text-password-signup">
                                    {formik.errors.password}
                                </FormHelperText>
                            )}
                        </Stack>

                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Stack spacing={1} >
                            <InputLabel htmlFor="parking-signup">Parking</InputLabel>
                            <ToggleButtonGroup
                                color="primary"
                                value={`${formik.values.Parking}`}
                                exclusive
                                onChange={formik.handleChange}
                                aria-label="Platform"
                                name="Parking"
                            >
                                <ToggleButton size="small" name="Parking" color="info" value="1">Car</ToggleButton>
                                <ToggleButton size="small" name="Parking" color="success" value="2">Bike</ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>

                    </Grid>

                    <Grid item xs={12} lg={5}>
                        <Stack spacing={1} >
                            <InputLabel htmlFor="propertyStatus">Available for:</InputLabel>
                            <ToggleButtonGroup
                                color="primary"
                                value={`${formik.values.AvailableFor}`}
                                exclusive
                                onChange={formik.handleChange}
                                aria-label="AvailableFor"
                                name="AvailableFor"
                                Allow multiple selections
                            >
                                <ToggleButton size="small" name="AvailableFor" color="success" value="1">Only Family</ToggleButton>
                                <ToggleButton size="small" name="AvailableFor" color="info" value="2">All</ToggleButton>

                            </ToggleButtonGroup>

                            {formik.touched.AvailableFor && formik.errors.AvailableFor && (
                                <FormHelperText error id="helper-text-AvailableFor">
                                    {formik.errors.AvailableFor}
                                </FormHelperText>
                            )}
                        </Stack>

                    </Grid>

                    <Grid item xs={12} lg={10}>
                        <Stack spacing={1} >
                            <InputLabel htmlFor="propertyStatus">Property Status</InputLabel>
                            <ToggleButtonGroup
                                color="primary"
                                value={`${formik.values.IsFurnished}`}
                                exclusive
                                onChange={formik.handleChange}
                                aria-label="Platform"
                                name="IsFurnished"
                            >
                                <ToggleButton size="small" name="IsFurnished" color="success" value="1">Furnished</ToggleButton>
                                <ToggleButton size="small" name="IsFurnished" color="info" value="2">Semi-Furnished</ToggleButton>
                                <ToggleButton size="small" name="IsFurnished" color="error" value="3">Non-Furnished</ToggleButton>
                            </ToggleButtonGroup>

                            {formik.touched.Bathrooms && formik.errors.Bathrooms && (
                                <FormHelperText error id="helper-text-password-signup">
                                    {formik.errors.password}
                                </FormHelperText>
                            )}
                        </Stack>

                    </Grid>
                   
                    <Grid item xs={12} lg={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="description-signup">Description</InputLabel>
                            <TextField
                                id="outlined-textarea"
                                label=""
                                placeholder="Description"
                                name="Description"
                                onChange={formik.handleChange}
                                value={formik.values.Description}
                                multiline
                            />

                        </Stack>

                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Stack spacing={1} direction="row">
                            <PropertyFiles setFormFiles={setFormFiles}></PropertyFiles>
                        </Stack>

                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2">
                            <Checkbox  name="termcondition" onChange={formik.handleChange} size="small" /> By Publishing, you agree to our &nbsp;
                            <Link variant="subtitle2" component={RouterLink} to="#" color="action.main">
                                Terms of Service
                            </Link>
                            &nbsp; and &nbsp;
                            <Link variant="subtitle2" color="action.main" component={RouterLink} to="#">
                                Privacy Policy
                            </Link>
                        </Typography>

                        {formik.touched.termcondition && formik.errors.termcondition && (
                            <FormHelperText error id="helper-text-firstname-signup">
                                {formik.errors.termcondition}
                            </FormHelperText>
                        )}
                    </Grid>
                    {formik.errors.submit && (
                        <Grid item xs={12}>
                            <FormHelperText error>{formik.errors.submit}</FormHelperText>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <AnimateButton>
                            <LoadingButton loading={loading}  fullWidth size="large" type="submit" variant="contained" sx={{ bgcolor: "action.main" }}>
                                { loading?"disabled":"Publish"}
                            </LoadingButton>
                        </AnimateButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider>
                            <Typography variant="caption">Need help?</Typography>
                        </Divider>
                    </Grid>

                </Grid>
            </form>



            <MapModal open={open} setOpen={setOpen}></MapModal>
            <NewLocationModal></NewLocationModal>
        </>
    );
};

export default PropertyAd;


