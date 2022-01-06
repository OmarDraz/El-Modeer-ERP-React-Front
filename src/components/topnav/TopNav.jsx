import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../actions';
import { IconButton, Button } from '@mui/material';
import jwt_decode from 'jwt-decode'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import moment from 'moment'
import './topnav.css';

export const TopNav = () => {
    const date = new Date();
    const today = moment(date).format('yyyy-MM-DD')
    const [openMenu, setOpened] = useState(false)
    const [user, setUser] = useState({name: ''})
    const dispatch = useDispatch()
    let screenSize = window.innerWidth
    const toggle = useSelector(state => state.sidebarReducer)
    const history = useHistory()
    const handleChange = () => {
        dispatch(open())
        document.documentElement.style.setProperty(
            '--sidebar-width', toggle ? '0px' : '250px'
        )
        if(screenSize < 770){
        document.getElementsByClassName('top-btns')[0].style.setProperty(
            'display', toggle ? '' : 'none'
        )
    }
        document.getElementsByClassName('sidebar')[0].style.setProperty(
            'margin-right', toggle ? '-250px' : '0'
        )
    }

    const handleDropdown = () => {
        setOpened(!openMenu)
    }

    useEffect(() => {
        let token = jwt_decode(Cookies.get('access_token'))
        setUser({name: token.first_name})
    }, [])
    return (
        <>
            <div className="top-nav">
                <IconButton color="secondary" onClick={() => handleChange()}>
                    <MenuIcon />
                </IconButton>
                <section className="top-btns" style={{ transition: '.5s ease' }}>
                    {
                        screenSize < 770 ? 
                        <IconButton onClick={handleDropdown} style={{ color: 'black' }}>
                            <AccountCircleIcon color="secondary" />
                        </IconButton>
                        :
                        <Button onClick={handleDropdown} className="top__dropdown-button" style={{ color: 'black' }}>
                            <AccountCircleIcon color="secondary" />
                            <div>
                                <span style={{ display: 'flex', alignItems: 'center' }}>{user.name} {<ArrowDropDownIcon color="secondary" />}</span>
                                <span>{today}</span>
                            </div>
                        </Button>
                    }
                    <ul className="dropdown-menu" style={{ display: openMenu ? 'block' : 'none', left: 0 }}>
                        <li className="menu-heading">حسابي</li>
                        <li><button onClick={() => {
                            		axiosInstance.post('users/logout/blacklist/', {
                                        refresh_token: Cookies.get('refresh_token'),
                                    });
                                    Cookies.remove('access_token');
                                    Cookies.remove('refresh_token');
                                    axiosInstance.defaults.headers['Authorization'] = null;
                                    history.push('/');
                                    history.go()
                        }} className="menu-heading">تسجيل الخروج</button></li>
                    </ul>
                </section>
                
            </div>
            
        </>
    )
}
