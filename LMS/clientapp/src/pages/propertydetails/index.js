// material-ui
import { useState, useEffect } from 'react';

import {
    Container
} from '@mui/material';

import { fetchProperties, locationSearch } from "./../../store/reducers/property";
// ================================|| REGISTER ||================================ //
import { useDispatch, useSelector } from "react-redux";

import Gallery from './gallery';
import Details from './details';

const Index = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = new useDispatch();
    const { selectedLocation, properties } = useSelector((state) => state.property);

    const handleLoadMore = () => {

        dispatch(locationSearch({ ...selectedLocation, page: selectedLocation?.page + 1 }));
        //dispatch(fetchProperties(selectedLocation)); 
    };


 




    return (
        <Container maxWidth="lg">
            <Gallery></Gallery>
            <Details></Details>
          
        </Container>
    );
}

export default Index;
