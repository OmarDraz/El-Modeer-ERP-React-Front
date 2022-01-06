import React, { useState, useEffect } from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../axios';
import { motion } from 'framer-motion';

const ReceiptsManage = () => {
    const [receipts, setReceipts] = useState([])
    const searchInputs = [
        {
            type: 'dropdown',
            label: 'المورد',
            placeholder: 'كل الموردين'
        },
        {
            type: 'text',
            label: 'رقم فاتورة الشراء',
            placeholder: ''
        },
        {
            type: 'dropdown',
            label: 'حالة التسليم',
            placeholder: 'أي حالة'
        },
    ]
    const headerBtns = [
        {
            text: 'فاتورة شراء جديدة',
            color: 'success',
            icon: <AddIcon style={{ marginLeft: 5 }} />,
            to: '/app/owner/purchases/receipts/add'
        },

    ]

    useEffect(() => {
        axiosInstance.get('purchases/allInvoices').then((res) => {
            let array = []
            res.data.forEach((res) => array.push({
                id: res.id,
                last_action: res.last_activaty,
                last_action_date: res.created_at_invoice,
                date: res.created_at,
                price: res.total,
                statusOne: res.paid ? 'مدفوعة' : 'غير مدفوعة',
                statusTwo: res.received ? 'مستلم' : 'غير مستلم',
                supplierName: res.supplier_name,
                supplier_id: res.supplier,
                isChecked: false
            }))
            setReceipts(array)
        })
    }, [])


    const enableSecondCol = true;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <DataTables 
            results={receipts} 
            enableSecondCol={enableSecondCol} 
            setResults={setReceipts}
            //Header
            headerBtns={headerBtns}
            //ٍSearch
            searchInputs={searchInputs}
             />
        </motion.div>
    )
}

export default ReceiptsManage
