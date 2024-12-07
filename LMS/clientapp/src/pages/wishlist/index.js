// material-ui
import { useState, useEffect } from 'react';
import AnimateButton from "components/@extended/AnimateButton";
import {
    Container,Button ,Box
} from '@mui/material';
// project import

import WishList from './WishList';
import { fetchProperties, locationSearch } from "./../../store/reducers/property";
import { fetchWishList } from "./../../store/reducers/users";
import { useParams } from "react-router-dom";
// ================================|| REGISTER ||================================ //
import { useDispatch, useSelector } from "react-redux";
import MessageBox from './../propertyactions/MessageBox';
import ContactBox from './../propertyactions/ContactBox';
import AlertBox from './../../components/AlertBox';
import LoginModal from './../propertyactions/LoginModal';


const Index = () => {
    let params = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = new useDispatch();
    const { wishList, userDetails } = useSelector((state) => state.users);

  

    const handleLoadMore = () => {

        dispatch(locationSearch({ ...selectedLocation, page: selectedLocation?.page + 1 }));
        //dispatch(fetchProperties(selectedLocation)); 
    };


    return (
        <Container maxWidth="lg">
          
            <WishList></WishList>
            {!loading && wishList?.length >= 10 && (

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
            <LoginModal />
        </Container>
    );
}

export default Index;
