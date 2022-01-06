import React, { useState, useEffect } from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../axios';
import { motion } from 'framer-motion';


const ManageRequisitions = () => {
    const [requisition, setRequisition] = useState([])
    useEffect(() => {
        axiosInstance.get('store/AllPermissions').then((res) => {
            let array = []
            res.data.forEach((res) => array.push({
                requistionType: res.type === 'addpermission' ? 'اذن اضافة مخزن' : 'اذن صرف مخزن',
                id: res.id,
                last_action_date: res.created_at,
                last_action: 'انشأت',
                employeeName: res.add_by,
                notes: res.notes,
                inventory: res.warehouse_name,
                editLink: res.type === 'addpermission' ? `store/UpdateAddPermission/${res.id}` : `store/UpdateOutPermission/${res.id}`,
                deleteLink: res.type === 'addpermission' ? `store/UpdateAddPermission/${res.id}` : `store/UpdateOutPermission/${res.id}`,
                deleteName: 'هذا الاذن'
            }))
            setRequisition(array)
        })
    }, [])

    const headerBtns = [
        {
            text: 'إضافة',
            color: 'success',
            icon: <AddIcon style={{ marginLeft: 5 }} />,
            to: '/app/owner/inventory/requistions/choose'
        },
    ]

    
    const searchInputs = [
        {
            type: 'text',
            label: 'رقم الإذن المخزني',
            placeholder: ''
        },
        {
            type: 'selection',
            label: 'مصدر الإذن',
            placeholder: ''
        },
        {
            type: 'text',
            label: 'الرقم المعرف',
            placeholder: ''
        },
        {
            type: 'selection',
            label: 'المستودع',
            placeholder: ''
        }
    ]

    const enableSecondCol = true;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <DataTables 
            results={requisition} 
            enableSecondCol={enableSecondCol} 
            setResults={setRequisition}
            headerBtns={headerBtns}
            deleteOneLink="store/UpdateProduct/"
            searchInputs={searchInputs}
             />
        </motion.div>
    )
}

export default ManageRequisitions
