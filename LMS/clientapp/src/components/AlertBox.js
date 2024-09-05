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
    FormHelperText,
    Button,
    Alert,
    AlertTitle
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setShowAlertBox } from "./../store/reducers/users";

import { useEffect } from 'react';
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

const AlertBox = () => {
    const dispatch = new useDispatch();
    const { alertBox } = useSelector((state) => state.users);
    const handleClose = () => dispatch(setShowAlertBox({ show: false }));


    return (
        <div>

            <Modal
                open={alertBox?.show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                   
                    <Grid  container spacing={3}>
                        <Grid item xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    {alertBox?.message }
                                </Alert>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Button
                                    onClick={handleClose}
                                    variant="contained"
                                    title="Post new Ad"
                                    sx={{ color: 'common.white', bgcolor: 'action.main' }}

                                >

                                   Close
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default AlertBox;