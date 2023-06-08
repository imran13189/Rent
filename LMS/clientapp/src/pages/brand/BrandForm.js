import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthService from "./../../services/AuthService";
import { useAuth } from "./../../routes/AuthProvider";
import { Box } from "@mui/material";
import AccountService from "./../../services/UserService";
import { renderToString } from "react-dom/server";
// material-ui
import {
    Button,
   
    FormHelperText,
    Grid,
  
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
   
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { isMobile } from 'react-device-detect';
// project import

import AnimateButton from "./../../components/@extended/AnimateButton";
import { useDispatch, useSelector } from "react-redux";

import { fetchBrand, fetchBusinessType } from "./../../store/reducers/masters";
import { openDrawer } from "./../../store/reducers/drawer";
import MasterService from "../../services/MasterService";

const BusinessTypeForm = () => {
    const dispatch = useDispatch();
    const [widthForm, setWidth] = React.useState(isMobile ? 250 : 700);
    const { brandDetails, brandData } = useSelector((state) => state.masters);

   
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        sx={{ mb: { xs: -0.5, sm: 0.5 }, ml: "3rem" }}
                    >
                        <Typography variant="h3">Business Type</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={brandDetails}
                        validationSchema={Yup.object().shape({
                            brandName: Yup.string()
                                .max(255)
                                .required("First name is required")
                                .test(
                                    "username-backend-validation",
                                    "Try another email",
                                    (name) => {
                                        if (brandDetails.brandId > 0) {
                                            return true;
                                        } else {
                                            const IsExist = brandData.find(
                                                (item) => item.brandName === name
                                            );

                                            if (IsExist) return false;
                                            else return true;
                                        }
                                    }
                                ),
                        })}
                        onSubmit={async (
                            values,
                            { setErrors, setStatus, setSubmitting }
                        ) => {
                            try {

                                const data = await MasterService.SaveBrand(values);

                                if (data) {
                                    dispatch(openDrawer(false));
                                    dispatch(fetchBrand());
                                }
                                setStatus({ success: false });
                                setSubmitting(false);
                            } catch (err) {
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
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
                        }) => (
                            <Box sx={{ ml: "3rem", width: widthForm }}>
                                <form noValidate onSubmit={handleSubmit}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Stack spacing={1}>
                                                <InputLabel htmlFor="statusName-login">Brand Name</InputLabel>
                                                <OutlinedInput
                                                    id="statusName-login"
                                                    type="text"
                                                    value={values.brandName}
                                                    name="brandName"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Business Type Name"
                                                    fullWidth
                                                />
                                                {touched.brandName && errors.brandName && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-statusName-login"
                                                    >
                                                        {errors.brandName}
                                                    </FormHelperText>
                                                )}
                                            </Stack>
                                        </Grid>
                                       

                                        <Grid item xs={12} lg={6}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    disabled={isSubmitting}
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Save
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <Grid item xs={12} lg={6}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    onClick={() => dispatch(openDrawer(false))}
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Cancel
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption"> Login with</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid> */}
                                    </Grid>
                                </form>
                            </Box>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </>
    );
}

BusinessTypeForm.displayName = 'LeadStatusForm';

export default BusinessTypeForm