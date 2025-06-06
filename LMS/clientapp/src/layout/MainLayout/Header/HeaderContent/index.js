// material-ui
import { Box, Button, useMediaQuery } from '@mui/material';
import { GithubOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchWishList, fetchMessages, fetchUserList } from './../../../../store/reducers/users';
import { setUserProperty } from './../../../../store/reducers/property';
// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const { userDetails } = useSelector((state) => state.users);
    const location = useLocation();
    const navigate = new useNavigate();

    const dispatch = new useDispatch();
    const handlePost = () => {
       
        dispatch(setUserProperty({ userProperty: null }));
        navigate("/property");
    }

  useEffect(() => {
    if (userDetails) {
      dispatch(fetchWishList());
      dispatch(fetchMessages());
      dispatch(fetchUserList());
    }
  }, [userDetails]);

  return (
    <>
      {/*!matchesXs && <Search />*/}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
      {!userDetails && (
        <Box sx={{ ml: 1 }}>
          <Button
            component={Link}
            to="login"
            variant="contained"
            title="Download Free Version"
            sx={{ color: 'common.white', bgcolor: 'action.main' }}
          >
            Sign&nbsp;In
          </Button>
        </Box>
      )}
      {!(location.pathname.indexOf('property') > -1) && (
        <Box sx={{ ml: 1 }}>
          <Button
                      onClick={handlePost}
            variant="contained"
            title="Download Free Version"
            sx={{ color: 'common.white', bgcolor: 'action.main' }}
          >
            Post&nbsp;Ad
          </Button>
        </Box>
      )}
      {userDetails && <Notification />}
      {!matchesXs && userDetails && <Profile />}
      {matchesXs && userDetails && <MobileSection />}
    </>
  );
};

export default HeaderContent;
