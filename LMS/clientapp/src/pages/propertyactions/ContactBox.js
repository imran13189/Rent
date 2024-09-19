import { useEffect,useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Collapse,
    Avatar

} from '@mui/material';
import { green } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from "react-redux";
import { setShowContactBox } from "./../../store/reducers/users";

import UserService from './../../services/UserService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 800,
    bgcolor: '#fff',
    border: '2px solid #000',
   
    p: 4,
};

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    '& .MuiCardHeader-subheader': {
        fontSize: '1rem', // Increase font size of subheader
    },
}));




export default function ContactBox() {
   
    const [userData, setUserData] = useState({});
    const handleClose = () => dispatch(setShowContactBox({ showContactBox: false }));
    const dispatch = useDispatch();
    const { showContactBox, userDetails, PropertyUserId } = useSelector((state) => state.users);

    useEffect(() => {
        if (showContactBox) {
            const fetchUserData = async () => {
                const data = await UserService.getUser(PropertyUserId);
                setUserData(data);
            }
            fetchUserData();
        }

    }, [showContactBox]);
    return (
        <div>

            <Modal
                open={showContactBox}
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


                    <Card elevation={0} sx={{minWidth:'300px'} }>
                        <StyledCardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                                    {userData?.Name?.charAt(0)}
                                </Avatar>
                            }
                           
                            title={userData?.Name}
                            subheader={userData?.Mobile }
                        />
                        <CardActions disableSpacing sx={{
                                    alignSelf: "stretch",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-start",
                                    p: 0,
                                }}>
                            <IconButton aria-label="share">
                                <ShareIcon sx={{ color: 'action.main' }} />
                            </IconButton>
                            <IconButton aria-label="call" onClick={() => window.location.href = "tel:" + userData?.Mobile} >
                                <PhoneInTalkOutlinedIcon sx={{ color: green[500] }} />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}