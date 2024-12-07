import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import PrivateLayout from 'layout/PrivateLayout';


const ViewProfile = Loadable(lazy(() => import('pages/authentication/ViewProfile')));

const PropertyForm = Loadable(lazy(() => import('pages/property/Index')));
import Wishlist from './../pages/wishlist';
// ==============================|| Private ROUTING ||============================== //

const PrivateRoutes = {
  element: <PrivateLayout />,
  children: [
     {
          path: '/profile',
          element: <ViewProfile />
      }
     ,
      {
          path: 'property',
          element: <PropertyForm />
      },
      {
          path: 'wishlist',
          element: <Wishlist />
      }
  ]
};

export default PrivateRoutes;
