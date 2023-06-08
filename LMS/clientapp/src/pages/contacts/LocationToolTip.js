import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import {
    Select,
    MenuItem,
    InputLabel,
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    CardActions,
    Box,
    Menu,
    Chip,
    Grid,
    Stack,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {
    setSelectedLocation
} from "./../../store/reducers/contact";
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#fff",
        // color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 370,
        opacity: 0,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
}));

const colors = [
    "#5A9DF9",
    "#1CC778",
    "#1CC778",
    "#FAAB49",
    "#5A9DF9",
    "#1387BE",
    "#FF5F6F",
    "#E0465E",
];

const LocationTootTip = ({ deleteLocation, setOpenLocation }) => {
    const { contactDetails } = useSelector((state) => state.contact);
    const dispatch = useDispatch();
    const handleDelete = (index) => {
        deleteLocation(index);
    };

    const editLocation = (item) => {
         
        dispatch(setSelectedLocation({ locationDetails: item }));

        setOpenLocation(true);
    };
    useEffect(() => {
      
    }, [contactDetails]);

    return contactDetails?.locationList?.map((item, index) => {
        var datadocl = colors[index];
        return (
            <>
                <HtmlTooltip
                    arrow
                    title={
                        <Card sx={{ width: 350, boxShadow: "none" }}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                pt={1}
                            ></Box>
                            <CardHeader
                                
                                title={item.locationName}
                                subheader={item.inventoryAmount}
                                action={
                                    <>
                                        {item.monthlySales && (
                                            <Grid item>
                                                <Chip
                                                    variant="combined"
                                                    color={item.color}
                                                    icon={
                                                        <>
                                                            {item.monthlySales && (
                                                                <CurrencyRupeeOutlinedIcon
                                                                    style={{
                                                                        fontSize: "0.75rem",
                                                                        color: "inherit",
                                                                    }}
                                                                />
                                                            )}
                                                        </>
                                                    }
                                                    label={`${item.monthlySales}`}
                                                    sx={{ ml: 1.25, pl: 1 }}
                                                    size="small"
                                                />
                                            </Grid>
                                        )}
                                    </>
                                }
                            />

                            <CardContent>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <HomeOutlinedIcon />
                                    {item.address}
                                </div>
                            </CardContent>
                        </Card>
                    }
                    placement="top"
                >
                   
                    <Chip
                        onClick={() => editLocation(item)}
                        color="success"
                        variant="outlined"
                        label={item.locationName}
                        onDelete={() => handleDelete(item)}
                        variant="outlined"
                    />
                </HtmlTooltip>
            </>
        );
    });
};

export default LocationTootTip;
