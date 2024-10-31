import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';


import Landing from './../pages/dashboard/LandingPage';

import PropertyList from './../pages/propertylist';

import PropertyDetails from './../pages/propertydetails'; 

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
          element: <Landing />
      },
      {
          path: '/list/:location',
          element: <PropertyList />
      },
      {
        path: '/list',
        element: <PropertyList />
      },
      
      {      name:'detailpage',
          path: '/:url/:id',
          element: <PropertyDetails />
      }
    
    
     
  ]
};

export default MainRoutes;
