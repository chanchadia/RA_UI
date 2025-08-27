import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { Link, Outlet, useNavigate } from 'react-router-dom';

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
            </>);
        }
        
    }


    let menuType = "masterXXX";

    return (
       
             <List>
                {
                    getMenu()
                }


                    {menuType == 'master' ?
                    <>
                     <Link to='/site' style={{ textDecoration: 'none', color: 'black'}}>
                            <ListItemButton sx={{ color: 'white' }}>
                                <HomeRoundedIcon sx={{ color: 'white' }} />
                                <ListItemText primary='Site' sx={{paddingLeft:1.5}} />
                            </ListItemButton>
                        </Link>

                        <Link to='/site/1/weightage' style={{ textDecoration: 'none', color: 'black'}}>
                            <ListItemButton sx={{ color: 'white' }}>
                                <HomeRoundedIcon sx={{ color: 'white' }} />
                                <ListItemText primary='Weightage' sx={{paddingLeft:1.5}} />
                            </ListItemButton>
                        </Link>


                        <Link to='/site/1/ra/1' style={{ textDecoration: 'none', color: 'black'}}>
                            <ListItemButton sx={{ color: 'white' }}>
                                <HomeRoundedIcon sx={{ color: 'white' }} />
                                <ListItemText primary='Risk Assessment' sx={{paddingLeft:1.5}} />
                            </ListItemButton>
                        </Link>

                         <Link to='/site/survey_assess/1' style={{ textDecoration: 'none', color: 'black'}}>
                            <ListItemButton sx={{ color: 'white' }}>
                                <HomeRoundedIcon sx={{ color: 'white' }} />
                                <ListItemText primary='Survey Assessment' sx={{paddingLeft:1.5}} />

                            </ListItemButton>
                        </Link>
                        
                    </>
                    :
                    <>
                    </>
                    }
                    
               <div style={{width:'100%', borderTop: '1px solid grey'}}> </div>

                    <Link to='/change_pwd' style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton sx={{ color: 'white' }}>
                                <LockResetIcon sx={{ color: 'white' }}  />
                            <ListItemText primary='Change Password'  sx={{paddingLeft:1.5}} />
                        </ListItemButton>
                    </Link>
                    <Link to='/logout' style={{ textDecoration: 'none', color: 'black' }}>
                        <ListItemButton sx={{ color: 'white' }}>
                                <ExitToAppRoundedIcon sx={{ color: 'white' }} />
                            <ListItemText primary='Logout'  sx={{paddingLeft:1.5}} />
                        </ListItemButton>
                    </Link>
            </List>
    );
}