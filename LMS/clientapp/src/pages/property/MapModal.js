import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DraggableMarker from './DraggableMarker';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MasterService from './../../services/MasterService';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import {
    TextField,
    Grid,
    InputAdornment,
    InputLabel,
    Stack,
    Typography,
    Autocomplete
} from '@mui/material';
import { useDispatch } from "react-redux";
import { setSelectedPosition } from "./../../store/reducers/property";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function MapModal({ open, setOpen }) {
    const [options, setOptions] = React.useState([]);
    //const [selectedPosition, setSelectedPosition] = React.useState(center);
    const [, setInputValue] = React.useState("");
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    //const { positionDetails } = useSelector((state) => state.property);

    const handleLocations = (event) => {
    
        setInputValue(event.target.value);
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

    const handleLocation = (event,value) => {
        dispatch(setSelectedPosition({ positionDetails: { lat: value.Lat, lng: value.Long } }))
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            
            <Modal
                open={open}
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
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Stack spacing={1}>
                                <InputLabel htmlFor="firstname-signup">Location*</InputLabel>
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
                                    onChange={(event, value)=>handleLocation(event,value)}
                                    getOptionLabel={(option) => typeof option === "string" ? option : option.LocationName}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Search input"
                                            onChange={handleLocations}
                                            InputProps={{
                                                ...params.InputProps,
                                                type: 'search',
                                                endAdornment: (
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

                              
                            </Stack>
                        </Grid>
                    </Grid>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <DraggableMarker ></DraggableMarker>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}