import { useState } from "react";

// material-ui
import {
    Grid, Stack
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { Card, CardActionArea } from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Divider from '@mui/material/Divider';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DraggableMarker from './../property/DraggableMarker';
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
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    return (

        <Grid container spacing={3} >
            {properties?.map((item) =>
                <Grid key={item.propertyId} item xs={12} sm={10} md={5} lg={6} >
                    <Card sx={{ maxWidth: '100%' }}>
                        <CardActionArea target="_blank" href={item.propertyUrl}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={item.filePath}
                            title="green iguana"
                        />
                        <CardContent>
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={10} md={5} lg={12} >
                                            <Typography variant="h5" color="text.primary">
                                                {item.description}
                                            </Typography>

                                            <Box sx={{ ml: -1, maxWidth: '100%' }}>
                                                <IconButton aria-label="add to favorites">
                                                    <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                                                </IconButton>
                                                <Typography variant="body3" color="text.secondary">
                                            {item.locationName }
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6} sm={10} md={5} lg={4} >
                                            <Typography variant="body2" color="text.secondary">
                                                Rent
                                            </Typography>
                                            <Typography variant="body1" color="text.primary">
                                                &#8377; {item.rentAmount}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={10} md={5} lg={4} >
                                            <Typography variant="body2" color="text.secondary">
                                                Type
                                            </Typography>
                                            <Typography variant="body1" color="text.primary">
                                                {item.isFurnished}
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={6} sm={10} md={5} lg={4} >
                                            <Typography variant="body2" color="text.secondary">
                                                Available from
                                            </Typography>
                                            <Typography variant="body1" color="text.primary">
                                                {item.availableFrom}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                        </CardContent>
                        <Divider  />
                        <CardActions sx={{
                            alignSelf: "stretch",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                            p: 0,
                        }}>
                            <IconButton   aria-label="add to favorites">
                                <FavoriteBorderOutlinedIcon sx={{ color: 'action.default' }}  />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                <ShareIcon sx={{ color: 'action.default' }} />
                                    </IconButton>
                            <IconButton aria-label="share">
                                <PhoneInTalkOutlinedIcon sx={{ color: 'action.default' }} />
                            </IconButton>
                            <IconButton aria-label="share">
                                <MessageOutlinedIcon sx={{ color: 'action.default' }} />
                            </IconButton>

                           
                            </CardActions>
                        </CardActionArea>
                    </Card>
                   
                </Grid>

            )
            }

            <Grid item xs={12} mt={5} lg={9}>
                <Typography variant="h3" color="text.secondary">
                    Locate on map
                </Typography>
                <DraggableMarker></DraggableMarker>
            </Grid>
        </Grid>
    );
};

export default PropertyList;
