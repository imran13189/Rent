import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Landing = Loadable(lazy(() => import('pages/dashboard/LandingPage')));
const PropertyList = Loadable(lazy(() => import('pages/propertylist')));
const PropertyDetails = Loadable(lazy(() => import('pages/propertydetails')));
// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const ViewProfile = Loadable(lazy(() => import('pages/authentication/ViewProfile')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

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
      
      {
          path: '/:url/:id',
          element: <PropertyDetails />
      }
    
    
     
  ]
};

export default MainRoutes;
