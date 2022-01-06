import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import DataTables from '../../components/Reusable Components/DataTables';
import AddIcon from '@mui/icons-material/Add';
import ScheduleIcon from '@mui/icons-material/Schedule';
import axiosInstance from '../../axios';


export const InvManage = () => {
    const [invoices, setInvoices] = useState([])
    const searchInputs = [
        {
            type: 'dropdown',
            label: 'العميل',
            placeholder: 'أي عميل'
        },
        {
            type: 'text',
            label: 'رقم الفاتورة',
            placeholder: ''
        },
        {
            type: 'dropdown',
            label: 'ألحالة',
            placeholder: 'أي حالة'
        },
    ]

    const headerBtns = [
        {
            text: 'المواعيد',
            color: '',
            icon: <ScheduleIcon style={{ marginLeft: 5 }} />,
            to : '/app/owner/customers/appointments/'
        },
        {
            text: 'فاتورة جديدة',
            color: 'success',
            icon: <AddIcon style={{ marginLeft: 5 }} />,
            to : '/app/owner/sales/create-invoice/'
        },

    ]


    useEffect(() => {
        axiosInstance.get('sales/allInvoices').then((res) => {
            let array = []
            res.data.forEach((res) => array.push({
                id: res.id,
                last_action: res.last_activaty,
                last_action_date: res.created_at_invoice,
                statusOne: res.paid ? 'مدفوعة' : 'غير مدفوعة',
                date: res.created_at,
                customer_id: res.customer,
                customer: res.customer_name,
                price: res.total,
                isChecked: false,
                editLink: `/app/owner/sales/invoices/edit/${res.id}`,
                deleteLink: `sales/update/${parseInt(res.id)}`

            }))
            setInvoices(array.sort((e, b) =>  b.id - e.id))
        })
    }, [])

    const enableSecondCol = false;

    return (
        <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <DataTables 
            results={invoices}
            enableSecondCol={enableSecondCol}
            setResults={setInvoices}
            checkAllowed
            deleteAllLink="sales/create"
            linkable
            //Header
            headerBtns={headerBtns}
            //ٍSearch
            searchInputs={searchInputs} />
        </motion.div>
    )
}
