import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';


export const Inventory = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
        <div className="row">
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/inventory/products/">
                <div className="card">
                    <h3>إدارة المنتجات</h3>
                </div>
            </Link>
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/inventory/requistions/">
                <div className="card">
                    <h3>إدارة الإذون المخزنية</h3>
                </div>
            </Link>
            {/* <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/inventory/price-lists/">
                <div className="card">
                    <h3>قائمة الاسعار</h3>
                </div>
            </Link> */}
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/inventory/stores/">
                <div className="card">
                    <h3>المستودعات</h3>
                </div>
            </Link>
        </div>
        {/* <div className="row">
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/inventory/stalktalkings/">
                <div className="card">
                    <h3>إدارة الجرد</h3>
                </div>
            </Link>
        </div> */}
        </motion.div>
    )
}
