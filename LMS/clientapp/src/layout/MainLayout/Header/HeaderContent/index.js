// material-ui
import { Box, Button, useMediaQuery } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {/*!matchesXs && <Search />*/}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

          <Button
              component={Link}
              to="/login"
              variant="contained"
              title="Download Free Version"
              sx={{ color: 'common.white', bgcolor: 'text.main' }}

          >
             
        Sign&nbsp;In         
      </Button>

      <Notification />
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
