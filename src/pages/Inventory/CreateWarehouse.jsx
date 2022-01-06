import React, { useState } from 'react'
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo'
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axiosInstance from '../../axios';
import { Checkbox } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';


const CreateWarehouse = () => {
    const [state, setState] = useState({
        name: '',
        address: '',
        deactivate: 0
    })
    const [validate, setValidate] = useState(false);
    const [err, setErr] = useState({
        statusCode: '',
    })


    const history = useHistory()

    function sendData(){
        if(
            state.name === '' ||
            state.address === ''
        )
        {
            setValidate(true)
            alert('برجاء ادخال بيانات صحيحة')
        }
        else {
            axiosInstance.post('store/GetCreateWarehouses ', state).then((res) => {                 
            setErr({statusCode : res.status})
            document.getElementsByClassName('statusPanel')[0].style.setProperty(
                'display', 'block'
            )
            document.getElementsByClassName('statusPanel')[0].style.setProperty(
                'background', res.status === 200 ? 'green' : 'red'
            )
        }).catch((err) => {
            setErr({statusCode : err.response.status})
        })
        }
    }
    const btns = [
        {
            text: 'تأكيد',
            color: 'success',
            icon: <SaveIcon />,
            onClick: sendData
        },
        {
            text: 'الغاء',
            color: '',
            icon: <CloseIcon />,
            onClick: () => history.push('/app/owner/inventory/stores/')
        },
    ]
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <PageHeaderTwo 
            preview = {false}
            leftOnly
            btns={btns}
            />
            <div className="panel w-100 statusPanel">
                <div className="flex__start">
                    {err.statusCode === 200 ? 
                    <>
                    <CheckCircleIcon className="ml-5" /> 
                    <span>تم حفظ البيانات بنجاح</span> 
                    </>
                    :
                    <>
                     <CancelIcon className="ml-5" /> 
                     <span>خطأ في الإرسال</span>
                    </>
                     }
                </div>
            </div>
            <div className='panel flex__start'>
                <div className="labeled__button">
                    <label className="label">اسم المستودع</label>
                    <input className="inputText" onChange={(e) => setState({...state, name: e.target.value})} />
                    {(validate === true && state.name === '') ? <label className="errorLabel mt-10">برجاء تحديد اسم المستودع*</label> : ''}

                </div>
                <div className="labeled__button">
                    <label className="label">العنوان</label>
                    <input className="inputText" onChange={(e) => setState({...state, address: e.target.value})} />
                    {(validate === true && state.address === '') ? <label className="errorLabel mt-10">برجاء تحديد عنوان المستودع*</label> : ''}
                </div>
                <div className="flex__start">
                    <Checkbox color="secondary" onChange={(e) => setState({...state, deactivate: e.target.checked ? 1 : 0})} />
                    <h4>علم هنا اذا كنت تريد تعطيله</h4>
                </div>
            </div>
        </motion.div>
    )
}

export default CreateWarehouse
