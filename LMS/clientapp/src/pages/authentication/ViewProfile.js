import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import avatar1 from 'assets/images/users/avatar-1.png';
import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { useDispatch, useSelector } from "react-redux";
import UserService from "../../services/UserService";
import { setUserDetails } from "./../../store/reducers/users";
import MasterService from './../../services/MasterService';

import {
   
    InputLabel,
  
    Autocomplete,
   
} from '@mui/material';



export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [pic, setPic] = useState(false);
    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.users);
    const [formData, setFormData] = useState({});
    const [options, setOptions] = useState([]);
    const [cities, setCities] = useState([]);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        debugger;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
        const formDatas = new FormData(event.currentTarget);
        formDatas.append("UserId", userDetails.userId);
        formDatas.append("CityId", formData.cityId);
        if (pic) {
            formDatas.append('formFiles', pic);
        }
      
        const result = await UserService.updateUser(formDatas);
        if (result) {
            dispatch(setUserDetails({ userDetails: result }));
            window.localStorage.setItem('userDetails', JSON.stringify(result));
            setMessage("Updated Successfully!");
        }
        setLoading(false);

    };

    const onFileSelect = (evt) => {
        setPic(evt.currentTarget.files[0])
    }

    const handleLocations = (event) => {
        debugger;
        setOptions([]);
        if (event.target.value.length > 2) {
            const filteredCities = cities.filter(user => user.city_name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1);
                setOptions(filteredCities);
        } else {
            setOptions([]);
        }
    };

    useEffect(() => {
        MasterService.getCities().then((data) => {
            setCities(data);
            setOptions(data);
        });

    }, []);


    useEffect(() => {
        if (userDetails) {
            setOptions(cities);
            setFormData({
                name: userDetails?.name,
                email: userDetails?.email,
                cityId: userDetails?.cityId,
                city_name: userDetails?.city_name,
                mobile: userDetails?.mobile
            })
        }

    }, [userDetails]);



    return (
       
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <input
                    accept="image/*"
                      onChange={onFileSelect}
                        style={{ display: 'none' }}
                        id="raised-button-file"
                        multiple
                        type="file"
                    />
                <label htmlFor="raised-button-file">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 100, height: 100 }} src={userDetails?.imagePath} >
                        </Avatar>
                    </label> 
                       

                  
                        
                    
                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                autoComplete="given-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                value={formData?.name}
                                onChange={handleChange}
                                />
                            </Grid>
                           
                            <Grid item xs={12}>
                            <TextField
                                autoComplete="given-mobile"
                                    required
                                    fullWidth
                                    id="mobile"
                                    label="Mobile"
                                    name="mobile"
                                autoFocus
                                value={formData?.mobile}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                autoComplete="email"
                                value={formData?.email}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="firstname-signup">Select City*</InputLabel>
                                            <Autocomplete
                                disableClearable
                                freeSolo
                                includeInputInList
                                autoComplete
                                                id="combo-box-demo"
                                options={options}
                                defaultValue={userDetails.city_name}
                                name="city_name"
                                getOptionLabel={(option) => (typeof option === 'string' ? option : option.city_name)}
                                onChange={(evt, values) => {
                                    const e = { target: { name: "cityId", value: values.city_id } };
                                    handleChange(e);
                                }}
                                renderInput={(params) => (
                                    <TextField {...params}  onChange={handleLocations} InputProps={{
                                        style: { padding: 5 },
                                        ...params.InputProps,
                                        type: 'search'
                                       
                                    }} />
                                                )}
                                            />
                            </Grid>


                            <Grid item xs={12}>
                                <AnimateButton>
                                <LoadingButton loading={loading} disabled={false} fullWidth size="large" type="submit" variant="contained" sx={{ bgcolor: message === '' ? "action.main" :"action.success" }}>
                                  

                                    {message === ''
                                        ? (loading
                                            ? "disabled"
                                            : "Publish")
                                        : message}
                                    </LoadingButton>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                       
                       
                    </Box>
                </Box>
                
            </Container>
        
    );
}