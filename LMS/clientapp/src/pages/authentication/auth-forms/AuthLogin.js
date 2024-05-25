import { useRef, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import {
    Button,
 
    Divider,
   
    TextField,
    FormHelperText,
    Grid,
  
    InputAdornment,
    InputLabel,
   
    Stack,
    Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

import AnimateButton from "components/@extended/AnimateButton";

// assets
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

import UserService from "../../../services/UserService";
import { setUserDetails } from "./../../../store/reducers/users";
// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const [otpError, setOTPError] = useState(false);
    const [isOTPSent, setOTPSent] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
 
    const redirectToHome = () => navigate(`/`)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const inputRef = useRef(new Array());

    const handleOtp = (e, index) => {
      
        //inputRef.current[++index].focus();
        if (!(e.key === "Backspace")) {
            if (inputRef.current[index + 1])
                inputRef.current[++index].getElementsByTagName("input")[0].focus();
        }
        
    };
    return (
        <>
           
            <Formik
                initialValues={{
                    mobile: "",
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    mobile: Yup.string()
                        .min(10)
                        .required("Mobile is required")

                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                       

                        if (isOTPSent) {
                            var otp='';
                            for (var i = 0; i < 4; i++) {
                                otp =otp + inputRef.current[i].getElementsByTagName("input")[0].value.toString();
                            }
                          
                            const result = await UserService.ValidateOTP({ ...values, OTP: otp });
                            debugger;
                            if (result.userData) {
                                window.localStorage.setItem('user', JSON.stringify(result));
                                dispatch(setUserDetails({ userDetails: result.userData }));
                                redirectToHome();
                            }
                            else {
                                setOTPError(true);
                            }
                        }
                        else {
                            const result = await UserService.SaveUser(values);
                            setOTPSent(true);
                            setSubmitting(false);
                        }
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
                onSubmitExecutionError={() => {
                  
                } }
            >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                    setFieldValue
                }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-login">Mobile</InputLabel>
                                    <TextField
                                        id="email-login"
                                        type="text"
                                        value={values.mobile}
                                        name="mobile"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            setFieldValue('mobile', e.currentTarget.value);
                                            if (e.currentTarget.value.length < 10)
                                                setOTPSent(false);
                                        }}
                                        placeholder="9999 999 999"
                                        fullWidth
                                        error={Boolean(touched.mobile && errors.mobile)}
                                        inputProps={{
                                            maxLength:10,
                                            autoComplete: 'none'
                                        }}
                                       
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocalPhoneOutlinedIcon
                                                        aria-label="toggle password visibility"
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    ></LocalPhoneOutlinedIcon>
                                                </InputAdornment>
                                            ),
                                        }}
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

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}

                            {isOTPSent&&<Grid item xs={12} lg={12}>
                                <Grid container xs={12} lg={12} spacing={1}>
                                    <Grid item xs={12} lg={12} >
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-login">OTP</InputLabel>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={3} lg={3 }>
                                      
                                            <TextField
                                            className="OTP"
                                            inputProps={{ style: { textAlign: 'center' }, maxLength: 1, autoComplete: 'none' }}
                                                type="text"
                                                ref={(element) => inputRef.current.push(element)}
                                                onKeyUp={(e) => handleOtp(e, 0)}
                                            />
                                        
                                    </Grid>
                                    <Grid item xs={3} lg={3}>
                                       
                                            <TextField
                                                className="OTP"
                                                inputProps={{ style: { textAlign: 'center' }, maxLength: 1, autoComplete: 'none' }}
                                                type="text"
                                                ref={(element) => inputRef.current.push(element)}
                                                onKeyUp={(e) => handleOtp(e, 1)}
                                            />
                                       
                                    </Grid>
                                    <Grid item xs={3} lg={3}>
                                       
                                            <TextField
                                                className="OTP"
                                                inputProps={{ style: { textAlign: 'center' }, minWidth:5, maxLength: 1, autoComplete: 'none' }}
                                                type="text"
                                                ref={(element) => inputRef.current.push(element)}
                                                onKeyUp={(e) => handleOtp(e, 2)}
                                            />
                                      
                                    </Grid>
                                    <Grid item xs={3} lg={3}>
                                        
                                            <TextField
                                                className="OTP"
                                                inputProps={{ style: { textAlign: 'center' }, maxLength: 1, autoComplete: 'none' }}
                                                type="text"
                                                ref={(element) => inputRef.current.push(element)}
                                                onKeyUp={(e) => handleOtp(e, 3)}
                                            />
                                      
                                    </Grid>
                                    {otpError && (
                                        <Grid item xs={12}>
                                            <FormHelperText error>Invalid OTP</FormHelperText>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                            }
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        sx={{ color: 'common.white', bgcolor: 'action.main' }}
                                    >
                                        {isOTPSent ? "Verify" : "Get Otp"}
                                    </Button>
                                </AnimateButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">Need help?</Typography>
                                </Divider>
                            </Grid>
                            {/*<Grid item xs={12}>*/}
                            {/*    <FirebaseSocial />*/}
                            {/*</Grid>*/}
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
