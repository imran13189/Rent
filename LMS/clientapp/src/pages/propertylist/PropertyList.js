import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// material-ui components
import {
    Grid, Stack, Card, CardActionArea, Paper, Box, CardHeader, CardMedia, CardContent,
    CardActions, Collapse, Avatar, IconButton, Typography, Divider
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// material-ui icons
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProperyService from './../../services/PropertyService';
import { fetchWishList, setShowMessageBox, setShowContactBox } from "./../../store/reducers/users";

// custom component


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const PropertyList = () => {
    const [value, setValue] = useState("today");
    const [slot, setSlot] = useState("week");
    const { properties } = useSelector((state) => state.property);
    const { wishList, userDetails } = useSelector((state) => state.users);
    const [expanded, setExpanded] = useState(false);
    const dispatch = new useDispatch();
    const updateWishList = async (propertyId) => {
      
        await ProperyService.SaveWishList(userDetails?.userId, propertyId).then(() => {
            dispatch(fetchWishList());
        });
    };

    return (
        <Grid container spacing={3}>
            {properties?.map((item) => (
                <Grid key={item.propertyId} item xs={12} sm={10} md={5} lg={6}>
                    <Card sx={{ maxWidth: '100%' }}>
                        <CardActionArea target="_blank" href={item.propertyUrl}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={item.filePath}
                                title="green iguana"
                            />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={10} md={5} lg={12}>
                                        <Typography variant="h5" color="text.primary">
                                            {item.description}
                                        </Typography>

                                        <Box sx={{ ml: -1, maxWidth: '100%' }}>
                                            <IconButton aria-label="location">
                                                <LocationOnOutlinedIcon />
                                            </IconButton>
                                            <Typography variant="body3" color="text.secondary">
                                                {item.locationName}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={10} md={5} lg={4}>
                                        <Typography variant="body2" color="text.secondary">
                                            Rent
                                        </Typography>
                                        <Typography variant="body1" color="text.primary">
                                            &#8377; {item.rentAmount}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={10} md={5} lg={4}>
                                        <Typography variant="body2" color="text.secondary">
                                            Type
                                        </Typography>
                                        <Typography variant="body1" color="text.primary">
                                            {item.isFurnished}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={10} md={5} lg={4}>
                                        <Typography variant="body2" color="text.secondary">
                                            Available from
                                        </Typography>
                                        <Typography variant="body1" color="text.primary">
                                            {item.availableFrom}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                            <Divider />
                            <CardActions
                                sx={{
                                    alignSelf: "stretch",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-start",
                                    p: 0,
                                }}
                        >
                            <IconButton aria-label="add to favorites" onClick={() => updateWishList(item?.propertyId)}>

                                    {wishList.some(x => x.propertyId ===item.propertyId) ? (
                                        <FavoriteIcon sx={{ color: 'action.main' }} />
                                    ) : (
                                            <FavoriteBorderOutlinedIcon sx={{ color: 'action.default' }} />
                                    )}
                                    
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon sx={{ color: 'action.default' }} />
                                </IconButton>
                            <IconButton aria-label="call" onClick={() => dispatch(setShowContactBox({ showContactBox: true, PropertyUserId:item.userId }))} >
                                    <PhoneInTalkOutlinedIcon sx={{ color: 'action.default' }} />
                            </IconButton>
                            <IconButton aria-label="message" onClick={() => dispatch(setShowMessageBox({ showMessageBox:true }))}>
                                    <MessageOutlinedIcon sx={{ color: 'action.default' }} />
                                </IconButton>
                            </CardActions>
                       
                    </Card>
                </Grid>
            ))}
         
        </Grid>
    );
};

export default PropertyList;
