import { useEffect, useState } from "react";

import { Grid, Box, Typography, Button, IconButton } from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import UserService from "./../../services/UserService";
import { useParams } from "react-router-dom";
import { setSelectedPosition } from "./../../store/reducers/property";
import DraggableMarker from './../property/DraggableMarker';
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "./../../store/reducers/property";
const Details = () => {
    let params = useParams();
    /* const { properties } = useSelector((state) => state.property);*/
    const [item, setProperty] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.id) {
            const fetchData = async () => {
                const property = await UserService.getProperty(params.id);
                setProperty(property);
                dispatch(setSelectedPosition({ positionDetails: { lat: property.lat, lng: property.long, LocationName: property.locationName } }));

                dispatch(fetchProperties({
                    page: 0,
                    LocationId: property?.locationId,
                    LocationName: null,
                    Long: property.long,
                    Lat: property.lat
                }))
            };
            fetchData();
        }
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={10} md={5} lg={12}>
                    <Typography variant="h1" color="text.primary">
                        {item.description}
                    </Typography>

                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"  
                        justifyContent="flex-start"  
                        sx={{ ml: -1, maxWidth: "100%" }}
                    >
                        <IconButton aria-label="add to favorites">
                            <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                        </IconButton>
                        <Typography variant="h5" color="text.secondary">
                            {item.locationName}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={10} md={5} lg={4}>
                    <Typography variant="h5" color="text.secondary">
                        Rent
                    </Typography>
                    <Typography variant="h4" color="text.primary">
                        &#8377; {item.rentAmount}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={10} md={5} lg={4}>
                    <Typography variant="h5" color="text.secondary">
                        Type
                    </Typography>
                    <Typography variant="h4" color="text.primary">
                        {item.isFurnished}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={10} md={5} lg={4}>
                    <Typography variant="h5" color="text.secondary">
                        Available from
                    </Typography>
                    <Typography variant="h4" color="text.primary">
                        {item.availableFrom}
                    </Typography>
                </Grid>

                <Grid item xs={6} sm={10} md={5} lg={4}>
                    <Typography variant="h5" color="text.secondary">
                        Parking
                    </Typography>
                    <Typography variant="h4" color="text.primary">
                        {item.parking}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={10} md={5} lg={4}>
                    <Typography variant="h5" color="text.secondary">
                        Bathroom
                    </Typography>
                    <Typography variant="h4" color="text.primary">
                        {item.bathrooms}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={10} md={5} lg={4}>
                    <Typography variant="h5" color="text.secondary">
                        Available for
                    </Typography>
                    <Typography variant="h4" color="text.primary">
                        {item.availableFor}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={10} md={5} lg={12} mt={5}>
                    <Grid item xs={12}>
                            <Button fullWidth size="large" type="submit" variant="contained" sx={{ bgcolor: "action.main" }}>
                               Contact for more details
                            </Button>
                    </Grid>

                </Grid>

                <Grid item xs={12} mt={5} lg={9}>
                    <Typography variant="h3" color="text.secondary">
                        Locate on map
                    </Typography>
                    <DraggableMarker></DraggableMarker>
                </Grid>
            </Grid>
        </>
    );
};

export default Details;
