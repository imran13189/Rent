import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// project import
import Logo from './Logo';
import { setProperties } from "./../../store/reducers/property";


// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ sx, to }) => {
 /* const { defaultId } = useSelector((state) => state.menu);*/
    const navigate = useNavigate()
    const dispatch = new useDispatch();

  return (
    <ButtonBase
      disableRipple
          onClick={() => {
              navigate(`/`);
              dispatch(setProperties({ properties: [] }));
          }}

      sx={sx}
    >
      <Logo />
    </ButtonBase>
  );
};

LogoSection.propTypes = {
  sx: PropTypes.object,
  to: PropTypes.string
};

export default LogoSection;
