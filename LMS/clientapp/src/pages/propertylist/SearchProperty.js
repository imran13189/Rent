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
import { useSelector, useDispatch } from "react-redux";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

import PropertyService from './../../services/PropertyService';
import Search from './../../pages/dashboard/Search';
import { fetchProperties } from "./../../store/reducers/property";

const SearchProperty = () => {

    const [params, setPrams] = useState(null);
    const [selectedValue, setSelectedValue] = useState();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const { selectedLocation } = useSelector((state) => state.property);
    const dispatch = new useDispatch();

    useEffect(() => {
        if (selectedLocation) {

            //PropertyService.getProperties(params).then((data) => {
            //    setProperties(data);
            //});
            dispatch(fetchProperties(selectedLocation));
        }

    }, [selectedLocation]);
                               
    //useEffect(() => {
    //    setPrams({ ...params, ...selectedLocation });
    //}, [selectedLocation]);
   
    return (
        <Grid container spacing={3} mt={10} justifyContent="flex-end">
            <Grid item xs={12} lg={4}>
                <Stack spacing={1}>
                    <Search selectedValue={selectedLocation}></Search>
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
            <Grid item xs={12} pb={5}>
                <Divider >
                </Divider>
            </Grid>

        </Grid>
    );
};

export default SearchProperty;
