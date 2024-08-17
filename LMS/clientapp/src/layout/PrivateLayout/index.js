import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import { Route, Navigate } from 'react-router-dom';
import Header from '../MainLayout/Header';

// ==============================|| MAIN LAYOUT ||============================== //

const PrivateLayout = () => {

    const dispatch = useDispatch();
    const { userDetails } = useSelector((state) => state.users);

    return (
        userDetails ? (
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Header open={true} handleDrawerToggle={false} />
                <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                    <Outlet />
                </Box>
            </Box>

        ) : (
            <Navigate to="/login" />
        )
    );
};

export default PrivateLayout;
