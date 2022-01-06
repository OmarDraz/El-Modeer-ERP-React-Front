import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@mui/material'
import axiosInstance from '../axios'
import Cookies from 'js-cookie'

const Login = () => {
    const [loginDetails, setLogin] = useState({})
    const [err , setErr] = useState()
    const history = useHistory();
    const handleLogin = () => {
        axiosInstance.post('users/login/', loginDetails)
        .then((res) => {
            Cookies.set("access_token", res.data.access);
            Cookies.set("refresh_token", res.data.refresh);
            axiosInstance.defaults.headers["Authorization"] =
            "JWT " + Cookies.get("access_token");
            history.push("/app/owner/sales/");
        })
        .catch((err) => {
            if(err){
                setErr(err.response.status)
            } else {
                setErr('حدث عطل فني، برجاء المحاولة في وقت لاحق')
            }
        })
    }
    useEffect(()=> {
        if(Cookies.get('access_token')){
            history.push("/app/owner/sales/")
        }
    }, [history])
    return (
        <div className="container flex__center">
            <div className="panel flex__column w-450px">
                {
                    err === 401 && <label className="errorLabel mb-10">برجاء ادخال بيانات صحيحة</label>
                }
                
                <h3 className="mb-10">تسجيل الدخول للنظام</h3>
                <hr className="w-30 mb-10 bold-hr"/>
                <div className="labeled__button">
                    <label className="label mediumSize">البريد الالكتروني</label>
                    <input type="email" className="inputText  w-80" onChange={(e) => setLogin({...loginDetails, email: e.target.value})} />
                </div>
                <div className="labeled__button">
                    <label className="label mediumSize">كلمة المرور</label>
                    <input type="password" className="inputText w-80" onChange={(e) => setLogin({...loginDetails, password: e.target.value})} />
                </div>
                <Button onClick={handleLogin} className="w-30 mt-5" variant="contained" color="secondary">
                    <span>
                        تسجيل دخول
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default Login
