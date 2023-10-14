import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AnimateButton from 'components/@extended/AnimateButton';
/*import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';*/
import {
    TextField,
    Grid,
    InputAdornment,
    InputLabel,
    Stack,
    Typography,
    Autocomplete,
    OutlinedInput,
    Button
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPosition } from "./../../store/reducers/property";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import MasterService from './../../services/MasterService';
import PropertyService from './../../services/PropertyService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function NewLocationModal() {

    const [options, setOptions] = React.useState([]);
    const handleClose = () => dispatch(setSelectedPosition({ showLocation: false }));
    const dispatch = useDispatch();
    const { showLocation, positionDetails } = useSelector((state) => state.property);
    

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    useEffect(() => {
        MasterService.getCities().then((data) => {
            setOptions(data);
        });

    }, []);
    return (
        <div>
            
            <Modal
                open={showLocation}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Typography>
                    <Formik
                        initialValues={{
                            CityId: 0,
                            city_name: "",
                            LocationName:""
                        }}
                        validationSchema={Yup.object().shape({
                            //CityId: Yup.string().max(255).required('City is required'),
                            //LocationName: Yup.string().max(255).required('Location name is required'),
                           
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                const location = {LocationId:0, CityId:values.CityId, LocationName: values.LocationName, ["Lat"]: positionDetails.lat.toString(), ["Long"]: positionDetails.lng.toString() };
                                const locationData=await PropertyService.SaveLocation(location);
                                dispatch(setSelectedPosition({ showLocation: false, positionDetails: { ...positionDetails, LocationId: locationData.id, LocationName: values.LocationName } }))
                                setSubmitting(false);
                            } catch (err) {
                                console.error(err);
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Stack spacing={1}>
                                <InputLabel htmlFor="firstname-signup">Select City*</InputLabel>
                                            <Autocomplete
                                                disablePortal
                                                id="combo-box-demo"
                                                options={options}
                                                value={values}
                                                name="city_name"
                                                getOptionLabel={(option) => option.city_name}
                                                onChange={(e, option) => {
                                                    setFieldValue("CityId", option.city_id);
                                                    setFieldValue("city_name", option.city_name);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField {...params} label=" " />
                                                )}
                                            />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} >
                            <Stack spacing={1}>
                                <InputLabel htmlFor="firstname-signup">Location*</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    change={handleChange}
                                    error={Boolean(touched.email && errors.email)}
                                    id="LocationName"
                                    type="text"
                                    value={values.LocationName}
                                    name="LocationName"
                                    onChange={handleChange}
                                    placeholder="Enter full locality details"
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                                <AnimateButton>
                                    <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                                     Save Location
                                    </Button>
                                </AnimateButton>
                         </Grid>
                    </Grid>
                </form>
                )}
            </Formik>
                </Box>
            </Modal>
        </div>
    );
}