import { useEffect, useState } from 'react';

import { Grid, Box, Typography, Button, IconButton } from '@mui/material';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useSelector} from "react-redux";
import DraggableMarker from './../property/DraggableMarker';

import { fetchWishList, setShowMessageBox, setShowContactBox } from './../../store/reducers/users';
import MetaTags from './metatags';

const Details = () => {
    const { userProperty } = useSelector((state) => state.property);



  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10} md={5} lg={12}>
          <Typography variant="h1" color="text.primary">
                      {userProperty.description}
          </Typography>

          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" sx={{ ml: -1, maxWidth: '100%' }}>
            <IconButton aria-label="add to favorites">
              <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
            </IconButton>
            <Typography variant="h5" color="text.secondary">
                          {userProperty.locationName}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={10} md={5} lg={4}>
          <Typography variant="h5" color="text.secondary">
            Rent
          </Typography>
          <Typography variant="h4" color="text.primary">
                      &#8377; {userProperty.rentAmount}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={10} md={5} lg={4}>
          <Typography variant="h5" color="text.secondary">
            Type
          </Typography>
          <Typography variant="h4" color="text.primary">
                      {userProperty.isFurnished}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={10} md={5} lg={4}>
          <Typography variant="h5" color="text.secondary">
            Available from
          </Typography>
          <Typography variant="h4" color="text.primary">
                      {userProperty.availableFrom}
          </Typography>
        </Grid>

        <Grid item xs={6} sm={10} md={5} lg={4}>
          <Typography variant="h5" color="text.secondary">
            Parking
          </Typography>
          <Typography variant="h4" color="text.primary">
                      {userProperty.parking}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={10} md={5} lg={4}>
          <Typography variant="h5" color="text.secondary">
            Bathroom
          </Typography>
          <Typography variant="h4" color="text.primary">
                      {userProperty.bathrooms}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={10} md={5} lg={4}>
          <Typography variant="h5" color="text.secondary">
            Available for
          </Typography>
          <Typography variant="h4" color="text.primary">
                      {userProperty.availableFor}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={5} lg={12} mt={5}>
          <Grid item xs={12}>
            <Button
                          onClick={() => dispatch(setShowContactBox({ showContactBox: true, PropertyUserId: userProperty.userId }))}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ bgcolor: 'action.main' }}
            >
              Contact for more details
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={5} lg={9}>
          <Typography variant="h3" color="text.secondary">
            Locate on map
          </Typography>
          <DraggableMarker></DraggableMarker>
        </Grid>
      </Grid>

          <MetaTags property={userProperty}></MetaTags>
    </>
  );
};

export default Details;
