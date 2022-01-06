import React, { useState, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../components/Reusable Components/PageHeader';
import { ListItem } from '../../components/Reusable Components/PageResults';

const PriceLists = () => {
    const [priceList, setPriceList] = useState([])
    useEffect(() => {
        setPriceList([
            {
                id: '00001',
                date: '16/10/2021',
                listName: 'الاولى',
                statusOne: 'نشط',
                productCount: '5',
                isChecked: false
            },
            {
                id: '00002',
                date: '16/10/2021',
                listName: 'الثانية',
                statusOne: 'خامل',
                productCount: '3',
                isChecked: false
            },
        ])
    }, [])

    const headerBtns = [
        {
            text: 'اضف قائمة اسعار',
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

    return (
        <div>
            <PageHeader headerBtns={headerBtns} searchInputs={searchInputs} />
            <section>
            <h4 className="panel-heading">النتائج</h4>
            <div className="panel">
                <ul>
                    {priceList.map((e) => <ListItem checkAllowed={false} id={e.id} productCount={e.productCount} listName={e.listName} statusOne={e.statusOne}/>)}
                </ul>
            </div>
        </section>
        </div>
    )
}

export default PriceLists
