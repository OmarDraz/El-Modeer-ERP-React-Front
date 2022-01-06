import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
const RequisitionMiddleware = () => {

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }} className="row">
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/inventory/requistions/add">
                <div className="card">
                    <h3>إضافة يدوي</h3>
                </div>
            </Link>
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/inventory/requistions/out">
                <div className="card">
                    <h3>صرف يدوي</h3>
                </div>
            </Link>
        </motion.div>
    )
}

export default RequisitionMiddleware
