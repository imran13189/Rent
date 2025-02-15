import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Drawer from './Drawer';
import Header from './Header';
import {  useMatch } from "react-router-dom";
import AuthFooter from './../../components/cards/AuthFooter';

const MainLayout = () => {

    const match = useMatch('/:url/:id');

    return (
        <>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Header open={false} handleDrawerToggle={false} />
                <Drawer open={false} handleDrawerToggle={false} />
                <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                    <Outlet />
                </Box>
            </Box>
            <AuthFooter />
        </>
    );
};

export default MainLayout;
