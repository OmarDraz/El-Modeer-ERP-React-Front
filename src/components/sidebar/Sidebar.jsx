import React from 'react'
import './sidebar.css'
import { NavLink } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export const Sidebar = () => {
    return (
        <div className="sidebar" style={{ marginRight: -250 }}>
            <div className="sidebar__content">
                <section className="logo">
                    مها بيوتي
                </section>
                <ul className="sidebar__items">
                    {/* <li>
                        <NavLink activeClassName="active-link" exact className="sidebar__item" to="/">
                            <HomeIcon />
                            الرئيسية
                        </NavLink>
                    </li> */}
                    <li>
                        <NavLink activeClassName="active-link" className="sidebar__item" to="/app/owner/sales">
                            <ReceiptIcon />
                            المبيعات
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-link" className="sidebar__item" to="/app/owner/customers">
                            <AccountBoxIcon />
                            العملاء
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-link" className="sidebar__item" to="/app/owner/inventory/">
                            <AllInboxIcon />
                            المخزون
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active-link" className="sidebar__item" to="/app/owner/purchases">
                            <ShoppingCartIcon />
                            المشتريات
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink activeClassName="active-link" className="sidebar__item" to="/app/owner/finance">
                            <AccountBalanceWalletIcon />
                            المالية
                        </NavLink>
                    </li><li>
                        <NavLink activeClassName="active-link" className="sidebar__item" to="/app/owner/employers">
                            <PeopleAltIcon />
                            الموظفين
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}
