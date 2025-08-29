
import { Outlet } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm'
import MainLayout from '../features/main/MainLayout'
import CustomH2 from '../ui-component/Headings/CustomH2'
import SiteMaster from '../features/site/SiteMaster';
import CreateSite from '../features/site/CreateSite';
import SiteTranList from '../features/siteTran/siteTranList';
import CreateSiteTran from '../features/siteTran/CreateSiteTran';
import SeverityRating from '../features/SeverityRating/SeverityRatingEntry';
import Weightage from '../features/ra/survey/Weightage';

import RiskAssessment from '../features/ra/main/RiskAssessment';

import SurveyAssessEntry from '../features/SurveyAssess/SurveyAssessEntry';
import Logout from '../features/logout';



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
            path: '/site/tran',
            element: <SiteTranList></SiteTranList>
        },
        {
            path: '/site/tran/:raid',
            element: <CreateSiteTran></CreateSiteTran>
        },
        {
            path: '/site/tran/create',
            element: <CreateSiteTran></CreateSiteTran>
        },
        {
            path: '/sa',
            element: <SeverityRating></SeverityRating>
        },
        {
            path: '/site/survey_assess',
            element: <SurveyAssessEntry></SurveyAssessEntry>
        },
        {
            path: '/site/weightage',
            element: <Weightage></Weightage>
        },
        {
            path: '/site/ra',
            element: <RiskAssessment></RiskAssessment>
        },
        //------------------------------------------------------------------------
        {
            path: '/change_pwd',
            element: <CustomH2 headingName='Change password screen'></CustomH2>
        },
        {
            path: '/logout',
            element: <Logout/>
        },
        // {
        //     path: '/login',
        //     element: <LoginForm />
        // },
        

    ]
};

export default mainRoutes;
