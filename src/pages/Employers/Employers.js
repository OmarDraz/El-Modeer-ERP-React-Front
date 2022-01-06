import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';


export const Employers = () => {
    return (
        <motion.div > 
        <div className="row">
            <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/employers/employers-list/">
                <div className="card">
                    <h3>إدارة الموظفين</h3>
                </div>
            </Link>
            {/* <Link style={{ textDecoration: 'none', textAlign: 'center' }} className="col-3 col-sm-12" to="/app/owner/employers/roles/">
                <div className="card">
                    <h3>إدارة أدوار الموظفين</h3>
                </div>
            </Link> */}
        </div>
        </motion.div>
    )
}
