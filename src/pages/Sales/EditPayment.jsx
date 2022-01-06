import React, { useState, useEffect } from 'react'
import axiosInstance from '../../axios'
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo'
import SelectionSearch from '../../components/Reusable Components/SelectionSearch'
import { useParams, useHistory } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios'
import moment from 'moment'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import { motion } from 'framer-motion'

const EditPayment = () => {
    const date = new Date();
    const today = moment(date).format('yyyy-MM-DD')
    const [validate, setValidate] = useState(false);
    const [attachment, setAttachment] = useState([])
    
    const [state, setState] = useState({
        Amount: '',
        payment_details: '',
        notes: '',
        method: '',
        ref_no : '',
        status: ''
    })
    const [err, setErr] = useState({
        statusCode: '',
    })

    const { paymentId, invoiceId } = useParams()
    const history = useHistory()

    useEffect(() => {
        axiosInstance.get('sales/PaymentDetails/' + parseInt(paymentId)).then((res) => {
            setState({
                Amount: res.data.Amount,
                payment_details: res.data.payment_details,
                notes: res.data.notes,
                method: res.data.method,
                ref_no: res.data.ref_no,
                status: res.data.status,

            })
            setAttachment(res.data.attachment)
        })
        let token = jwt_decode(Cookies.get('access_token'))

        setState({
            Collected_by: token.id,
            status: 'incomplete'
        })
    }, [paymentId])


    function sendData(){
        if(
            !state.method || !state.Amount 
        )
        {
            setValidate(true)
            alert('برجاء ادخال بيانات صحيحة')
        }
        else {
            const config = {
                headers: {
                    Authorization: Cookies.get('access_token')
                    ? 'JWT ' + Cookies.get('access_token')
                    : null,
                    'Content-Type': 'multipart/form-data'
                }
            }
            const URL = 'http://api.maha-beauty.com/sales/PaymentCreate'
            let formData = new FormData();
            formData.append('sales_invoice', parseInt(invoiceId))
            formData.append('payment_details', state.payment_details)
            formData.append('notes', state.notes)
            attachment.attachment && formData.append('attachment', attachment.attachment)
            formData.append('method', state.method)
            formData.append('ref_no', parseInt(state.ref_no))
            formData.append('status', state.status)
            formData.append('Collected_by', parseInt(state.Collected_by))
            formData.append('manual', parseInt(0))
            formData.append('Amount', parseInt(state.Amount))
            axios.post(URL, formData, config).then((res) => {
                setErr({statusCode : res.status})
                document.getElementsByClassName('statusPanel')[0].style.setProperty(
                    'display', 'block'
                )
                document.getElementsByClassName('statusPanel')[0].style.setProperty(
                    'background', res.status === 201 || res.status === 200 ? 'green' : 'red'
                )
            }).catch((err) => {
                setErr({statusCode : err.response.status})
            })

        }
    }

    const btns = [
        {
            text: 'الغاء',
            color: '',
            icon: <CloseIcon />,
            onClick: () => history.push(`/app/owner/sales/invoices/view/${parseInt(invoiceId)}`)
        },
        {
            text: 'تأكيد',
            color: 'success',
            icon: <SaveIcon />,
            onClick: sendData
        }
    ]

    const handleAttachment = (e) => {
        setAttachment( {attachment: e.target.files[0]})
    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <PageHeaderTwo 
            setValidate={setValidate}
            leftOnly
            btns={btns}
            />
            <div className="panel w-100 statusPanel">
                <div className="flex__start">
                    {err.statusCode === 201 || err.statusCode === 200 ? 
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
            <div className="panel">
            <div className="row">
                <div className="col-6 col-sm-12">
                    <div className="labeled__button">
                        <label className="label">الطريقة</label>
                        <select value={state.method} className="inputText w-100" onChange={(e) => setState({...state, method: e.target.value})}>
                            <option>وسيلة الدفع</option>
                            <option value="cash">نقدي</option>
                            <option value="cheque">شيك</option>
                            <option value="bank transfer">تحويل بنكي</option>
                            <option value="paytabs">بيتابس</option>
                        </select>
                        {
                            (validate === true && !state.method) ? <label className="errorLabel mr-10">برجاء اختيار وسيلة الدفع</label> : ''
                        }
                    </div>
                </div>
                <div className="col-6 col-sm-12">
                    <label className="label mb-10">المبلغ</label>
                    <input value={state.Amount} type="text" className="inputText w-100 mt-10" onChange={(e) => setState({...state, Amount: e.target.value})} />
                    {
                        (validate === true && !state.Amount) ? <label className="errorLabel mr-10">برجاء تحديد المبلغ</label> : ''
                    }
                </div>
                <div className="col-6 col-sm-12">
                    <label className="label mb-10">التاريخ</label>
                    <input type="date" value={state.date} readOnly className="inputText w-100 mt-10" value={today} />
                </div>
                <div className="col-6 col-sm-12">
                    <div className="labeled__button">
                        <label className="label mb-10">حالة الدفع</label>
                        <select value={state.status} className="inputText w-100" onChange={(e) => setState({...state, status: e.target.value})}>
                            <option value="incomplete">غير مكتمل</option>
                            <option value="complete">مكتمل</option>
                            <option value="pending">تحت المراجعة</option>
                            <option value="failed">فاشلة</option>
                        </select>
                    </div>
                </div>
                <div className="col-6 col-sm-12 mt-10">
                    <SelectionSearch link="users/Employees" onSelect={(id) => setState({...state, Collected_by: parseInt(id)})} type="outlined" placeholder={state.employee_name} label="تم التحصيل بواسطة" />
                </div>
                <div className="col-6 col-sm-12">
                    <label className="label mb-10">الرقم المعرف</label>
                    <input type="number" value={state.ref_no} className="inputText w-100 mt-10 mb-10" onChange={(e) => setState({...state, ref_no: e.target.value})} />
                </div>
                <div className="col-6 col-sm-12">
                    <div className="labeled__button">
                    <label className="label mb-10 mt-10">بيانات الدفع</label>
                    <textarea value={state.payment_details} className="inputText" rows="10" onChange={(e) => setState({...state, payment_details: e.target.value})} style={{ width: '100%', height: 100 }} />
                    </div>
                </div>
                <div className="col-6 col-sm-12">
                    <div className="labeled__button">
                        <label className="label mb-10">ملاحظات ايصال الاستلام</label>
                        <textarea value={state.notes} className="inputText" rows="10" onChange={(e) => setState({...state, notes: e.target.value})} style={{ width: '100%', height: 100 }} />
                    </div>
                </div>
                <div className="col-6 col-sm-12">
                        <label className="label ml-10">المرفق</label>
                        <input value={attachment} type="file" onChange={handleAttachment} />
                </div>
            </div>
        </div>
        </motion.div>
    )
}

export default EditPayment
