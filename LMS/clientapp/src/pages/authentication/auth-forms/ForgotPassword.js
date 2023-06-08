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
import Email from "./../../users/email";
// project import
// import FirebaseSocial from './FirebaseSocial';
import AnimateButton from "./../../../components/@extended/AnimateButton";
import { renderToString } from "react-dom/server";
// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
// ============================|| FIREBASE - LOGIN ||============================ //

const ForgotPassword = (props) => {
  const { login } = useAuth();
  const [checked, setChecked] = React.useState(false);

  const [show, setShow] = React.useState(true);
  const [emailHtml, setEmailHtml] = React.useState();
  const [token, setToken] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //const { token } = useParams();
  function getRandomstring(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  useEffect(() => {
    const token = getRandomstring(20);
    const staticElement = renderToString(<Email token={token}></Email>);
    setToken(token);
    setEmailHtml(staticElement);
  }, []);
  return (
    <>
      {show ? (
        <Formik
          initialValues={{
            token: token,
            email: "",
            html: emailHtml,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              values = { ...values, ["token"]: token, ["html"]: emailHtml };
              const data = await AuthService.SentLink(values);

              if (data.isSuccess) {
                setShow(false);
              } else {
                setStatus({ sent: true, msg: data.message });
                setErrors({ submit: data.message });
                setSubmitting(false);
              }
            } catch (err) {
              setStatus({ sent: true, msg: err.message });
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
            status,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                    <OutlinedInput
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
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
                      Sent
                    </Button>
                  </AnimateButton>
                  {status && status.msg && (
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
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography
                    component={Link}
                    to="/login"
                    variant="body1"
                    sx={{ textDecoration: "none" }}
                    color="primary"
                  >
                    Already have an account?
                  </Typography>
                </Stack>
              </Grid>
            </form>
          )}
        </Formik>
      ) : (
        <>
          <Alert onClose={() => {}}>
            Link has been sent to you registered email id to reset the password.
            {/* <Typography
              component={Link}
              to="/login"
              variant="body1"
              sx={{ textDecoration: "none" }}
              color="primary"
            >
              
            </Typography> */}
          </Alert>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
