import { useState, useEffect } from 'react';
import {
    Container,Button ,Box
} from '@mui/material';
// project import
import SearchProperty from './SearchProperty';
import PropertyList from './PropertyList';


// ================================|| REGISTER ||================================ //

import MessageBox from './../propertyactions/MessageBox';
import ContactBox from './../propertyactions/ContactBox';
import AlertBox from './../../components/AlertBox';
import LoginModal from './../propertyactions/LoginModal';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { locationSearch } from "./../../store/reducers/property";


const Index = () => {
    let params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {

        if (params.location) {
          
            dispatch(locationSearch({
                page: 0,
                LocationId: null,
                LocationName: params.location,
                Long: null,
                Lat: null
            }));

        }

    }, [params.location]);




  


    return (
        <Container maxWidth="lg">
            <SearchProperty></SearchProperty>
            <PropertyList></PropertyList>
            <MessageBox></MessageBox>
            <ContactBox></ContactBox>
            <AlertBox></AlertBox>
            <LoginModal />
        </Container>
    );
}

export default Index;
