import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - login
/*const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));*/

import AuthLogin from './../pages/authentication/Login';

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },

       
      
    ]
};

export default LoginRoutes;
