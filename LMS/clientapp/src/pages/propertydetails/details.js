import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Typography, Divider, IconButton } from "@mui/material";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import UserService from "./../../services/UserService";
import { useParams } from "react-router-dom";

const Details = () => {
    let params = useParams();
    /* const { properties } = useSelector((state) => state.property);*/
    const [item, setProperty] = useState({});

    useEffect(() => {
        if (params.id) {
            const fetchData = async () => {
                const property = await UserService.getProperty(params.id);
                setProperty(property);
            };
            fetchData();
        }
    }, []);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={10} md={5} lg={12}>
                    <Typography variant="h5" color="text.primary">
                        {item.description}
                    </Typography>

                    <Box sx={{ ml: -1, maxWidth: "100%" }}>
                        <IconButton aria-label="add to favorites">
                            <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
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
        </>
    );
};

export default Details;
