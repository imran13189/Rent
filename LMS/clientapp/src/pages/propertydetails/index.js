// material-ui
import { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import Gallery from './gallery';
import Details from './details';
import MessageBox from './../propertyactions/MessageBox';
import ContactBox from './../propertyactions/ContactBox';
import AlertBox from './../../components/AlertBox';
import LoginModal from './../propertyactions/LoginModal';

const Index = () => {
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
