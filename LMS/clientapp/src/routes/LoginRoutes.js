import { lazy } from 'react';

// project import
import Loadable from './../components/Loadable';
import MinimalLayout from './../layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('./../pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('./../pages/authentication/Register')));
// const PasswordReset = Loadable(lazy(() => import('./../pages/users/PasswordReset')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },
        {
            path: 'password/:token',
            element: <AuthLogin />
        }
    ]
};

export default LoginRoutes;
