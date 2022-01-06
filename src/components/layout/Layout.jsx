import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from '../Routes'
import { Sidebar } from '../sidebar/Sidebar'
import { TopNav } from '../topnav/TopNav'
import { mobile } from '../../actions'

import './layout.css'

export const Layout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        if(window.innerWidth < 770){
            dispatch(mobile())
        }
    }, [dispatch])
    
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <div className="layout">
                    <Sidebar />
                    <div className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <Routes/>
                        </div>
                    </div>
                </div>
            )} />
        </BrowserRouter>
    )
}
