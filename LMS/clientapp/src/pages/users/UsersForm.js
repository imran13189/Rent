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
import UserService from "./../../services/UserService";
import { fetchUsersPosts } from "./../../store/reducers/users";
import { openDrawer } from "./../../store/reducers/drawer";
import Email from './email';
// ============================|| Account ||============================ //

const UsersForm = ({}) => {
  const { login } = useAuth();
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [businessTypeData, setBusinessTypeData] = React.useState([]);
  const [industryTypeData, setIndustryTypeData] = React.useState([]);
  const [roleData, setRoles] = React.useState([]);
  const [contactModeData, setContactModeData] = React.useState([]);
  const [emailHtml, setEmailHtml] = React.useState([]);
  const [token, setToken] = React.useState([]);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getRoles = async () => {
    setRoles(await UserService.GetRoles());
  };

  function getRandomstring(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  useEffect(() => {
    
    getRoles();
    const token=getRandomstring(20);
    const staticElement = renderToString(
      <Email token={token}></Email>
    );
    setToken(token);
    setEmailHtml(staticElement);
  }, []);

  const { userDetails } = useSelector((state) => state.users);
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
            <Typography variant="h3">User</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={userDetails}
            // validationSchema={Yup.object().shape({
            //   lastName: Yup.string()
            //     .max(255)
            //     .required("First name is required"),
            //   firstName: Yup.string()
            //     .max(255)
            //     .required("First name is required"),
            // })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                values={...values,["token"]:token,["html"]:emailHtml};
                
                const data = await UserService.SaveUser(values);
                
                if (data) {
                  dispatch(openDrawer(false));
                  dispatch(fetchUsersPosts());
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
              <Box sx={{ ml: "3rem", width: 500 }}>
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Name</InputLabel>
                        <OutlinedInput
                          id="email-login"
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
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.name}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Email</InputLabel>
                        <OutlinedInput
                          id="email-login"
                          type="text"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Email"
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
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="mobile-login">Mobile</InputLabel>
                        <OutlinedInput
                          id="mobile-login"
                          type="text"
                          value={values.mobile}
                          name="mobile"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Mobile"
                          fullWidth
                        />
                        {touched.mobile && errors.mobile && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.mobile}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="email-login">Role</InputLabel>
                        <Autocomplete
                          id="combo-box-demo"
                          name="roleName"
                          value={values}
                          options={roleData}
                          onChange={(e, option) => {
                            setFieldValue("roleId", option.roleId);
                            setFieldValue("roleName", option.roleName);
                          }}
                          getOptionLabel={(option) => option.roleName}
                          renderInput={(params) => (
                            <TextField {...params} name="roleName" />
                          )}
                        />
                        {touched.roleId && errors.roleId && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                          >
                            {errors.roleId}
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
                          onClick={()=>dispatch(openDrawer(false))}
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

export default UsersForm;
