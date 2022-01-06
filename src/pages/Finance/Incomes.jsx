import React, { useState, useEffect } from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import AddIcon from '@mui/icons-material/Add';

const Incomes = () => {
    const [expenses, setExpenses] = useState([])

    const searchInputs = [
        {
            type: 'text',
            label: 'كود',
            placeholder: ''
        },
        {
            type: 'selection',
            label: 'التاريخ',
            placeholder: ''
        },
        {
            type: 'dropdown',
            label: 'التصنيف',
            placeholder: ''
        }
    ]
    useEffect(() => {
        setExpenses([
            {
                expense: 'مصاريف كهرباء',
                date: '04/10/2021',
                id: '0001',
                price: '2450.00',
                isChecked: false
            },
            {
                expense: 'اجور موظفين',
                date: '12/2/2021',
                price: '20,000.00',
                id: '0002',
                isChecked: false
            }
        ])
    }, [])

    const headerBtns = [
        {
            text: 'سند صرف',
            color: 'success',
            icon: <AddIcon/>,
        },
    ]

    const enableSecondCol = false;
    return (
        <div>
            <DataTables 
            results={expenses} 
            enableSecondCol={enableSecondCol} 
            setResults={setExpenses}
            headerBtns={headerBtns}
            searchInputs={searchInputs}
             />
        </div>
    )
}

export default Incomes
