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

import { fetchBusinessType } from "./../../store/reducers/masters";
import { openDrawer } from "./../../store/reducers/drawer";
import MasterService from "../../services/MasterService";

const BusinessTypeForm = () => {
    const dispatch = useDispatch();
    const [widthForm, setWidth] = React.useState(isMobile ? 250 : 700);
    const { businessTypeDetails, businessTypeData } = useSelector((state) => state.masters);

   
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
                        initialValues={businessTypeDetails}
                        validationSchema={Yup.object().shape({
                            businessTypeName: Yup.string()
                                .max(255)
                                .required("First name is required")
                                .test(
                                    "username-backend-validation",
                                    "Try another email",
                                    (name) => {
                                        if (businessTypeDetails.statusId   > 0) {
                                            return true;
                                        } else {
                                            const IsExist = businessTypeData.find(
                                                (item) => item.businessTypeName === name
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

                                const data = await MasterService.SaveBusinessType(values);

                                if (data) {
                                    dispatch(openDrawer(false));
                                    dispatch(fetchBusinessType());
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
                                                <InputLabel htmlFor="statusName-login">Name</InputLabel>
                                                <OutlinedInput
                                                    id="statusName-login"
                                                    type="text"
                                                    value={values.businessTypeName}
                                                    name="businessTypeName"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="Business Type Name"
                                                    fullWidth
                                                />
                                                {touched.businessTypeName && errors.businessTypeName && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-statusName-login"
                                                    >
                                                        {errors.businessTypeName}
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