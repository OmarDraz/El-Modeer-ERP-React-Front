import React, { useEffect, useState } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import PageHeader from '../../components/Reusable Components/PageHeader';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';

const RolesManage = () => {
    const [roles, setRoles] = useState([])
    const [checked, setIsChecked] = useState(false);
    const [allChecked, setAllChecked] = useState(false)

    const handleAllChecked = (e) => {
        let allResults = roles;
        allResults.forEach(result => result.isChecked = e.target.checked)
        setRoles(allResults)
        setAllChecked(!allChecked)
    }

    const handleCheckChieldElement = (e) => {
        let allResults = roles;
        allResults.forEach(result => {
        if (result.id === e.target.id)
            result.isChecked = e.target.checked;
        });
        setRoles(allResults)
        setIsChecked(!checked)
        if(roles.filter(result => result.isChecked === false).length > 0){
            setAllChecked(false)
        } else {
            setAllChecked(true)
        }
    }

    const screenSize = useSelector(state=> state.mobileReducer)

    useEffect(() => {
        setRoles([
            {
                id: '1',
                role: 'إدارة',
                isChecked: false
            },
            {
                id: '2',
                role: 'موظف',
                isChecked: false
            },
        ])
    }, [])
    const headerBtns = [
        {
            text: 'دور وظيفي جديد',
            color: 'success',
            icon: <AddIcon />,
        },
    ]
    return (
        <motion.div>
            <PageHeader 
            headerBtns={headerBtns}
            leftOnly
            search={false}
            allChecked={allChecked}
            handleAllChecked={handleAllChecked}
              />
            <table width="100%">
                    <thead className="panel-heading">
                        <tr>
                            <td style={{ padding: 5 }}>
                            </td>
                            <td style={{ padding: 5 }}>#</td>
                            <td style={{ padding: 5 }}>الدور الوظيفي</td>
                            <td style={{ padding: 5 }}>الاجراءات</td>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((s) =><tr style={{ background: 'white' }}>
                            <td>
                                <Checkbox id={s.id} checked={s.isChecked} onClick={handleCheckChieldElement} color="secondary"  />
                            </td>
                            <td>
                                {s.id}
                            </td>
                            <td>
                                {s.role}
                            </td>
                            <td className={screenSize ? `flex__column` : 'flex__event'}>
                                <IconButton color="warning">
                                    <DeleteIcon  fontSize={screenSize ? 'small' : 'medium'}/>
                                </IconButton>
                                <IconButton color="success">
                                    <EditIcon  fontSize={screenSize ? 'small' : 'medium'}/>
                                </IconButton>
                            </td>
                        </tr>)}
                    </tbody>
            </table>
        </motion.div>
    )
}

export default RolesManage
