
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
import Dashboard from '../features/dashboard';
import PerimeterProfile from '../features/misc/PerimeterProfile/PerimeterProfileEntry';
import VitalPoints from '../features/misc/VitalPoints';
import AlarmPanel from '../features/misc/AlarmPanel';
import RAG from '../features/misc/RAG';
import ThreatActor from '../features/misc/ThreatActor';
import ReportsKPI from '../features/misc/ReportsKPI';
import GateDetails from '../features/misc/GateDetails';
import SecurityPosts from '../features/misc/SecurityPosts';
import ActionTracking from '../features/ActionTracking';
import UsersList from '../features/users/UsersList';
import CreateUser from '../features/users/CreateUser';

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
        {
            path: '/site/ra/dashboard',
            element: <Dashboard></Dashboard>
        },
        {
            path: '/site/ra/misc/perimeter_profile',
            element: <PerimeterProfile></PerimeterProfile>
        },
        {
            path: '/site/ra/misc/vital_points',
            element: <VitalPoints></VitalPoints>
        },
        {
            path: '/site/ra/misc/alarm_panel',
            element: <AlarmPanel></AlarmPanel>
        },
        {
            path: '/site/ra/misc/rag',
            element: <RAG></RAG>
        },        
        {
            path: '/site/ra/misc/threat_actor',
            element: <ThreatActor></ThreatActor>
        },
        
        {
            path: '/site/ra/misc/gate_details',
            element: <GateDetails></GateDetails>
        },
        
        {
            path: '/site/ra/misc/security_posts',
            element: <SecurityPosts></SecurityPosts>
        },
        
        {
            path: '/site/ra/misc/reports_kpi',
            element: <ReportsKPI></ReportsKPI>
        },

        {
            path: '/site/ra/action_tracking',
            element: <ActionTracking></ActionTracking>
        },

        {
            path: '/users',
            element: <UsersList></UsersList>
        },
        {
            path: '/users/create',
            element: <CreateUser>Create User</CreateUser>
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
