import React, { useState, useEffect } from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import AddIcon from '@mui/icons-material/Add';
const ContactsList = () => {
    
    const [contacts, setContacts] = useState([])

    const searchInputs = [
        {
            type: 'text',
            label: 'اسم العميل',
            placeholder: ''
        },
        {
            type: 'text',
            label: 'كود العميل',
            placeholder: ''
        }
    ]
    useEffect(() => {
        setContacts([
            {
                customer: 'محمد هشام',
                customer_id: '1',
                customer_phone: '01212482157',
                customer_email: 'mohammedhesmam@gmail.com',
                isChecked: false
            },
            {
                customer: 'عمر نادر',
                customer_email: 'omarnader6636@gmail.com',
                customer_phone: '01095196249',
                customer_id: '2',
                isChecked: false
            }
        ])
    }, [])

    const headerBtns = [
        {
            text: 'عميل جديد',
            color: 'success',
            icon: <AddIcon style={{ marginLeft: 5 }} />,
        },
    ]

    const enableSecondCol = false;
    return (
        <div>
            <DataTables 
            results={contacts} 
            enableSecondCol={enableSecondCol} 
            setResults={setContacts}
            headerBtns={headerBtns}
            searchInputs={searchInputs}
             />
        </div>
    )
}

export default ContactsList
