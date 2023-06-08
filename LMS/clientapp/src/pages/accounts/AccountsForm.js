import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthService from "./../../services/AuthService";
import { useAuth } from "./../../routes/AuthProvider";
import { Box } from "@mui/material";
import AccountService from "./../../services/AccountService";

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import

import AnimateButton from "./../../components/@extended/AnimateButton";
import { useDispatch, useSelector } from "react-redux";
import ContactService from "./../../services/ContactService";
import { fetchAccountPosts } from "./../../store/reducers/accounts";
import { openDrawer } from "./../../store/reducers/drawer";
// ============================|| Account ||============================ //

const AccountForm = ({}) => {
  const { login, user } = useAuth();
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [businessTypeData, setBusinessTypeData] = React.useState([]);
  const [industryTypeData, setIndustryTypeData] = React.useState([]);
  const [contactModeData, setContactModeData] = React.useState([]);
  const [stateData, setStateData] = React.useState([]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getBusinessType = async () => {
    setBusinessTypeData(await AccountService.GetBusinessType());
  };

  const getIndustryType = async () => {
    setIndustryTypeData(await AccountService.GetIndustryType());
  };

  const getContactModeType = async () => {
    setContactModeData(await AccountService.GetContactMode());
  };

  const getStates = async () => {
    setStateData(await ContactService.GetStates());
  };

  useEffect(() => {
    getBusinessType();
    getIndustryType();
    getContactModeType();
    getStates();
  }, []);

  const { accountDetails, accountsData } = useSelector(
    (state) => state.accounts
  );

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
            <Typography variant="h3">Account</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={accountDetails}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255)
                .required("Name is required")
                .test(
                  "username-backend-validation",
                  "Try another name.",
                  (name) => {
                    const IsExist = accountsData.find(
                      (item) => item.name === name
                    );

                    if (IsExist) return false;
                    else return true;
                  }
                ),
              //   firstName: Yup.string()
              //     .max(255)
              //     .required("First name is required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                const postData = {
                  ...values,
                  ["UpdatedBy"]: user?.userId,
                  ["CreatedBy"]: user?.userId,
                };
                const data = await AccountService.SaveAccount(postData);

                if (data) {
                  dispatch(openDrawer(false));
                  dispatch(fetchAccountPosts(user?.userId));
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
              <Box sx={{ ml: "3rem", width: 700 }}>
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name-login">Name</InputLabel>
                        <OutlinedInput
                          id="name-login"
                          type="text"
                          value={values.name}
                          name="name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Name"
                          fullWidth
                        />
                        {touched.name && errors.name && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-name-login"
                          >
                            {errors.name}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="sales-owner">
                          Sales Owner
                        </InputLabel>
                        <OutlinedInput
                          id="sales-owner"
                          type="text"
                          value={values.salesOwner}
                          name="salesOwner"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Sales Owner"
                          fullWidth
                        />
                        {touched.salesOwner && errors.salesOwner && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.salesOwner}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                          Nubmber of employees
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="text"
                          value={values.noOfEmployees}
                          name="noOfEmployees"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Number of employees"
                          fullWidth
                        />
                        {touched.noOfEmployees && errors.noOfEmployees && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.noOfEmployees}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                          Annual Revenue
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="text"
                          value={values.annualRevenue}
                          name="annualRevenue"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Annual Revenue"
                          fullWidth
                        />
                        {touched.annualRevenue && errors.annualRevenue && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.annualRevenue}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                          Industry Type
                        </InputLabel>
                        <Autocomplete
                          id="combo-box-demo"
                          name="industryTypeName"
                          value={values}
                          options={industryTypeData}
                          onChange={(e, option) => {
                            setFieldValue(
                              "industryTypeId",
                              option.industryTypeId
                            );
                            setFieldValue(
                              "industryTypeName",
                              option.industryTypeName
                            );
                          }}
                          getOptionLabel={(option) => option.industryTypeName}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="industryTypeName"
                              label=""
                            />
                          )}
                        />
                        {touched.industryTypeId && errors.industryTypeId && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.industryTypeId}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                          Business Type
                        </InputLabel>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={businessTypeData}
                          value={values}
                          name="businessTypeName"
                          getOptionLabel={(option) => option.businessTypeName}
                          onChange={(e, option) => {
                            setFieldValue(
                              "businessTypeId",
                              option.businessTypeId
                            );
                            setFieldValue(
                              "businessTypeName",
                              option.businessTypeName
                            );
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="" />
                          )}
                        />
                        {touched.businessTypeId && errors.businessTypeId && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} lg={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Address</InputLabel>
                        <TextField
                          id="email-login"
                          type="email"
                          value={values.address}
                          name="address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Address"
                          fullWidth
                          multiline
                          maxRows={4}
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
                        <InputLabel htmlFor="email-login">City</InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="city"
                          value={values.city}
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

                    <Grid item xs={12} lg={6}>
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
                            <TextField {...params} label="" />
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
                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="zipcode-login">Zipcode</InputLabel>
                        <OutlinedInput
                          id="zipcode-login"
                          type="zipcode"
                          value={values.zipcode}
                          name="zipcode"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Key Contact Person"
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
                        <InputLabel htmlFor="country-login">Country</InputLabel>
                        <OutlinedInput
                          id="country-login"
                          type="text"
                          value={values.country}
                          name="country"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="country"
                          fullWidth
                        />
                        {touched.country && errors.country && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-country-login"
                          >
                            {errors.country}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-lastContactTime">
                          Last Contact Time
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.lastContactTime}
                          name="lastContactTime"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Last Contact Time"
                          fullWidth
                        />
                        {touched.lastContactTime && errors.lastContactTime && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.lastContactTime}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                          Last ActivityType
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="text"
                          value={values.lastActivityTypeId}
                          name="lastActivityTypeId"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Last ActivityType"
                          fullWidth
                        />
                        {touched.lastActivityTypeId &&
                          errors.lastActivityTypeId && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                            >
                              {errors.lastActivityTypeId}
                            </FormHelperText>
                          )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                          Last Contact Mode
                        </InputLabel>
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={contactModeData}
                          value={values}
                          name="contactModeName"
                          onChange={(e, option) => {
                            setFieldValue(
                              "lastContactMode",
                              option.contactModeId
                            );
                            setFieldValue(
                              "contactModeName",
                              option.contactModeName
                            );
                          }}
                          getOptionLabel={(option) => option.contactModeName}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="" />
                          )}
                        />
                        {touched.email && errors.email && (
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
                        <InputLabel htmlFor="email-login">
                          Recent Note
                        </InputLabel>

                        <TextField
                          id="recentNote"
                          label="Recent Node"
                          name="recentNote"
                          type="recentNote"
                          value={values.recentNote}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Recent Note"
                          multiline
                          maxRows={4}
                          fullWidth
                        />
                        {touched.recentNote && errors.recentNote && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.recentNote}
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
};

export default AccountForm;
