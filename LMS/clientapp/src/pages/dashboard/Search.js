// material-ui
import { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment, Autocomplete, Stack } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom"
// assets
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import { useDispatch, useSelector } from "react-redux";
import MasterService from './../../services/MasterService'

import { locationSearch } from "./../../store/reducers/property";

const Search = () => {

    const [options, setOptions] = useState([]);
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const onClickHandler = () => navigate(`/list/123/`)
    const { selectedLocation } = useSelector((state) => state.property);
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


    return (
        <Autocomplete
            autoComplete
            includeInputInList
            freeSolo
            disableOpenOnFocus
            p={0}
            value={selectedLocation?.LocationName}
            filterOptions={x => {
                return x;
            }}
            id="free-solo-2-demo"
            disableClearable
            options={options}
            onChange={(event, value) => {
              
                if (!(location.pathname.indexOf("list") > -1)) {
                    onClickHandler();
                    dispatch(locationSearch({ ...value, page: 0 }));
                    
                }
                else {
                    dispatch(locationSearch({ ...value, page: 0 }));
                }
            }}
            getOptionLabel={(option) => typeof option === "string" ? option : option.LocationName}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Search location"
                    onChange={handleLocations}
                    InputProps={{
                        style: { padding: location.pathname.indexOf("list") > -1?4:9 },
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
        
    );
}

export default Search;
