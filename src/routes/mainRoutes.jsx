
import { Outlet } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm'
import MainLayout from '../features/main/MainLayout'
import CustomH2 from '../ui-component/Headings/CustomH2'
import SiteMaster from '../features/site/SiteMaster';
import CreateSite from '../features/site/CreateSite';
import SiteTranList from '../features/siteTran/siteTranList';
import CreateSiteTran from '../features/siteTran/CreateSiteTran';
import RaEntry from '../features/ra/RaEntry';


const mainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/home',
            element: <CustomH2 headingName='Home screen'></CustomH2>
        },
        {
            path: '/site',
            element: <SiteMaster></SiteMaster>
        },
        {
            path: '/site/:id',
            element: <CreateSite></CreateSite>
        },
        {
            path: '/site/create',
            element: <CreateSite></CreateSite>
        },
        {
            path: '/site/:id/tran',
            element: <SiteTranList></SiteTranList>
        },
        {
            path: '/site/:id/tran/:tranid',
            element: <CreateSiteTran></CreateSiteTran>
        },
        {
            path: '/site/:id/tran/create',
            element: <CreateSiteTran></CreateSiteTran>
        },
        {
            path: '/ra/:tranid',
            element: <RaEntry></RaEntry>
        },
        //------------------------------------------------------------------------
        {
            path: '/change_pwd',
            element: <CustomH2 headingName='Change password screen'></CustomH2>
        },
        {
            path: '/logout',
            element: <CustomH2 headingName='Logout screen'></CustomH2>
        },
        // {
        //     path: '/login',
        //     element: <LoginForm />
        // },
        

    ]
};

export default mainRoutes;
