import { useState } from "react";
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


// ==============================|| DASHBOARD - DEFAULT ||============================== //

const LandingPage = () => {
    const [value, setValue] = useState("today");
    const [slot, setSlot] = useState("week");
    const [selectedValue, setSelectedValue] = useState();
    
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
                            <FormLabel sx={{ color: "text.secondary", fontSize: "0.9rem" }}> <b>Top Localities:</b></FormLabel> <Link sx={{ color: "text.secondary", fontSize: "0.9rem" }}>Turner Road, </Link>
                            <Link component={RouterLink} to="/list" sx={{ color: "text.secondary", fontSize: "0.9rem"  }}>Majra</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default LandingPage;
