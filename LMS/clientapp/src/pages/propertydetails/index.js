// material-ui
import { useState, useEffect } from 'react';

import {
    Container
} from '@mui/material';

import Gallery from './gallery';
import Details from './details';

const Index = () => {

    return (
        <Container maxWidth="lg">
            <Gallery></Gallery>
            <Details></Details>
          
        </Container>
    );
}

export default Index;
