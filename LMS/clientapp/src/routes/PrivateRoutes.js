import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import PrivateLayout from 'layout/PrivateLayout';


const ViewProfile = Loadable(lazy(() => import('pages/authentication/ViewProfile')));

const PropertyForm = Loadable(lazy(() => import('pages/property/Index')));

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
      }
  ]
};

export default PrivateRoutes;
