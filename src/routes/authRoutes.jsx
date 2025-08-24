
import { Outlet } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm'
import LoginLayout from '../features/auth/LoginLayout'


const AuthRoutes = {
    path: '/',
    element: <LoginLayout />,
    children: [
        {
            path: '/',
            element: <LoginForm />
        },
        {
            path: '/login',
            element: <LoginForm />
        },
        

    ]
};

export default AuthRoutes;
