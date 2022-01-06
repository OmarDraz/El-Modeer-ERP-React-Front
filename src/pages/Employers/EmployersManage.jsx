import React, { useEffect, useState } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import PageHeader from '../../components/Reusable Components/PageHeader';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axiosInstance from '../../axios';
import { motion } from 'framer-motion';

const TableItem = (s) => {
    const [openRowMenu, setRowMenuOpened] = useState(false)
    const handleRowDropdown = () => {
        setRowMenuOpened(!openRowMenu)
    }
    return (
            <tr style={{ background: 'white' }}>
                <td>
                    <Checkbox id={s.id} checked={s.isChecked} onClick={s.handleCheckChieldElement} color="secondary"  />
                </td>
                <td>
                    {s.id}
                </td>
                <td>
                    {s.name}
                </td>
                <td>
                    {s.phone}
                </td>
                <td>
                    {s.status}
                </td>
                <td>
                    {s.role}
                </td>
                <td>
                    {s.last_login}
                </td>
                <td>
                <div>
                    <IconButton onClick={handleRowDropdown}>
                        <MoreHorizIcon />
                    </IconButton>
                    <ul className="dropdown-menu" style={{ display: openRowMenu ? 'block' : 'none', left: 10 }}>
                        <li>
                            <button>حذف</button>
                        </li>
                        <li>
                            <button onClick={() => console.log('h')}>إرسال إلى العميل</button>
                        </li>
                    </ul>
                </div>
                </td>
            </tr>
    )


}

const EmployersManage = () => {
    const [employers, setEmployers] = useState([])
    const [checked, setIsChecked] = useState(false);
    const [allChecked, setAllChecked] = useState(false)

    const handleAllChecked = (e) => {
        let allResults = employers;
        allResults.forEach(result => result.isChecked = e.target.checked)
        setEmployers(allResults)
        setAllChecked(!allChecked)
    }

    const handleCheckChieldElement = (e) => {
        let allResults = employers;
        allResults.forEach(result => {
        if (result.id === e.target.id)
            result.isChecked = e.target.checked;
        });
        setEmployers(allResults)
        setIsChecked(!checked)
        if(employers.filter(result => result.isChecked === false).length > 0){
            setAllChecked(false)
        } else {
            setAllChecked(true)
        }
    }
    const handleMultiDelete = (selected) => {
        const sel = selected
        setEmployers(employers.filter(e => !sel.includes(e.id)))
        
    }

    useEffect(() => {
        axiosInstance.get('users/Employees').then((res) => {
            let array = []
            res.data && res.data.forEach(res => array.push({
                id: res.id,
                name: res.name,
                phone: res.phone,
                status: res.active,
                // role: res.role,
                last_login: res.last_login,
                isChecked: false
            }))
            setEmployers(array)
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

    const actions = [
        {
            label: 'حذف',
            operation: handleMultiDelete
        }
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <PageHeader 
            headerBtns={headerBtns}
            searchInputs={searchInputs}
            search={true}
            actions={actions}
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
                            <td style={{ padding: 5 }}>الاسم</td>
                            <td style={{ padding: 5 }}>رقم الهاتف</td>
                            <td style={{ padding: 5 }}>الحالة</td>
                            <td style={{ padding: 5 }}>الدور الوظيفي</td>
                            <td style={{ padding: 5 }}>اخر عملية تسجيل دخول</td>
                            <td style={{ padding: 5 }}>الاجراءات</td>
                        </tr>
                    </thead>
                    <tbody>
                        {employers.map((s) =>
                        <TableItem {...s} handleCheckChieldElement={handleCheckChieldElement} />)}
                    </tbody>
            </table>
        </motion.div>
    )
}

export default EmployersManage
