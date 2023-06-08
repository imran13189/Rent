import React from 'react';
import Chip from '@mui/material/Chip';
import {
   
    Stack
   
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    setSelectedLocation
} from "./../../store/reducers/contact";

const LocationChip = ({ locationList, deleteLocation, display, setOpenLocation }) => {
    const dispatch = useDispatch();
    const handleDelete = (index) => {
        deleteLocation(index);
    };

    const editLocation = (item) => {
         
        dispatch(setSelectedLocation({ locationDetails: item }));
        
        setOpenLocation(true);
    };
    return (
        <Stack direction="row" direction="row"
            justifyContent="flex-start"
            alignItems="center" spacing={1}>
            {locationList.map((item, index) =>
                <Chip
                    onClick={()=>editLocation(item)}
                    color="success" variant="outlined"
                    label={item[display]}
                    onDelete={() => handleDelete(item)}
                    variant="outlined"
                />)}
        </Stack>
    );
}

export default LocationChip;