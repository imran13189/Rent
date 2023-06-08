import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthService from "./../../services/AuthService";
import { useAuth } from "./../../routes/AuthProvider";
import { Box } from "@mui/material";
import {isMobile} from 'react-device-detect';
// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
  Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper
} from "@mui/material";
import Draggable from 'react-draggable';

import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import

import AnimateButton from "./../../components/@extended/AnimateButton";
import { useDispatch, useSelector } from "react-redux";
import ContactService from "./../../services/ContactService";
import {
  setSelectedContact,
  fetchPosts,
  fetchStatus,
} from "./../../store/reducers/contact";
import { openDrawer } from "./../../store/reducers/drawer";
import { fetchAccountPosts } from "./../../store/reducers/accounts";
import AccountService from "../../services/AccountService";
// ============================|| FIREBASE - LOGIN ||============================ //
const filter = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const SignupSchema = Yup.object().shape({
    locationName: Yup.string()
        .max(255)
        .required("Last name is required"),
    locationType: Yup.string().required("Location type required."),
    serviceInterestIn: Yup.string().required("Service required."),
    monthlySales: Yup.number()
        .required('The number is required')
        .test(
            'Is positive?',
            'The number must be greater than 0',
            (value) => value > 0
        )
       
})

const LocationForm = ({ openLocation, setOpenLocation }) => {
    const { login, user } = useAuth();
    const [checked, setChecked] = React.useState(false);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    
    const [stateData, setStateData] = React.useState([]);
    const [widthForm, setWidth] = React.useState(isMobile ? 250 : 700);
    const { contactDetails } = useSelector((state) => state.contact);
    const { accountsData } = useSelector((state) => state.accounts);
    const { locationDetails } = useSelector((state) => state.contact);

    const getStates = async () => {
        setStateData(await ContactService.GetStates());
    };

  

    useEffect(() => {

        getStates();
         
        const data = locationDetails;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationDetails]);

    

    return (
        <Dialog
            open={openLocation}
            onClose={() => setOpenLocation(!openLocation)}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Location
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="baseline"
                            sx={{ mb: { xs: -0.5, sm: 0.5 }, ml: "3rem" }}
                        >
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Formik
                            initialValues={locationDetails}
                            validationSchema={SignupSchema}
                            validateOnChange={false}
                            validateOnBlur={false}
                            onSubmit={(
                                values

                            ) => {
                                 
                                if (locationDetails.locationId > 0) {
                                    const editLocationList = contactDetails.locationList.filter((row) => row.locationId !== locationDetails.locationId);
                                    values = { ...values, ["locationId"]: locationDetails.locationId };
                                    dispatch(setSelectedContact({ contactDetails: { ...contactDetails, ["location"]: "added", ["locationList"]: [...editLocationList, values] } }));
                                }
                                else {
                                    values = { ...values, ["locationId"]: contactDetails.locationList.length };
                                    dispatch(setSelectedContact({ contactDetails: { ...contactDetails, ["location"]:"added", ["locationList"]: [...contactDetails.locationList, values] } }));
                                }
                                
                                setOpenLocation(!openLocation);
                            }}
                        >
                            {({
                                errors,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                touched,
                                values,
                                setFieldValue,
                                setTouched,
                                validateForm 
                            }) => (
                                <Box sx={{ width: widthForm }}>
                                    <form noValidate onSubmit={handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} lg={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="email-login">Location Name</InputLabel>
                                                    <OutlinedInput
                                                        id="email-login"
                                                        type="locationName"
                                                        value={values?.locationName}
                                                        name="locationName"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Type"
                                                        fullWidth
                                                    />
                                                    {touched.locationName|| errors.locationName && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login"
                                                        >
                                                            {errors.locationName}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="email-login">Location Type</InputLabel>

                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={values?.locationType}
                                                        label="locationType"
                                                        name="locationType"
                                                        onChange={handleChange}
                                                        size="large"
                                                        defaultValue=""
                                                        displayEmpty
                                                        onBlur={() => {
                                                            setTouched({ locationType: true });
                                                        }}
                                                        MenuProps={{
                                                            style: { zIndex: 35001, minWidth: 100 },
                                                        }}
                                                    ><MenuItem value="">
                                                            <em>Select Location</em>
                                                        </MenuItem>
                                                        <MenuItem value={1}>
                                                            Mother
                                                        </MenuItem>
                                                        <MenuItem value={2}>
                                                            Sister
                                                        </MenuItem>
                                                        <MenuItem value={3}>
                                                            Child
                                                        </MenuItem>
                                                    </Select>
                                                    {touched.locationType|| errors.locationType && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login"
                                                        >
                                                            {errors.locationType}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="email-login">Inventory Amount</InputLabel>
                                                    <OutlinedInput
                                                        id="email-login"
                                                        type="number"
                                                        value={values?.inventoryAmount}
                                                        name="inventoryAmount"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Type"
                                                        fullWidth
                                                    />
                                                    {touched.inventoryAmount && errors.inventoryAmount && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login"
                                                        >
                                                            {errors.inventoryAmount}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} lg={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="email-login">Monthly Sales</InputLabel>
                                                    <OutlinedInput
                                                        id="email-login"
                                                        type="number"
                                                        value={values?.monthlySales}
                                                        name="monthlySales"
                                                        onBlur={() => {
                                                            setTouched({ monthlySales: true });
                                                        }}
                                                        onChange={handleChange}
                                                        placeholder="Type"
                                                        fullWidth
                                                    />
                                                    {touched.monthlySales && errors.monthlySales && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login"
                                                        >
                                                            {errors.monthlySales}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>


                                            <Grid item xs={12} lg={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="email-login">Service Intersted</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={values?.serviceInterestIn}
                                                        label="serviceInterestIn"
                                                        name="serviceInterestIn"
                                                        onChange={handleChange}
                                                        size="large"
                                                        defaultValue=""
                                                        displayEmpty
                                                        onBlur={() => {
                                                            setTouched({ serviceInterestIn: true });
                                                        }}
                                                        MenuProps={{
                                                            style: { zIndex: 35001, minWidth: 100 },
                                                        }}
                                                    >    <MenuItem value=""> <em>Select Service</em> </MenuItem>
                                                        <MenuItem value={1}>
                                                            Gainer
                                                        </MenuItem>
                                                        <MenuItem value={2}>
                                                            Invertory Mgt
                                                        </MenuItem>
                                                        <MenuItem value={3}>
                                                            Audit
                                                        </MenuItem>
                                                    </Select>
                                                    {touched.serviceInterestIn || errors.serviceInterestIn && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login"
                                                        >
                                                            {errors.serviceInterestIn}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="email-login">Address</InputLabel>
                                                    <OutlinedInput
                                                        id="email-login"
                                                        type="email"
                                                        value={values?.address}
                                                        name="address"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Address"
                                                        fullWidth
                                                    />
                                                    {touched.address && errors.address && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login"
                                                        >
                                                            {errors.email}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="zipcode-login">Zip code</InputLabel>
                                                    <OutlinedInput
                                                        id="zipcode-login"
                                                        type="text"
                                                        value={values?.zone}
                                                        name="zone"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="Zip code"
                                                        fullWidth
                                                    />
                                                    {touched.zipcode && errors.zipcode && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-zipcode-login"
                                                        >
                                                            {errors.zipcode}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12} lg={6}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="city-login">City</InputLabel>
                                                    <OutlinedInput
                                                        id="city-login"
                                                        type="city"
                                                        value={values?.city}
                                                        name="city"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        placeholder="City"
                                                        fullWidth
                                                    />
                                                    {touched.city && errors.city && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-city-login"
                                                        >
                                                            {errors.city}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>

                                            <Grid item xs={12} lg={12}>
                                                <Stack spacing={1}>
                                                    <InputLabel htmlFor="email-login">State</InputLabel>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={stateData}
                                                        value={values}
                                                        name="stateName"
                                                        getOptionLabel={(option) => option.stateName}
                                                        onChange={(e, option) => {
                                                            setFieldValue("stateId", option.stateId);
                                                            setFieldValue("stateName", option.stateName);
                                                        }}
                                                        renderInput={(params) => (
                                                            <TextField {...params} label=" " />
                                                        )}
                                                    />
                                                    {touched.businessTypeId && errors.businessTypeId && (
                                                        <FormHelperText
                                                            error
                                                            id="standard-weight-helper-text-email-login"
                                                        >
                                                            {errors.stateId}
                                                        </FormHelperText>
                                                    )}
                                                </Stack>
                                            </Grid>
                                            {errors.submit && (
                                                <Grid item xs={12}>
                                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                                </Grid>
                                            )}
                                            <Grid item xs={6}>
                                                <AnimateButton>
                                                    <Button
                                                        disableElevation
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                        color="primary"
                                                        validationSchema={SignupSchema}
                                                        onClick={() => validateForm() }
                                                    >
                                                        Save
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>

                                        </Grid>
                                    </form>
                                </Box>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => setOpenLocation(!openLocation)}>
                    Cancel
                </Button>

            </DialogActions>
        </Dialog>
    );
};

export default LocationForm;
