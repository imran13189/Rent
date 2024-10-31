import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import {
   
    CardHeader,
  
    Typography,
  

} from '@mui/material';
import AuthLogin from "./../authentication/auth-forms/AuthLogin";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginModal } from "./../../store/reducers/users";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '95%',  // 100% width on extra-small screens
        sm: '80%',   // 80% width on small screens
        md: '60%',   // 60% width on medium screens
        lg: '30%',   // 50% width on large screens
        xl: '25%',   // 40% width on extra-large screens
    },
    bgcolor: '#fff',
    borderRadius: '5px',
    p: 4,
};



const LoginModal = () => {

    const handleClose = () => dispatch(setShowLoginModal({ showLoginModal: false }));
    const dispatch = useDispatch();
    const { showLoginModal } = useSelector((state) => state.users);


    return (
        <div>
            <Modal
                open={showLoginModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h3">Sign In / Register</Typography>

                    <AuthLogin />
                </Box>
            </Modal>
        </div>
    );
}

export default LoginModal;