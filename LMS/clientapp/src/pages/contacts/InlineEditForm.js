import React, { useEffect, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";

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
  Select,
  MenuItem,
  Box,
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// project import
import AnimateButton from "./../../components/@extended/AnimateButton";
import ContactService from "./../../services/ContactService";
// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useAuth } from "./../../routes/AuthProvider";
// ============================|| FIREBASE - LOGIN ||============================ //
import { fetchPosts } from "./../../store/reducers/contact";
import { openDrawer } from "./../../store/reducers/drawer";
const InlineEditForm = () => {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values) => {};
  const { statusData, contactDetails } = useSelector((state) => state.contact);

  useEffect(() => {
    
    var data = statusData;
  }, [statusData]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">Contact</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Formik
            initialValues={contactDetails}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                const data = await ContactService.UpdateContact(values);
                if (data) {
                  dispatch(openDrawer(false));
                  dispatch(fetchPosts(user?.userId));
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
            }) => (
              <Box sx={{ m: "1rem", width: 250 }}>
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel id="demo-simple-select-label">
                          Status
                        </InputLabel>
                        <input type="hidden" name="contactId" value={values.contactId}></input>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={values.statusId}
                          label="Status"
                          name="statusId"
                          onChange={handleChange}
                          size="large"
                          MenuProps={{
                            style: { zIndex: 35001, minWidth: 100 },
                          }}
                        >
                          {statusData?.map((item) => (
                            <MenuItem value={item.StatusId}>
                              {item.StatusName}
                            </MenuItem>
                          ))}
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
                          Change
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
};

export default InlineEditForm;
