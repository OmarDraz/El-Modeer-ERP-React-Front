import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/Reusable Components/PageHeader'
import { ListItem } from '../../components/Reusable Components/PageResults'
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../axios'
import { motion } from 'framer-motion';


const Stores = () => {

    const [stores, setStores] = useState([])
    useEffect(() => {
        axiosInstance.get('store/GetCreateWarehouses').then((res) => {
            let array = []
            res.data.forEach((res) => array.push({
                statusOne: res.deactivate ? 'خامل' : 'نشط',
                inventory: res.name,
                address: res.address,
                id: res.id,
                isChecked: false,
                deleteLink: `store/UpdateDeleteWarehouses/${res.id}`,
                deleteName: `مستودع ${res.name}`
            }))
            setStores(array)
        })

    }, [])

    const headerBtns = [
        {
            text: 'جديد',
            color: 'success',
            icon: <AddIcon/>,
            to: "/app/owner/inventory/add"
        },
    ]


    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
        <PageHeader headerBtns={headerBtns} />
        <section>
            <h4 className="panel-heading">النتائج</h4>
            <div className="panel">
                <ul>
                    {stores.map((store) => <ListItem {...store} results={stores} setResults={setStores} checkAllowed={false} />)}
                </ul>
            </div>
        </section>
        </motion.div>
    )
}

export default Stores
