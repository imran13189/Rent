import { useState } from "react";

// material-ui
import {
    Grid, Stack
} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
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
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
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
                    <Card sx={{ display: 'flex', maxWidth: '100%', flexDirection: 'row' }}>

                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={item.filePath}
                            alt="Paella dish"
                        />

                        <CardContent sx={{ maxWidth: '100%' }}>
                            <Grid container spacing={3} >
                                <Grid item xs={12} sm={10} md={5} lg={12} >
                                    <Typography variant="h3" color="text.secondary">
                                        {item.description}
                                    </Typography>

                                    <Box sx={{ ml: -1, maxWidth: '100%' }}>
                                        <IconButton aria-label="add to favorites">
                                            <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                                        </IconButton>
                                        <Typography variant="body3" color="text.secondary">
                                            Dehradun, Uttarakhand, India
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={10} md={5} lg={4} >
                                    <Typography variant="body2" color="text.secondary">
                                        Rent
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        &#8377; {item.rentAmount}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={10} md={5} lg={4} >
                                    <Typography variant="body2" color="text.secondary">
                                        Type
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {item.isFurnished}
                                    </Typography>

                                </Grid>
                                <Grid item xs={12} sm={10} md={5} lg={4} >
                                    <Typography variant="body2" color="text.secondary">
                                        Available from
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {item.availableFrom}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>

                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                            
                        </Box>

                    </Card>
                </Grid>

            )
            }
        </Grid>
    );
};

export default PropertyList;
