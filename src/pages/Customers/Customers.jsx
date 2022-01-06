import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export const Customers = () => {
    return (
        <motion.div className="row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/customers/customer-management">
                <div className="card">
                    <h3>إدارة العملاء</h3>
                </div>
            </Link>
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/customers/add">
                <div className="card">
                    <h3>إضافة عميل جديد</h3>
                </div>
            </Link>
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/customers/appointments/">
                <div className="card">
                    <h3>المواعيد</h3>
                </div>
            </Link>
            {/* <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/customers/client-contacts/">
                <div className="card">
                    <h3>قائمة الاتصال</h3>
                </div>
            </Link> */}
        </motion.div>
    )
}
