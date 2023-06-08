import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "./../../../services/AuthService";
import { useAuth } from "./../../../routes/AuthProvider";

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Alert,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from "./../../../components/@extended/AnimateButton";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
// ============================|| FIREBASE - LOGIN ||============================ //

const PasswordReset = (props) => {
  const { login } = useAuth();
  const [checked, setChecked] = React.useState(false);

  const [show, setShow] = React.useState(true);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { token } = useParams();
  
  useEffect(() => {

  }, []);
  return (
    <>
      {show ? (
        <Formik
          initialValues={{
            token: token,
            password: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              const data = await AuthService.PasswordReset(values);
              
              if (data.isSuccess) {
                setShow(false);
              } else {
                setStatus({ sent: true,msg:data.message });
                setErrors({ submit: data.message });
                setSubmitting(false);
              }
            } catch (err) {
              setStatus({ sent: true,msg:err.message });
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
            status
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-login">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="-password-login"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? (
                              <EyeOutlined />
                            ) : (
                              <EyeInvisibleOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password-login"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>

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
                      Login
                    </Button>
                  </AnimateButton>
                  {status && status.msg &&(
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password-login"
                      >
                        {status.msg}
                      </FormHelperText>
                    )}
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
          )}
        </Formik>
      ) : (
        <>
          <Alert onClose={() => {}}>
            Password reset successfully —
            <Typography
              component={Link}
              to="/login"
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              Click here
            </Typography>
          </Alert>
        </>
      )}
    </>
  );
};

export default PasswordReset;
