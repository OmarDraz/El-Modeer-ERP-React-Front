import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

export const Purshases = () => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
        <div className="row">
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/purchases/receipts/">
                <div className="card">
                    <h3>إدارة فواتير الشراء</h3>
                </div>
            </Link>
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/purchases/suppliers/">
                <div className="card">
                    <h3>إدارة الموردين</h3>
                </div>
            </Link>
        </div>
        </motion.div>
    )
}
