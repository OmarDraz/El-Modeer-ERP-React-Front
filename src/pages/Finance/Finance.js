import React from 'react'
import { Link } from 'react-router-dom'

export const Finance = () => {
    return (
        <>
        <div className="row">
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/finance/expenses/">
                <div className="card">
                    <h3>المصروفات</h3>
                </div>
            </Link>
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/finance/incomes/">
                <div className="card">
                    <h3>الإيرادات</h3>
                </div>
            </Link>
        </div>
        </>
    )
}
