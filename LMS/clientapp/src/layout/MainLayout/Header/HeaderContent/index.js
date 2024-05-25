// material-ui
import { Box, Button, useMediaQuery } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const { userDetails } = useSelector((state) => state.users);

    useEffect(() => {
        const ddd = userDetails;
      
    }, [userDetails]);
  return (
    <>
      {/*!matchesXs && <Search />*/}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
          {!userDetails && <Box sx={{ ml: 1 }}  >
              <Button
                  component={Link}
                  to="login"
                  variant="contained"
                  title="Download Free Version"
                  sx={{ color: 'common.white', bgcolor: 'action.main' }}

              >

                  Sign&nbsp;In
              </Button>
          </Box>}
          <Box sx={{  ml: 1 }}>
          <Button
              component={Link}
                  to={userDetails?'property':'login'}
              variant="contained"
              title="Download Free Version"
                  sx={{ color: 'common.white', bgcolor: 'action.main' }}

          >

              Post&nbsp;Ad
          </Button>
          </Box>
          {userDetails && <Notification />}
          {!matchesXs && userDetails && <Profile />}
          {matchesXs && userDetails && <MobileSection />}
    </>
  );
};

export default HeaderContent;
