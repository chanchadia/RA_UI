import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import RawListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { Link as RawLink, Outlet, useNavigate } from 'react-router-dom';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LockResetIcon from '@mui/icons-material/LockReset';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { Divider, styled } from '@mui/material';
import { useSelector } from 'react-redux';

import TocIcon from '@mui/icons-material/Toc';

import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PermDataSettingOutlinedIcon from '@mui/icons-material/PermDataSettingOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';

import AddRoadOutlinedIcon from '@mui/icons-material/AddRoadOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SickOutlinedIcon from '@mui/icons-material/SickOutlined';

    const Link = styled(RawLink)`
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const ListItemText = styled(RawListItemText)({
        '& .MuiListItemText-primary': {
            fontSize:14,
        },
        // '& .MuiListItemText-secondary': {
        //     color: 'gray',
        // },
    });
export default function AppMenu()
{
  const { mySite, myRa } = useSelector((state) => state.auth);


    const getMenu = () => 
    {
        if(mySite === null)
        {
            return (<>
                <Link to='/site' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <TocIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Site List' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
            </>);
        }
        else if(myRa === null)
        {
            return (<>
                <Link to='/site' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <TocIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Site List' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link to='/site/weightage' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <AppRegistrationOutlinedIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Weightage' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link to='/site/tran' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <AssessmentOutlinedIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Assessment List' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
            </>);
        }
        else
        {
            return (<>
                <Link to='/site' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <TocIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Site List' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link to='/site/weightage' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <AppRegistrationOutlinedIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Weightage' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link to='/site/tran' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <AssessmentOutlinedIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Assessment List' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>

               <div style={{width:'100%', borderTop: '1px solid grey'}}> </div>

                <Link to='/site/ra/dashboard' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <DashboardIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Dashboard' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>

               <div style={{width:'100%', borderTop: '1px solid grey'}}> </div>
               
                <Link to='/sa' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <PermDataSettingOutlinedIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Severity Rating Matrix' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link to='/site/survey_assess' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <ArticleOutlinedIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Survey Assessment' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link to='/site/ra' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <AddModeratorOutlinedIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Risk Assessment' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>

            {/* //-------------------------------------------------------------------------------------------- */}
                <Link style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'silver' }}>
                        <SickOutlinedIcon sx={{ color: 'silver' }} />
                        <ListItemText primary='Threat Actor' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'silver' }}>
                        <AddRoadOutlinedIcon sx={{ color: 'silver' }} />
                        <ListItemText primary='Summary Components (%)' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link to='/site/ra/misc/perimeter_profile' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <AddToPhotosOutlinedIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Perimeter Profile' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'silver' }}>
                        <AirOutlinedIcon sx={{ color: 'silver' }} />
                        <ListItemText primary='Gate Details' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link to='/site/ra/misc/vital_points' style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'white' }}>
                        <BlurOnOutlinedIcon sx={{ color: 'white' }} />
                        <ListItemText primary='Vital Points' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'silver' }}>
                        <BrokenImageOutlinedIcon sx={{ color: 'silver' }} />
                        <ListItemText primary='Security Posts-Available' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'silver' }}>
                        <BusinessCenterOutlinedIcon sx={{ color: 'silver' }} />
                        <ListItemText primary='Alarm Panel' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'silver' }}>
                        <CasinoOutlinedIcon sx={{ color: 'silver' }} />
                        <ListItemText primary='RAG' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'silver' }}>
                        <PendingActionsOutlinedIcon sx={{ color: 'silver' }} />
                        <ListItemText primary='Reports and KPI' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>
                <Link style={{ textDecoration: 'none', color: 'black'}}>
                    <ListItemButton sx={{ color: 'silver' }}>
                        <AutoGraphIcon sx={{ color: 'silver' }} />
                        <ListItemText primary='Action Tracking' sx={{paddingLeft:1.5}} />
                    </ListItemButton>
                </Link>

                
            </>);
        }
        
    }


    let menuType = "masterXXX";

    return (
       
             <List>
                {
                    getMenu()
                }
                    
               <div style={{width:'100%', borderTop: '1px solid grey'}}> </div>

                    {/* <Link tooooo='/change_pwd' style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton sx={{ color: 'white' }}>
                                <LockResetIcon sx={{ color: 'white' }}  />
                            <ListItemText primary='Change Password'  sx={{paddingLeft:1.5}} />
                        </ListItemButton>
                    </Link> */}
                    <Link to='/logout' style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton sx={{ color: 'white' }}>
                                <ExitToAppRoundedIcon sx={{ color: 'white' }} />
                            <ListItemText primary='Logout'  sx={{paddingLeft:1.5}} />
                        </ListItemButton>
                    </Link>
            </List>
    );
}