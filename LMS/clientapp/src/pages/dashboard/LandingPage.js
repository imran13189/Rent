import { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import {
    Link,
    AvatarGroup,
    Box,
    Button,
    Grid,
    FormLabel,
    Typography,
} from "@mui/material";


import Search from "./Search";
import { fetchProperties, locationSearch } from "./../../store/reducers/property";
import { useDispatch, useSelector } from "react-redux";
// ==============================|| DASHBOARD - DEFAULT ||============================== //
const processedNumbers = [];

const LandingPage = () => {
    const [value, setValue] = useState("today");
    const [slot, setSlot] = useState("week");
    const [selectedValue, setSelectedValue] = useState();
    const { properties } = useSelector((state) => state.property);
    const dispatch = new useDispatch();
    const getLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                 
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                    dispatch(fetchProperties({ page: 0, Long: longitude, Lat: latitude }));
                },
                (error) => {
                    console.error(`Error: ${error.message}`);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    useEffect(() => {
        getLocation();
    }, [])
    
    return (
        <Grid container Spacing={3} mt={10 }>
            {/* row 1 */}

            <Grid height={600}item sm={12} md={7} lg={7}>

                <div className="property" >&nbsp;</div>
                </Grid>
            
            <Grid item xs={12} sm={12} md={5} lg={5} >
                <Grid container Spacing={2.75}>
                <Grid
                  
                    item
                    xs={12}
                    lg={12}
                    mt={10}
                    >
                        <Typography variant="h1" sx={{ color: "text.primary" }}>
                            Welcome, <FormLabel sx={{ color: "action.main", fontSize: "2rem" }}>  Explore your abode</FormLabel>
                        </Typography>
                </Grid>
                <Grid
                  
                    item
                    xs={12}
                    sm={12}
                    md={12}
                        lg={12}
                        mt={5}
                >
                    <Box sx={{ width: "100%", color: (theme) => theme.palette.grey[500] }}>
                            <Search selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                    </Box>
                    </Grid>
                    <Grid

                        item
                        xs={12}
                        lg={12}
                        mt={1}
                    >
                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                            <FormLabel sx={{ color: "text.secondary", fontSize: "0.9rem" }}> <b>Top Localities: </b></FormLabel>
                            {properties.filter((value, index, self) =>
                                index === self.findIndex((obj) => obj.locationName === value.locationName)
                            ).map((item, i) => <Link key={i} component={RouterLink} to={"/list/"+item.locationName } sx={{ color: "text.secondary", fontSize: "0.9rem" }}>{item.locationName?.split(" ")[0] +", " }</Link>) }
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LandingPage;
