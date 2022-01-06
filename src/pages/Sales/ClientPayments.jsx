import React, {useEffect, useState} from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import ScheduleIcon from '@mui/icons-material/Schedule';

const ClientPayments = () => {
    const [payments, setPayments] = useState([])
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
        },

    ]

    useEffect(() => {
        setPayments([
            {
                id: '00001',
                date: '16/10/2021',
                price: '50.00',
                statusOne: 'حولت لفاتورة',
                statusTwo: '',
                customer: 'محمد هشام',
                customer_id: '1',
                employeeName: 'دراز',
                purchaseType: 'شيك',
                isChecked: false
            },
            {
                id: '00002',
                date: '16/10/2021',
                price: '50.00',
                statusOne: 'غير مدفوعة',
                statusTwo: '',
                customer: 'عمر نادر',
                customer_id: '2',
                employeeName: 'دراز',
                purchaseType: 'نقدي',
                isChecked: false
            }
        ])
    }, [])

    const enableSecondCol = false;
    return (
        <div>
            <DataTables 
            results={payments}
            enableSecondCol={enableSecondCol} s
            setResults={setPayments}
            //Header
            headerBtns={headerBtns}
            //ٍSearch
            searchInputs={searchInputs} />
        </div>
    )
}

export default ClientPayments
