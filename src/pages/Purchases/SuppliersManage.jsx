import React, { useEffect, useState } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import PageHeader from '../../components/Reusable Components/PageHeader';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../axios';
import DeleteModal from '../../components/Reusable Components/DeleteModal';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SuppliersManage = () => {
    const [suppliers, setSuppliers] = useState([])
    const [checked, setIsChecked] = useState(false);
    const [allChecked, setAllChecked] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const handleAllChecked = (e) => {
        let allResults = suppliers;
        allResults.forEach(result => result.isChecked = e.target.checked)
        setSuppliers(allResults)
        setAllChecked(!allChecked)
    }

    const handleCheckChieldElement = (e) => {
        let allResults = suppliers;
        allResults.forEach(result => {
        if (result.id === e.target.id)
            result.isChecked = e.target.checked;
        });
        setSuppliers(allResults)
        setIsChecked(!checked)
        if(suppliers.filter(result => result.isChecked === false).length > 0){
            setAllChecked(false)
        } else {
            setAllChecked(true)
        }
    }

    const screenSize = useSelector(state=> state.mobileReducer)

    const handleMultiDelete = (selected) => {
        const sel = selected
        setSuppliers(suppliers.filter(e => !sel.includes(e.id)))
        
    }
    const actions = [
        {
            label: 'حذف',
            operation: handleMultiDelete
        }
    ]

    useEffect(() => {
        axiosInstance.get('users/SupplierCreate').then((res) => {
            let array = []
            res.data.forEach((res) => array.push({
                id: res.id,
                name: res.name,
                country: res.country,
                status: res.is_active ? 'نشط' : 'غير مفعل',
                addedBy: res.add_by,
                isChecked: false
            }))
            setSuppliers(array)
        })
    }, [])
    const searchInputs = [
        {
            type: 'text',
            label: 'الاسم',
            placeholder: ''
        },
        {
            type: 'text',
            label: 'رقم المورد',
            placeholder: ''
        },
    ]
    const headerBtns = [
        {
            text: 'مورد جديد',
            color: 'success',
            icon: <AddIcon />,
        },
    ]
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <PageHeader 
            headerBtns={headerBtns}
            searchInputs={searchInputs}
            actions={actions}
            search={false}
            checkAllowed
            allChecked={allChecked}
            handleAllChecked={handleAllChecked}
              />
            <table width="100%">
                    <thead className="panel-heading">
                        <tr>
                            <td style={{ padding: 5 }}>
                            </td>
                            <td style={{ padding: 5 }}>#</td>
                            <td style={{ padding: 5 }}>الاسم التجاري</td>
                            <td style={{ padding: 5 }}>البلد</td>
                            <td style={{ padding: 5 }}>الحالة</td>
                            <td style={{ padding: 5 }}>أضيف بواسطة</td>
                            <td style={{ padding: 5 }}>الاجراءات</td>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((s) =><tr style={{ background: 'white' }}>
                            <td>
                                <Checkbox id={s.id} checked={s.isChecked} onClick={handleCheckChieldElement} color="secondary"  />
                            </td>
                            <td>
                                {s.id}
                            </td>
                            <td>
                                {s.name}
                            </td>
                            <td>
                                {s.country}
                            </td>
                            <td>
                                {s.status}
                            </td>
                            <td>
                                {s.addedBy}
                            </td>
                            <td className={screenSize ? `flex__column` : 'flex__event'}>
                                <IconButton onClick={() => {
                                    handleOpen()
                                }} color="warning">
                                    <DeleteIcon  fontSize={screenSize ? 'small' : 'medium'}/>
                                </IconButton>
                                <IconButton component={Link} to={`/app/owner/purchases/suppliers/edit/${s.id}`} color="success">
                                    <EditIcon  fontSize={screenSize ? 'small' : 'medium'}/>
                                </IconButton>
                            </td>
                            <DeleteModal setResults={setSuppliers} results={suppliers} id={s.id} openModal={openModal} setOpenModal={setOpenModal} toBeDeletedName={s.name} toBeDeletedLink={`users/SupplierUpdate/${s.id}`} handleClose={handleClose} handleOpen={handleOpen} />
                        </tr>)}
                    </tbody>
            </table>
        </motion.div>
    )
}

export default SuppliersManage
