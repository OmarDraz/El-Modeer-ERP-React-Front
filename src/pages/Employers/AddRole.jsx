import { Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/Reusable Components/PageHeader'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../axios';
import { motion } from 'framer-motion';


const CheckItem = (props) => {
    const [checked, setChecked] = useState(false)
    const [allChecked, setAllChecked] = useState(false)
    return(
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <span className="panel-heading flex__start">
                <Checkbox checked={allChecked} style={{ color: 'white' }} onClick={(e) => {props.roles.forEach(role => {
                    role.isChecked = e.target.checked
                }); setChecked(!checked); setAllChecked(!allChecked)}} />
                <h4>{props.head}</h4>
            </span>
            <div className="panel">
                <div className="row">
                    {props.roles.map((role) => 
                    <div className="col-4 col-sm-12 flex__start">
                        <Checkbox checked={role.isChecked} color="secondary" onClick={(e) => {role.isChecked = e.target.checked; setChecked(!checked)
                         if(props.roles.filter(result => result.isChecked === false).length > 0){
                                setAllChecked(false)
                            } else {
                                setAllChecked(true)
                            }} }  />
                        <h4>{role.label}</h4>
                    </div>)}
                </div>
            </div>
        </motion.section>
    )
}



const AddRole = () => {
    const [roles, setRoles] = useState([])
    const headerBtns = [
        {
            text: 'حفظ',
            color: 'success',
            icon: <SaveIcon />,
        },
        {
            text: 'الغاء',
            color: 'warning',
            icon: <CloseIcon />,
        },
    ]

    const productRoles = [
        {
            label: 'إضافة منتج جديد',
            isChecked: false,
            onChange: () => setRoles
        },
        {
            label: 'عرض كل المنتجات',
            isChecked: false,
            onChange: () => setRoles
        },
        {
            label: 'تعديل وحذف كل المنتجات',
            isChecked: false,
            onChange: () => setRoles
        },
    ]

    const salesRoles = [
        {
            label: 'إضافة فواتير / عروض سعر',
            isChecked: false
        },
        {
            label: 'عرض كل الفواتير / عروض السعر',
            isChecked: false
        },
        {
            label: 'عرض كل الفواتير / عروض السعر الخاصة به',
            isChecked: false
        },
        {
            label: 'تعديل وحذف كل الفواتير / عروض السعر',
            isChecked: false
        },
        {
            label: 'إضافة عمليات دفع لكل الفواتير',
            isChecked: false
        },
        {
            label: 'تعديل خيارات الدفع',
            isChecked: false
        }
    ]

    const customerRoles = [
        {
            label: 'إضافة عميل جديد',
            isChecked: false
        },
        {
            label: 'عرض جميع العملاء',
            isChecked: false
        },
        {
            label: 'تعديل وحذف جميع العملاء',
            isChecked: false
        },
    ]

    const inventoryRoles = [
        {
            label: 'إضافة إذن مخزني',
            isChecked: false
        },
        {
            label: 'تعديل و حذف الإذن المخزني',
            isChecked: false
        },
        {
            label: 'عرض الإذن المخزني',
            isChecked: false
        },
        {
            label: 'إضافة موردين جدد',
            isChecked: false
        },
        {
            label: 'تعديل وحذف كل الموردين',
            isChecked: false
        },
        {
            label: 'عرض كل الموردين',
            isChecked: false
        },
        {
            label: 'عرض كل فواتير الشراء',
            isChecked: false
        },
        {
            label: 'عرض فواتير الشراء الخاصة به',
            isChecked: false
        }
    ]
    
    const customerFollowRoles = [
        {
            label: 'إضافة ملاحظات / مرفقات / مواعيد لعملائه المعينين',
            isChecked: false
        },
    ]

    const employersRoles = [
        {
            label: 'إضافة موظف جديد',
            isChecked: false
        },
        {
            label: 'تعديل وحذف موظف',
            isChecked: false
        },
        {
            label: 'إضافة دور وظيفي جديد',
            isChecked: false
        }
    ]

    return (
        <div>
            <PageHeader 
            search={false} 
            headerBtns={headerBtns} 
            leftOnly />
            <div className="labeled__button">
                <label className="label">الاسم</label>
                <input type="text" className="inputText" />
            </div>
            <CheckItem head="المنتجات" roles={productRoles} />
            <CheckItem head="المبيعات" roles={salesRoles} />
            <CheckItem head="العملاء" roles={customerRoles} />
            <CheckItem head="إدارة المخزون" roles={inventoryRoles} />
            <CheckItem head="متابعة العميل" roles={customerFollowRoles} />
            <CheckItem head="الموظفين" roles={employersRoles} />
        </div>
    )
}

export default AddRole
