import { useState,useEffect } from "react";

// material-ui
import {

    Select,
    MenuItem,
    TextField,
    ButtonGroup,
    Button,
    Divider,

    Autocomplete,
    Grid,
    Link,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// ==============================|| DASHBOARD - DEFAULT ||============================== //
import MasterService from './../../services/MasterService'
import PropertyService from './../../services/PropertyService'

const SearchProperty = ({ setProperties }) => {
    const [options, setOptions] = useState([]);
    const [params, setPrams] = useState(null);
    
    const handleLocations = (event) => {
   
        setOptions([]);
        if (event.target.value.length > 2) {
            MasterService.getLocations(event).then((data) => {
                setOptions(data);
            });
        }
        else {
            setOptions([]);
        }

    }

    useEffect(() => {
        if (params) {
       
            PropertyService.getProperties(params).then((data) => {
                setProperties(data);
            });
        }

    }, [params]);

   
    return (
        <Grid container spacing={3} mt={10} justifyContent="flex-end">
            <Grid item xs={12} lg={4}>
                <Stack spacing={1}>
                    <Autocomplete
                        autoComplete
                        includeInputInList
                        freeSolo
                        disableOpenOnFocus
                        filterOptions={x => {
                            return x;
                        }}
                        id="free-solo-2-demo"
                        disableClearable
                        options={options}
                        onChange={(event, value) => setPrams({ ...value } )}
                        getOptionLabel={(option) => typeof option === "string" ? option : option.LocationName}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Search location"
                                onChange={handleLocations}
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                    endAdornment: (
                                        < InputAdornment position="end" >
                                            <LocationOnOutlined
                                                aria-label="toggle password visibility"
                                                edge="end"
                                                size="large"
                                            >

                                            </LocationOnOutlined>
                                        </InputAdornment>
                                    )
                                }}

                            />
                        )}


                    />


                </Stack>
            </Grid>

            <Grid item xs={6} lg={1}>
                <Stack spacing={1}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={(evt) => setPrams({ ...params, ptype: evt.target.value })}
                        label="Age"
                        name="PropertyTypeId"
                      
                        displayEmpty
                    >
                        <MenuItem value={0}>
                            <em>Property Type</em>
                        </MenuItem>
                        <MenuItem value={10}>1 BHK</MenuItem>
                        <MenuItem value={20}>2 BHK</MenuItem>
                        <MenuItem value={30}>3 BHK</MenuItem>
                    </Select>
                   
                </Stack>
            </Grid>
         
            <Grid item xs={6} lg={1}>
                <Stack spacing={1}>
                    <OutlinedInput
                        fullWidth
                        id="email-login"
                        type="number"
                        name="RentAmount"
                        placeholder="Budget"
                        onChange={(evt) => setPrams({ ...params, budget:  parseInt(evt.target.value??0) })}
                    />
                   
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Divider>
                </Divider>
            </Grid>

        </Grid>
    );
};

export default SearchProperty;
