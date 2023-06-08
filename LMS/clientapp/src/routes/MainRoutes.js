import { lazy } from 'react';

// project import
import Loadable from './../components/Loadable';
import MainLayout from './../layout/MainLayout';
import { ProtectedRoute } from "./ProtectedRoute"; 


// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('./../pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('./../pages/extra-pages/SamplePage')));
const Contacts = Loadable(lazy(() => import('./../pages/contacts')));
const Accounts = Loadable(lazy(() => import('./../pages/accounts')));
const Users = Loadable(lazy(() => import('./../pages/users')));

// render - utilities
const Typography = Loadable(lazy(() => import('./../pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('./../pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('./../pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('./../pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <ProtectedRoute><DashboardDefault /> </ProtectedRoute>
            //element: <DashboardDefault /> 
        },
        {
            path: 'contacts',
            element: <ProtectedRoute><Contacts /></ProtectedRoute>
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'accounts',
            element: <ProtectedRoute><Accounts /></ProtectedRoute>
        },
        {
            path: 'users',
            element: <ProtectedRoute><Users /></ProtectedRoute>
        },
        
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
