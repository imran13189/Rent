// material-ui
import { useState, useEffect } from 'react';
import AnimateButton from "components/@extended/AnimateButton";
import {
    Container,Button ,Box
} from '@mui/material';
// project import
import SearchProperty from './SearchProperty';
import PropertyList from './PropertyList';
import { fetchProperties, locationSearch } from "./../../store/reducers/property";
import { useParams } from "react-router-dom";
// ================================|| REGISTER ||================================ //
import { useDispatch, useSelector } from "react-redux";
import MessageBox from './../propertyactions/MessageBox';
import ContactBox from './../propertyactions/ContactBox';
import AlertBox from './../../components/AlertBox';

const Index = () => {
    let params = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = new useDispatch();
    const { selectedLocation, properties } = useSelector((state) => state.property);

    const handleLoadMore = () => {

        dispatch(locationSearch({ ...selectedLocation, page: selectedLocation?.page + 1 }));
        //dispatch(fetchProperties(selectedLocation)); 
    };


    useEffect(() => {

        if (selectedLocation) {
            dispatch(fetchProperties(selectedLocation));
        }

    }, [selectedLocation]);


    useEffect(() => {

        if (params.location) {
            debugger;
          dispatch(locationSearch({
              ...selectedLocation,
                    page: 0,
                    LocationId: null,
                    LocationName: params.location,
                    Long: null,
                    Lat: null
                }));
            
        }

    }, []);




    return (
        <Container maxWidth="lg">
            <SearchProperty></SearchProperty>
            <PropertyList></PropertyList>
            {!loading && properties?.length >= 10 && (

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh"
                >
                    <AnimateButton>
                        <Button
                            onClick={handleLoadMore}
                            disabled={loading}
                            disableElevation
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            sx={{ color: 'common.white', bgcolor: 'action.main' }}
                        >
                            Load More
                        </Button>
                    </AnimateButton>
                </Box>

            )}
            <MessageBox></MessageBox>
            <ContactBox></ContactBox>
            <AlertBox></AlertBox>
        </Container>
    );
}

export default Index;
