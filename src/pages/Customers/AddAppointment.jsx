import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axios'
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo';
import SelectionSearch from '../../components/Reusable Components/SelectionSearch'
import { useHistory } from 'react-router';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import TextEditor from '../../components/Reusable Components/TextEditor';
import { Checkbox } from '@mui/material';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';

const AddAppointment = () => {
    const [state, setState] = useState({
        customer: '',
        date: '',
        time: '',
        action: '',
        share_with_customer: 0
    });

    const [duration, setDuration] = useState({
        min: '',
    })

    const [err, setErr] = useState({
        statusCode: '',
    })
    const [validate, setValidate] = useState(false);
    const [addEmp, setAddEmp] = useState(false)
    const [user, setUser] = useState('')

    const history = useHistory();
    useEffect(() => {
        let token = jwt_decode(Cookies.get('access_token'))
        setUser(token.id)
    },[])

    function sendData(){
        if(
            state.customer === '' || state.date === '' || state.time === '' || state.duration === ''
        )
        {
            setValidate(true)
            alert('برجاء ادخال بيانات صحيحة')
        }
        else {
            axiosInstance.post('appointments/getCreateAppointments', {
                customer: state.customer,
                date: state.date,
                time: state.time,
                duration: duration.min,
                action: state.action,
                add_by: user,
                notes: state.notes,
                employee: state.employee,
                share_with_customer: state.share_with_customer
            }).then((res) => {

                setErr({statusCode : res.status})
                document.getElementsByClassName('statusPanel')[0].style.setProperty(
                    'display', 'block'
                )
                document.getElementsByClassName('statusPanel')[0].style.setProperty(
                    'background', res.status === 200 ? 'green' : 'red'
                )
                
            }).catch((err) => setErr({statusCode: err.response.data}))
        }

    }
    const btns = [
        {
            text: 'الغاء',
            color: '',
            icon: <CloseIcon />,
            onClick: () => history.push('/app/owner/customers/appointments')
        },
        {
            text: 'حفظ',
            color: 'success',
            icon: <SaveIcon />,
            onClick: sendData
        }
    ]
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <PageHeaderTwo
            sendData={sendData}
            leftOnly
            btns={btns}/>
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
            <>
            <h4 className="panel-heading">بيانات الموعد</h4>
            <div className="panel">
                <div className="row" style={{ alignItems: 'center' }}>
                    <div className="col-3 col-sm-12 labeled__button">
                        <SelectionSearch link="sales/allCustomersList" label="العميل" type="outlined" onSelect={(e) => setState({...state, customer: parseInt(e)})} placeholder="اختر العميل" />
                        {(validate === true  && state.customer === '') ? <label className="errorLabel mr-10 mt-10">برجاء ادخال العميل</label> : ''}
                    </div>
                    <div className="col-2 col-sm-8 labeled__button">
                        <label className="label">التاريخ</label>
                        <input className="inputText w-100" type="date" value={state.date} onChange={(e) => setState({...state, date: e.target.value})} />
                        {(validate === true  && state.date === '') ? <label className="errorLabel mr-10 mt-10">برجاء ادخال تاريخ الموعد</label> : ''}

                    </div>
                    <div className="col-2 col-sm-4 labeled__button">
                        <label className="label">الوقت</label>
                        <input className="inputText w-100" type="time" value={state.time} onChange={(e) => setState({...state, time: e.target.value})} />
                        {(validate === true  && state.time === '') ? <label className="errorLabel mr-10 mt-10">برجاء ادخال الوقت</label> : ''}
                    </div>
                    <div className="col-4 col-sm-12 labeled__button">
                        <label className="label">المدة بالدقائق</label>
                        <div className="flex__between">
                            <div className="flex__column">
                                <div className="flex__start">
                                    <input className="inputText w-100" type="number" value={duration.min} onChange={(e) => setDuration({...duration, min: e.target.value})} />
                                </div>
                                {(validate === true  && duration.min === '') ? <label className="errorLabel mr-10 mt-10">برجاء ادخال الدقائق</label> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-sm-12">
                        <SelectionSearch placeholder="اختر اجراء" link="appointments/getCreateActions" label="الاجراء" modalHead="اضف اجراء جديد" type="outlined" onSelect={(e) => setState({...state, action: parseInt(e)})} create setState={setState} state={state} />
                        {(validate === true  && state.action === '') ? <label className="errorLabel mr-10 mt-10">برجاء ادخال الاجراء</label> : ''}

                    </div>
                    {/* <div className="col-6 col-sm-12">
                    <div className="labeled__button">
                    <label className="label">أضف إجراء</label>
                    <div style={{ height: 'auto', flexWrap: 'wrap', position: 'relative' }} className="p-10 inputText w-100 tagsContainer flex__start">
                        
                        <input type="text" value={state.action.name} className="mr-5" style={{ border: 'none', outline: 'none' }} placeholder="اكتب اجراء" onChange={(e) => setState({...state, action:{name: e.target.value}})} />
                        <SelectionSearch cat position="absolute" link="store/getCreateCategory"  onSelect={(id, name) => setState({...state, action:{id: parseInt(id), name: name}})}/>
                    </div>

                </div>
                    </div> */}
                    <div className="col-6 col-sm-12">
                        <select className="inputText" onChange={(e) => setState({...state, status: e.target.value})}>
                            <option value="scheduled">تم جدولته</option>
                            <option value="done">تم</option>
                            <option value="dismissed">فات</option>
                        </select>
                    </div>
                </div>
            </div>
            </>
            <TextEditor state={state} setState={setState} />
            <div className="flex__start">
                <Checkbox color="secondary" onChange={(e) => setState({...state, share_with_customer: e.target.checked ? 1 : 0})} />
                <h4>مشاركة مع العميل</h4>
            </div>
            <div className="flex__start">
                <Checkbox color="secondary" onChange={(e) => setAddEmp(!addEmp)} />
                <h4>اسناد الى موظف</h4>
            </div>
            <div className="panel mt-5" style={{ display: addEmp ? 'block' : 'none' }}>
                <SelectionSearch link="users/Employees" type="outlined" placeholder="اختر الموظف" label="الموظفين" />
            </div>
        </motion.div>

    )
}

export default AddAppointment
