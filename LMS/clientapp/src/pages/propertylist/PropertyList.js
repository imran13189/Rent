import { useState } from "react";

// material-ui
import {
    Link,
    Divider,
    Box,
    Button,
    Grid,
    FormLabel,
    Typography,
} from "@mui/material";



// ==============================|| DASHBOARD - DEFAULT ||============================== //

const PrpertyList = () => {
    const [value, setValue] = useState("today");
    const [slot, setSlot] = useState("week");

    return (
       
        <Grid item xs={12} sm={12} md={5} lg={12} mt={10 }>
            <Grid container Spacing={3}  >
            <Grid item xs={4} sm={2} md={5} lg={2} >
                    <img className="property-list" src="p2.jpg" alt="" />
            </Grid>
            <Grid item xs={8} sm={10} md={5} lg={5} >
                <Grid container>
                    <Grid item xs={12} sm={12} md={5} lg={12} >
                        <Typography variant="h2" sx={{ color: "text.primary" }}>
                            <FormLabel sx={{ color: "text.primary", fontSize: "0.9rem" }}> <b>1BHK Independent House</b></FormLabel> 
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.primary" }}>
                             <Link sx={{ color: "text.secondary", fontSize: "0.75rem" }}>Turner Road, </Link>
                            <Link sx={{ color: "text.secondary", fontSize: "0.75rem" }}>Majra</Link>
                        </Typography>
                        </Grid>
                        <Grid item xs={6} lg={6} >
                            <Typography variant="h2" sx={{ color: "text.primary" }}>
                                <FormLabel sx={{ color: "text.primary", fontSize: "0.9rem" }}> <b>Rent</b></FormLabel>
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.primary" }}>
                                <Link sx={{ color: "text.secondary", fontSize: "0.75rem" }}>Rs. 50000 </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} lg={6} >
                            <Typography variant="h2" sx={{ color: "text.primary" }}>
                                <FormLabel sx={{ color: "text.primary", fontSize: "0.9rem" }}> 2500</FormLabel>
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.primary" }}>
                                <Link sx={{ color: "text.secondary", fontSize: "0.75rem" }}>Size in Sq.Ft</Link>
                            </Typography>
                        </Grid>
                        
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    );
};

export default PrpertyList;
