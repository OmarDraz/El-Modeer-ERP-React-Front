import React, { useState, useEffect } from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';


const ManageStocktakings = () => {
    const [payments, setPayments] = useState([])
    useEffect(() => {
        setPayments([
            {
                id: '00001',
                date: '16/10/2021',
                statusOne: 'تمت التسوية',
                inventory: 'Primary',
                isChecked: false
            },
            {
                id: '00002',
                date: '16/10/2021',
                statusOne: 'مسودة',
                inventory: 'Secondary',
                isChecked: false
            },
        ])
    }, [])

    const headerBtns = [
        {
            text: 'جديد',
            color: 'success',
            icon: <AddIcon style={{ marginLeft: 5 }} />,
        },
    ]

    
    const searchInputs = [
        {
            type: 'text',
            label: 'رقم',
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
        <div>
            <DataTables 
            results={payments} 
            enableSecondCol={enableSecondCol} 
            setResults={setPayments}
            headerBtns={headerBtns}
            searchInputs={searchInputs}
             />
        </div>
    )
}

export default ManageStocktakings
