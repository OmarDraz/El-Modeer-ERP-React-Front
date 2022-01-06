import React, {useEffect, useState} from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import AddIcon from '@mui/icons-material/Add';
import ScheduleIcon from '@mui/icons-material/Schedule';

const Estimates = () => {
    const [estimates, setEstimates] = useState([])
    const searchInputs = [
        {
            type: 'dropdown',
            label: 'العميل',
            placeholder: 'أي عميل'
        },
        {
            type: 'text',
            label: 'رقم عرض الاسعار',
            placeholder: ''
        },
        {
            type: 'dropdown',
            label: 'الحالة',
            placeholder: 'أي حالة'
        },
    ]
    const headerBtns = [
        {
            text: 'المواعيد',
            color: '',
            icon: <ScheduleIcon style={{ marginLeft: 5 }} />,
        },
        {
            text: 'عرض سعر جديد',
            color: 'success',
            icon: <AddIcon style={{ marginLeft: 5 }} />,
            to: '/app/owner/sales/estimates/add/'
        },

    ]

    useEffect(() => {
        setEstimates([
            {
                id: '00001',
                last_action: 'انشأت',
                last_action_date: '16/10/2021 11:13:22',
                date: '16/10/2021',
                price: '50.00',
                statusOne: 'حولت لفاتورة',
                statusTwo: '',
                customer: 'محمد هشام',
                customer_id: '1',
                isChecked: false
            },
            {
                id: '00002',
                last_action: 'آخر إجراء اتخذ على الفاتورة',
                last_action_date: '16/10/2021 11:13:22',
                date: '16/10/2021',
                price: '50.00',
                statusOne: 'غير مدفوعة',
                statusTwo: '',
                customer: 'عمر نادر',
                customer_id: '2',
                isChecked: false
            }
        ])
    }, [])

    const enableSecondCol = true;
    return (
        <div>
            <DataTables 
            results={estimates} 
            enableSecondCol={enableSecondCol} 
            setResults={setEstimates}
            //Header
            headerBtns={headerBtns}
            //ٍSearch
            searchInputs={searchInputs}
             />
        </div>
    )
}

export default Estimates
