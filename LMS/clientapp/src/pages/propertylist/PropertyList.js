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

const PrpertyList = ({properties}) => {
    const [value, setValue] = useState("today");
    const [slot, setSlot] = useState("week");

    return (
        <Grid container spacing={5}>
            {
                properties?.map((item) => <Grid key={item.propertyId} item xs={12} sm={12} md={5} lg={6} mt={10}>
                    <Grid container sx={{ boxShadow: 1 }}>
                        <Grid item xs={4} sm={2} md={5} lg={3}>
                            <img className="property-list" src={ item.filePath} alt="" />
                        </Grid>
                        <Grid item xs={8} sm={10} md={5} lg={9}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={5} lg={12}>
                                    <Typography variant="h2" sx={{ color: "text.primary" }}>
                                        <FormLabel sx={{ color: "text.primary", fontSize: "0.9rem" }}>
                                         
                                            <b>
                                                {item.propertyType} {item.description}
                                            </b>
                                        </FormLabel>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                                        <Link sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                                            {item.locationName }
                                        </Link>
                                      
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <Typography variant="h2" sx={{ color: "text.primary" }}>
                                        <FormLabel sx={{ color: "text.primary", fontSize: "0.9rem" }}>
                                            Rs.{item.rentAmount}
                                           
                                        </FormLabel>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                                        <Link sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                                            <b>Rent</b>
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <Typography variant="h2" sx={{ color: "text.primary" }}>
                                        <FormLabel sx={{ color: "text.primary", fontSize: "0.9rem" }}>
                                           
                                            2500
                                        </FormLabel>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                                        <Link sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                                            Size in Sq.Ft
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} lg={4}>
                                    <Typography variant="h2" sx={{ color: "text.primary" }}>
                                        <FormLabel sx={{ color: "text.primary", fontSize: "0.9rem" }}>
                                            { item.availableFrom}
                                        </FormLabel>
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                                        <Link sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
                                            Available From
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                )
            }

        
        </Grid>
    );
};

export default PrpertyList;
