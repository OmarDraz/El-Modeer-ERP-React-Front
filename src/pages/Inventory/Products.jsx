import React, { useState, useEffect } from 'react'
import DataTables from '../../components/Reusable Components/DataTables'
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../axios';
import { motion } from 'framer-motion';


const Products = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        if(products.length === 0)
        axiosInstance.get('store/allProducts').then((res) => {
            let array = []
            res.data.forEach((res) => array.push({
                available: res.count.toString(), 
                customer: res.name, 
                customer_id: res.id, 
                statusOne: res.status === 'out of stock' ? 'مخزون نفذ' : 'في المخزون', 
                purchasing_price: res.purchasing_price, 
                selling_price: res.selling_price, 
                statusTwo: res.deactivate === true ? 'معطل' : '', 
                editLink: `/app/owner/inventory/products/edit/${res.id}`,
                deleteLink: `store/UpdateProduct/${res.id}`,
                isChecked: false
            }))
            setProducts(array)
        })
        
    }, [products])

    const headerBtns = [
        {
            text: 'إضافة',
            color: 'success',
            icon: <AddIcon style={{ marginLeft: 5 }} />,
            to: "/app/owner/inventory/products/add"
        },
    ]

    
    const searchInputs = [
        {
            type: 'text',
            label: 'البحث بكلمة مفتاحية',
            placeholder: 'الاسم او الكود'
        },
        {
            type: 'dropdown',
            label: 'التصنيف',
            placeholder: ''
        },
        {
            type: 'dropdown',
            label: 'الماركة',
            placeholder: ''
        },
        {
            type: 'dropdown',
            label: 'الحالة',
            placeholder: ''
        }
    ]

    const enableSecondCol = true;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <DataTables 
            results={products} 
            enableSecondCol={enableSecondCol} 
            setResults={setProducts}
            headerBtns={headerBtns}
            searchInputs={searchInputs}
            deleteAllLink="store/CreateProduct/"
             />
        </motion.div>
    )
}

export default Products
