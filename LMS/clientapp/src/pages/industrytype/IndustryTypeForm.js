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
import UserService from "./../../services/UserService";
import { fetchIndustryType, fetchLeadStatus } from "./../../store/reducers/masters";
import { openDrawer } from "./../../store/reducers/drawer";
import MasterService from "../../services/MasterService";

const IndustryTypeForm = () => {
    const dispatch = useDispatch();
    const [widthForm, setWidth] = React.useState(isMobile ? 250 : 700);
    const { insdustryTypeDetails, industryTypeData } = useSelector((state) => state.masters);

    useEffect(() => {
      
    }, []);

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
                        <Typography variant="h3">Industry Type</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={insdustryTypeDetails}
                        validationSchema={Yup.object().shape({
                            industryTypeName: Yup.string()
                                .max(255)
                                .required("First name is required")
                                .test(
                                    "username-backend-validation",
                                    "Try another email",
                                    (industryTypeName) => {
                                        if (insdustryTypeDetails.industryTypeId   > 0) {
                                            return true;
                                        } else {
                                            const IsExist = industryTypeData.find(
                                                (item) => item.industryTypeName === industryTypeName
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

                                const data = await MasterService.SaveIndustryType(values);

                                if (data) {
                                    dispatch(openDrawer(false));
                                    dispatch(fetchIndustryType());
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
                                                    value={values.industryTypeName}
                                                    name="industryTypeName"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    placeholder="industryTypeName Name"
                                                    fullWidth
                                                />
                                                {touched.industryTypeName && errors.industryTypeName && (
                                                    <FormHelperText
                                                        error
                                                        id="standard-weight-helper-text-statusName-login"
                                                    >
                                                        {errors.industryTypeName}
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

IndustryTypeForm.displayName = 'IndustryTypeForm';

export default IndustryTypeForm