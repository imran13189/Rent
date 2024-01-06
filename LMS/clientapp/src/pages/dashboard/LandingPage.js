import { useState } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import Search from './Search';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const LandingPage = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');

    return (
        <Grid container  columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} lg={12} >
                <Box display="flex" justifyContent="center"   sx={{ color: (theme) => theme.palette.grey[500] }}>
                    <h1>Search your rent house</h1>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={12} >
                <Box  justifyContent="center" sx={{ color: (theme) => theme.palette.grey[500] }}>
                    <Search />
                </Box>
            </Grid>

        </Grid>
    );
};

export default LandingPage;
