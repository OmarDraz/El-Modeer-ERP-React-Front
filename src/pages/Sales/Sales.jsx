import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

export const Sales = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
        <div className="row">
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/sales/invoices-management">
                <div className="card">
                    <h3>إدارة الفواتير</h3>
                </div>
            </Link>
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/sales/create-invoice">
                <div className="card">
                    <h3>إنشاء فاتورة</h3>
                </div>
            </Link>
            {/* <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/sales/estimates/">
                <div className="card">
                    <h3>عروض الاسعار</h3>
                </div>
            </Link> */}
            {/* <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/sales/client-payments/" >
                <div className="card">
                    <h3>مدفوعات العملاء</h3>
                </div>
            </Link> */}
        </div>
        </motion.div>
    )
}
