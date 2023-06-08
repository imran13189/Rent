import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthService from "./../../services/AuthService";
import { useAuth } from "./../../routes/AuthProvider";
import { Box } from "@mui/material";

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
} from "@mui/material";

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

const ContactForm = ({}) => {
  const { login, user } = useAuth();
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const inputElement = useRef([]);
  const [accountList, setAccountList] = useState([]);
  const [stateData, setStateData] = React.useState([]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values) => {
    
    const postData = {
      ...values,
      ["UserId"]: user.userId,
      ["ServiceInterestedIn"]: checked,
      ["accounts"]: contactDetails.accountList,
    };

    const data = await ContactService.SaveContact(postData);
    if (data) {
      dispatch(openDrawer(false));
      dispatch(fetchPosts(user?.userId));
    }
  };
  const { contactDetails } = useSelector((state) => state.contact);
  const { accountsData } = useSelector((state) => state.accounts);

  const handleIconClicks = (row) => (e) => {
    
    const filteredPeople = accountList.filter(
      (item) => item.accountId !== row.accountId
    );
    dispatch(
      setSelectedContact({
        contactDetails: {
          ...contactDetails,
          ["accountList"]: filteredPeople,
        },
      })
    );
  };

  const getStates = async () => {
    setStateData(await ContactService.GetStates());
  };

  useEffect(() => {
    dispatch(fetchAccountPosts(user?.userId));
    dispatch(fetchStatus());
    getStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAccountList(contactDetails.accountList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactDetails]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 },ml:"3rem" }}
          >
            <Typography variant="h3">Contact</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={contactDetails}
            validationSchema={Yup.object().shape({
              lastName: Yup.string()
                .max(255)
                .required("Last name is required"),
              firstName: Yup.string()
                .max(255)
                .required("First name is required"),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                await handleLogin(values);
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
              <Box sx={{ ml:"3rem", width: 700 }}>
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                          First Name
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="text"
                          value={values.firstName}
                          name="firstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="First Name"
                          fullWidth
                        />
                        {touched.firstName && errors.firstName && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.firstName}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}  lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Last Name</InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="text"
                          value={values.lastName}
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Last Name"
                          fullWidth
                        />
                        {touched.lastName && errors.lastName && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.lastName}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Accounts</InputLabel>
                        {accountList?.map((row, i) => {
                          return (
                            <div>
                              <OutlinedInput
                                id="email-login"
                                disabled
                                type="text"
                                value={row.accountName}
                                name={"accounts"}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleIconClicks(row)}
                                      value={row.accountId}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      <ClearSharpIcon />
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            </div>
                          );
                        })}
                        <Autocomplete
                          id="combo-box-account"
                          key={contactDetails} 
                          options={accountsData}
                          
                          onChange={(e, option) => {
                            
                            const uniqueNames = accountList?.filter((item) => {
                              return item.accountId == option.accountId;
                            });

                            if (option.inputValue != undefined) {
                              AccountService.SaveAccount({
                                name: option.inputValue,
                              }).then((response) => {
                               
                                dispatch(
                                  setSelectedContact({
                                    contactDetails: {
                                      ...values,
                                      ["accountList"]: [
                                        ...accountList,
                                        {
                                          accountId: response.id,
                                          accountName: option.inputValue,
                                        },
                                      ],
                                    },
                                  })
                                );
                              });
                            } else {
                              if (uniqueNames == 0 || uniqueNames == undefined)
                                dispatch(
                                  setSelectedContact({
                                    contactDetails: {
                                      ...values,
                                      ["accountList"]: [
                                        ...accountList,
                                        {
                                          accountId: option.accountId,
                                          accountName: option.name,
                                        },
                                      ],
                                    },
                                  })
                                );
                              //
                            }
                          }}
                          getOptionLabel={(option) => option.name}
                          
                          filterOptions={(options, params) => {
                            
                            let filtered = filter(options, params);
                            const isExisting = options.some(
                              (option) => params.inputValue === option.name
                            );
                            if (params.inputValue !== "" && !isExisting) {
                              filtered.push({
                                inputValue: params.inputValue,
                                name: `Add "${params.inputValue}" Account`,
                              });
                            }

                            return filtered;
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="" />
                          )}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Brand</InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="brand"
                          value={values.brand}
                          name="brand"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Brand"
                          fullWidth
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">
                          Dealer Ship Name
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.dealerShipName}
                          name="dealerShipName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Dealer Ship Name"
                          fullWidth
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
                        <InputLabel htmlFor="email-login">Locations</InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.locations}
                          name="locations"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Locations"
                          fullWidth
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
                        <InputLabel htmlFor="email-login">Type</InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.type}
                          name="type"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Type"
                          fullWidth
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
                          OtherGroupAffiliation
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.otherGroupAffiliation}
                          name="otherGroupAffiliation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Other Group Affiliation"
                          fullWidth
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
                          KeyContactPerson
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.keyContactPerson}
                          name="keyContactPerson"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Key Contact Person"
                          fullWidth
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
                        <InputLabel htmlFor="email-login">Mobile</InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="text"
                          value={values.mobile}
                          name="mobile"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Mobile"
                          fullWidth
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
                        <InputLabel htmlFor="email-login">Email</InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter email address"
                          fullWidth
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
                          Other Brand Association
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.otherBrandAssociation}
                          name="otherBrandAssociation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Other Brand Association"
                          fullWidth
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
                          Other Brand Region
                        </InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.otherBrandRegion}
                          name="otherBrandRegion"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Other Brand Region"
                          fullWidth
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
                        <InputLabel htmlFor="email-login">Address</InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="email"
                          value={values.address}
                          name="address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Locations"
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
                        <InputLabel htmlFor="city-login">City</InputLabel>
                        <OutlinedInput
                          id="city-login"
                          type="city"
                          value={values.city}
                          name="city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="city"
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

                    {/* <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel id="demo-simple-select-label">
                          Age
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.statusId}
                          label="Age"
                          onChange={handleChange}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        {touched.email && errors.email && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid> */}

                    <Grid item xs={12} sx={{ mt: -1 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.serviceInterestedIn}
                              onChange={(event) =>
                                setChecked(event.target.checked)
                              }
                              //onChange={handleChange}
                              name="serviceInterestedIn"
                              color="primary"
                              size="small"
                            />
                          }
                          label={
                            <Typography variant="h6">
                              Service Interested In
                            </Typography>
                          }
                        />
                        {/* <Link
                        variant="h6"
                        component={RouterLink}
                        to=""
                        color="text.primary"
                      >
                        Forgot Password?
                      </Link> */}
                      </Stack>
                    </Grid>
                    {errors.submit && (
                      <Grid item xs={12}>
                        <FormHelperText error>{errors.submit}</FormHelperText>
                      </Grid>
                    )}
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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

export default ContactForm;
