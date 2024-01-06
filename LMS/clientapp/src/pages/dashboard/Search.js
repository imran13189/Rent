// material-ui
import { useState } from 'react';
import { Box, TextField, InputAdornment, Autocomplete, Stack } from '@mui/material';

// assets
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import { useDispatch } from "react-redux";

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {

    const [options, setOptions] = useState([]);
    const [, setInputValue] = useState("");
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const handleLocations = (event) => {

        setInputValue(event.target.value);
        setOptions([]);
        if (event.target.value.length > 2) {
            //MasterService.getLocations(event).then((data) => {
            //    setOptions(data);
            //});
        }
        else {
            setOptions([]);
        }

    }

    const handleLocation = (event, value) => {
        debugger;
        dispatch(setSelectedPosition({ positionDetails: { lat: value.Lat, lng: value.Long, LocationName: value.LocationName, LocationId: value.LocationId } }));
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
       
           
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
                    onChange={(event, value) => handleLocation(event, value)}
                    getOptionLabel={(option) => typeof option === "string" ? option : option.LocationName}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search location"
                            onChange={handleLocations}
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                                startAdornment: (
                                    < InputAdornment position="end" >
                                        <LocationOnOutlined
                                            aria-label="toggle password visibility"

                                            onMouseDown={handleMouseDownPassword}
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
