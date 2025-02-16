import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DraggableMarker from './DraggableMarker';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import AnimateButton from 'components/@extended/AnimateButton';
import {
    Button,
    Grid,
    AlertTitle,
    Alert,
    Stack,
    Typography,
    Autocomplete
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPosition, setShowMapModal } from "./../../store/reducers/property";
import PropertyFiles from './PropertyFiles';
import PropertyService from './../../services/PropertyService';
import UserService from './../../services/UserService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '95%',  // 100% width on extra-small screens
        sm: '80%',   // 80% width on small screens
        md: '60%',   // 60% width on medium screens
        lg: '50%',   // 50% width on large screens
        xl: '50%',   // 40% width on extra-large screens
    },
    bgcolor: '#fff',
    borderRadius: '5px',
    p: 4,
};



const PhotoModal=({ open, setOpen, propertyId, setFiles })=> {
    const [options, setOptions] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [, setInputValue] = useState("");
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [files, setFormFiles] = useState([]);

    const savePhoto = async () => {
        setLoading(true);
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            let image = files[i];
            formData.append('formFiles', image);
        }

        formData.append('propertyId', propertyId);

        await PropertyService.SavePhoto(formData);
        const filesdata = await UserService.getPropertyFiles(propertyId);
        setFiles(filesdata);
        setLoading(false);
        setShowMessage(true);
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={() => { setOpen(false); setShowMessage(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <IconButton
                            aria-label="close"
                            onClick={() => { setOpen(false), setShowMessage(false) }}
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
                    {!showMessage&&<Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Stack spacing={1}>
                                <PropertyFiles setFormFiles={setFormFiles}></PropertyFiles>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} >
                            <Stack spacing={1}>
                                <AnimateButton>
                                    <LoadingButton loading={loading} fullWidth size="large" onClick={savePhoto} variant="contained" sx={{ bgcolor: 'action.main' }}>
                                        {loading ? 'disabled' : 'Upload'}
                                    </LoadingButton>
                                </AnimateButton>
                            </Stack>
                        </Grid>

                    </Grid>}
                    {showMessage &&<Grid className={`${showMessage ? 'show' : 'hide'}`} container spacing={3}>
                        <Grid item xs={12}>
                            <Stack sx={{ width: '100%' }} spacing={2}>
                                <Alert severity="success">
                                    <AlertTitle>Success</AlertTitle>
                                    Your photos saved successfully!
                                </Alert>
                            </Stack>
                        </Grid>
                       
                    </Grid>}
                </Box>
            </Modal>
          
        </div>
    );
}

export default PhotoModal;