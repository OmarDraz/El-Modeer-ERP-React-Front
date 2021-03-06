import React, { useEffect } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
	const history = useHistory();

	useEffect(() => {
		axiosInstance.post('users/logout/blacklist/', {
            refresh_token: Cookies.get('refresh_token'),
        });
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        history.push('/');
        history.go()
	});
	return <div>Logout</div>;
}

export default Logout