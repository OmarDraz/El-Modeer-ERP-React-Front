import React, { useState, useEffect } from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../axios';
import { motion } from 'framer-motion';

const Appointments = () => {
    const [appointments, setAppointments] = useState([])

    const searchInputs = [
        {
            type: 'dropdown',
            label: 'الحالة',
            placeholder: ''
        },
        {
            type: 'dropdown',
            label: 'موظف',
            placeholder: ''
        },
        {
            type: 'dropdown',
            label: 'الاجراء',
            placeholder: ''
        }
    ]
    useEffect(() => {
        axiosInstance.get('appointments/getCreateAppointments').then((res) => {
            let array = []
            res.data.forEach((item) => array.push({
                customer: item.customer_name,
                customer_id: item.customer,
                customer_email: item.customer_email,
                customer_phone: item.customer_phone,
                date: item.date,
                appointmentName: item.duration,
                statusOne: item.status === 'scheduled' ? 'حجز' : 'تم صرف النظر',
                duration: item.duration,
                time: item.time,
                end: item.end,
                id: item.id,
                isChecked: false,
                deleteLink: `appointments/GetUpdateDeleteAppointments/${parseInt(item.id)}`,
                editLink: `/app/owner/customers/appointments/edit/${item.id}`,
                day: `${item.time} - ${item.end}`,
            }))
            setAppointments(array)
        })

    }, [])

    const headerBtns = [
        {
            text: 'موعد جديد',
            color: 'success',
            icon: <AddIcon style={{ marginLeft: 5 }} />,
            to: "/app/owner/customers/appointments/add"
        },

    ]

    const enableSecondCol = false;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <DataTables 
            results={appointments} 
            enableSecondCol={enableSecondCol} 
            setResults={setAppointments}
            headerBtns={headerBtns}
            searchInputs={searchInputs}
            deleteAllLink="/appointments/getCreateAppointments"
             />
        </motion.div>
    )
}

export default Appointments
