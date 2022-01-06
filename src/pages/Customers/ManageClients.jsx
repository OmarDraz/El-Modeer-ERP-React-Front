import React, { useState, useEffect } from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../axios';
import { motion } from 'framer-motion'

const ManageClients = () => {
    const [customers, setCustomers] = useState([])

    const searchInputs = [
        {
            type: 'dropdown',
            label: 'العميل',
            placeholder: 'أي عميل'
        },
        {
            type: 'text',
            label: 'اسم العميل',
            placeholder: ''
        },
        {
            type: 'dropdown',
            label: 'ألحالة',
            placeholder: 'أي حالة'
        },
    ]
    useEffect(() => {
        axiosInstance.get('users/Customers').then((res) => {
            let array = []
            res.data && res.data.forEach((res) => array.push({
                customer: res.name,
                customer_id: res.id,
                customer_phone: res.phone,
                customer_address: res.address,
                customer_email: res.email,
                isChecked: false,
                editLink: `/app/owner/customers/edit/${res.id}`,
            }))
            setCustomers(array)
        })
    }, [])

    const headerBtns = [
        {
            text: 'عميل جديد',
            color: 'success',
            icon: <AddIcon style={{ marginLeft: 5 }} />,
            to: "/app/owner/customers/add"
        },

    ]

    const enableSecondCol = false;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <DataTables 
            results={customers} 
            enableSecondCol={enableSecondCol} 
            setResults={setCustomers}
            deleteOneLink="users/CustomerDetails/"
            headerBtns={headerBtns}
            searchInputs={searchInputs}
            deleteAllLink="users/Customers"
             />
        </motion.div>
    )
}

export default ManageClients
