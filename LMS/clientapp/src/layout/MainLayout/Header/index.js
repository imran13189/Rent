import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Typography, Toolbar, useMediaQuery,Box } from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const Header = ({ open, handleDrawerToggle }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';

  // common header
    const mainHeader = (
        <Toolbar>
           
            <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
                <Typography
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                    edge="start"
                    sx={{ ml: { xs: 0, lg: -2 } }}><h1>Imeshma</h1>
                </Typography>
            </Box>
            <HeaderContent />
        </Toolbar>
    );

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
     // borderBottom: `1px solid ${theme.palette.divider}`
      //boxShadow: theme.customShadows.z1
    }
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default Header;
