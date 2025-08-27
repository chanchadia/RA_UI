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
import { styled } from '@mui/material';




export default function AppMenu()
{
    let menuType = "master";

    return (
       
             <List>
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

                         <Link to='/site/survey_assess/1' style={{ textDecoration: 'none', color: 'black'}}>
                            <ListItemButton sx={{ color: 'white' }}>
                                <HomeRoundedIcon sx={{ color: 'white' }} />
                                <ListItemText primary='Survey Assessment' sx={{paddingLeft:1.5}} />

                            </ListItemButton>
                        </Link>
                        
                    </>
                    :
                    <>
                        <Link to='/home' style={{ textDecoration: 'none', color: 'black'}}>
                            <ListItemButton sx={{ color: 'white' }}>
                                <HomeRoundedIcon sx={{ color: 'white' }} />
                                <ListItemText primary='Home' sx={{paddingLeft:1.5}} />
                            </ListItemButton>
                        </Link>
                    </>
                    }
                    

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