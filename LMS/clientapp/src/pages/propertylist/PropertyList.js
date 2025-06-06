import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Config from './../../services/config';
// material-ui components
import {
  Grid,
  Stack,
  Card,
  CardActionArea,
  Paper,
  Box,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
    Button,
  Avatar,
  IconButton,
  Typography,
  Divider
} from '@mui/material';
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
import { fetchWishList, setShowMessageBox, setShowContactBox, setShowLoginModal } from './../../store/reducers/users';
import AnimateButton from "components/@extended/AnimateButton";
import { fetchProperties, locationSearch } from "./../../store/reducers/property";
import CircularProgress from '@mui/material/CircularProgress';
// custom component

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const PropertyList = () => {
    
    const [slot, setSlot] = useState('week');
    const [loading, setLoading] = useState(true);
    const { properties, selectedLocation } = useSelector((state) => state.property);
  const { wishList, userDetails } = useSelector((state) => state.users);
  const [expanded, setExpanded] = useState(false);
    const dispatch = new useDispatch();


  const updateWishList = async (propertyId) => {
    await ProperyService.SaveWishList(userDetails?.userId, propertyId).then(() => {
      dispatch(fetchWishList());
    });
  };

    const handleLoadMore = () => {

        dispatch(locationSearch({ ...selectedLocation, page: selectedLocation?.page + 1 }));
        //dispatch(fetchProperties(selectedLocation)); 
    };

 
    useEffect(() => {
        // Stop loader when properties load
        debugger;
        if (properties && properties.length > 0) {
            setLoading(false);
        }
    }, [properties]);


    return (
        <> {loading ? (
            <Box
                position="fixed"
                top={0}
                left={0}
                width="100vw"
                height="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(255,255,255,0.7)" // optional: to dim background
                zIndex={9999}
            >
                <CircularProgress size="60px" sx={{ color: 'action.main' }} />
            </Box>
        ) : (
            <Grid container spacing={3}>
                {properties?.map((item) => (
                    <Grid key={item.propertyId} item xs={12} sm={10} md={5} lg={6}>
                        <Card sx={{ maxWidth: '100%' }}>
                            <CardActionArea target="_blank" href={Config.appUrl + item.propertyUrl}>
                                <CardMedia sx={{ height: 140 }} image={Config.appUrl + item.filePath} title="green iguana" />
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
                                    alignSelf: 'stretch',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-start',
                                    p: 0
                                }}
                            >
                                <IconButton
                                    aria-label="add to favorites"
                                    onClick={() =>
                                        userDetails == null ? dispatch(setShowLoginModal({ showLoginModal: true })) : updateWishList(item?.propertyId)
                                    }
                                >
                                    {wishList.some((x) => x.propertyId === item.propertyId) ? (
                                        <FavoriteIcon sx={{ color: 'action.main' }} />
                                    ) : (
                                        <FavoriteBorderOutlinedIcon sx={{ color: 'action.default' }} />
                                    )}
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon sx={{ color: 'action.default' }} />
                                </IconButton>
                                <IconButton
                                    aria-label="call"
                                    onClick={() => dispatch(setShowContactBox({ showContactBox: true, PropertyUserId: item.userId }))}
                                >
                                    <PhoneInTalkOutlinedIcon sx={{ color: 'action.default' }} />
                                </IconButton>
                                <IconButton
                                    aria-label="message"
                                    onClick={() => dispatch(setShowMessageBox({ showMessageBox: true, PropertyUserId: item.userId }))}
                                >
                                    <MessageOutlinedIcon sx={{ color: 'action.default' }} />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>

                ))}
            </Grid>
        )
        }
       {
        !loading && properties?.length >= 10 && (

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
            >
                <AnimateButton>
                    <Button
                        onClick={handleLoadMore}
                        disabled={loading}
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        sx={{ color: 'common.white', bgcolor: 'action.main' }}
                    >
                        Load More
                    </Button>
                </AnimateButton>
            </Box>

        )
            }
    </>
  );
};

export default PropertyList;
