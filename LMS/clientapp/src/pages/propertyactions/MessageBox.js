import { useState} from 'react';
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
    Button
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { setShowMessageBox, fetchMessages, setShowAlertBox } from "./../../store/reducers/users";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import MasterService from './../../services/MasterService';
import UserService from './../../services/UserService';
import createSignalRConnection from "./../../signalr/signalRService";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 800,
    bgcolor: '#fff',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};


export default function MessageBox() {

    const [options, setOptions] = useState([]);
    const [connection, setConnection] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleClose = () => dispatch(setShowMessageBox({ showMessageBox: false }));
    const dispatch = useDispatch();
    const { showMessageBox, userDetails, PropertyUserId} = useSelector((state) => state.users);

    const SignupSchema = Yup.object().shape({
        Message: Yup.string().required("Please enter message."),
       
    });

    useEffect(() => {
        const connect = async () => {
            const newConnection = createSignalRConnection();

            newConnection.on("ReceiveMessage", (user, message) => {
                debugger;
                if (userDetails?.userId === user) {
                    dispatch(fetchMessages());
                }
            });

            await newConnection
                .start()
                .then(() => console.log("Connected to SignalR"))
                .catch((error) => console.error("Connection failed: ", error));

            setConnection(newConnection);
        };

        connect();

        // Cleanup on unmount
        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, []);

    const sendMessage = async (userMessage) => {
        debugger;
        if (connection && userMessage) {
            try {
                await connection.invoke("SendMessage", userMessage.SentTo, userMessage.Message);
                setUserMessage("");
            } catch (error) {
                console.error("Message send failed: ", error);
            }
        }
    };
    return (
        <div>

            <Modal
                open={showMessageBox}
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
                            Message: ""
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                const message = { UserId: userDetails?.userId, Message: values.Message, SentTo: PropertyUserId };
                                const result = await UserService.SaveMessage(message);
                                dispatch(setShowAlertBox({ showMessageBox:false, show: true, message: result?.message, color:'success.light' }))
                               
                                sendMessage(message);
                                setSubmitting(false);
                            } catch (err) {
                                console.error(err);
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, handleChange, handleSubmit, isSubmitting, handleBlur, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    
                                    <Grid item xs={12} >
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="description-signup">Please enter message</InputLabel>
                                            <TextField
                                                id="outlined-textarea"
                                                label=""
                                                placeholder="Message"
                                                name="Message"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.Message}
                                                multiline
                                            />

                                        </Stack>
                                        {touched.Message && errors.Message && (
                                            <FormHelperText error id="helper-text-Message-signup">
                                                {errors.Message}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button onBlur={handleChange}  fullWidth size="large" type="submit" variant="contained" sx={{ bgcolor: "action.main" }}>
                                             Sent
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