// material-ui
import { useState } from 'react';
import {
    Grid, Stack, Typography, Alert,
    AlertTitle } from '@mui/material';

// project import
import SearchProperty from './SearchProperty';
import PropertyList from './PropertyList';

// ================================|| REGISTER ||================================ //

const Index = () => { 
    const [showMessage, setShowMessage] = useState(false);
    const [properties, setProperties] = useState();
  return (  
      <>
          <SearchProperty setProperties={setProperties }></SearchProperty>
          <PropertyList properties={properties }></PropertyList>
      </>
     
    
);

}

export default Index;
