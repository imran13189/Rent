// material-ui
import { useState, useEffect } from 'react';
import UserService from './../../services/UserService';

import { setSelectedPosition, fetchProperties,setUserProperty } from './../../store/reducers/property';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import Gallery from './gallery';
import Details from './details';
import MessageBox from './../propertyactions/MessageBox';
import ContactBox from './../propertyactions/ContactBox';
import AlertBox from './../../components/AlertBox';
import LoginModal from './../propertyactions/LoginModal';
import { useDispatch, useSelector } from 'react-redux';


const Index = () => {
    let params = useParams();
    /* const { properties } = useSelector((state) => state.property);*/
    const [property, setProperty] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (params.id) {
            const fetchData = async () => {
                const property = await UserService.getProperty(params.id);
                setProperty(property);
                dispatch(setUserProperty({ userProperty: property }));
                dispatch(setSelectedPosition({ positionDetails: { lat: property.lat, lng: property.long, LocationName: property.locationName } }));

                dispatch(
                    fetchProperties({
                        page: 0,
                        LocationId: property?.locationId,
                        LocationName: null,
                        Long: property.long,
                        Lat: property.lat
                    })
                );
            };
            fetchData();
        }
    }, []);
  return (
    <Container maxWidth="lg">
          <Gallery></Gallery>
          <Details></Details>
      <MessageBox></MessageBox>
      <ContactBox></ContactBox>
      <AlertBox></AlertBox>
      <LoginModal />
    </Container>
  );
};

export default Index;
