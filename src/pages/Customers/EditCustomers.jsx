import React, {useState, useEffect} from 'react'
import InputsGroup from '../../components/Reusable Components/InputsGroup'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo';
import { useHistory } from 'react-router';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axiosInstance from '../../axios';
import { Country, City }  from 'country-state-city';
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
 
const EditCustomer = () => {
    const [validate, setValidate] = useState(false);
    const [err, setErr] = useState({
        statusCode: '',
    })
    const [state, setState] = useState({
        currency: 'eg',
            email: '',
            first_name: '',
            middle_name: '',
            last_name: "",
            telephone: '',
            phone: '',
            address: '',
            city: '',
            postal_code: '',
            country: '',
            notes: ''
    })

    const history = useHistory()

    const { customerId } = useParams()

    const rightInputs = [
        {
            label: 'الاسم الاول',
            type: 'text',
            width: '30%',
            value:state.first_name,
            change: (e) => {
                setState({...state, first_name: e })
            },
            optional: false,
            dataValidate: 'برجاء ادخال الاسم الأول'
        },
        {
            label: 'الاسم الوسط',
            type: 'text',
            value:state.middle_name,
            change: (e) => {
                setState({...state, middle_name: e})
            },
            width: '30%',
            optional: false,
            dataValidate: 'برجاء ادخال الاسم الوسط'
        },
        {
            label: 'الاسم الاخير',
            type: 'text',
            value:state.last_name,
            change: (e) => {
                setState({...state, last_name: e})
            },
            width: '30%',
            optional: false,
            dataValidate: 'برجاء ادخال الاسم الأخير'
        },
        {
            label: 'الهاتف',
            type: 'text',
            value:state.telephone,
            width: '50%',
            change: (e) => {
                setState({...state, telephone: e})
            },
            optional: false,
            dataValidate: 'برجاء ادخال رقم الهاتف'
        },
        {
            label: 'جوال (اختياري)',
            type: 'text',
            value:state.phone,
            change: (e) => {
                setState({...state, phone: e})
            },
            width: '50%',
            optional: true,
        },
        {
            label: 'عنوان الشارع 1 (اختياري)',
            type: 'text',
            value: state.address,
            change: (e) => {
                setState({...state, address: e})
            },
            width: '100%',
            optional: true
        },
        {
            label: 'البلد',
            type: 'selection',
            width: '30%',
            value:state.country,
            change: (e) => {
                setState({...state, country: e.target.value, city: ''})
            },
            optional: true,
            options : Country.getAllCountries()
        },
        {
            label: 'المدينة (اختياري)',
            type: 'selection',
            value:state.city,
            width: '30%',
            change: (e) => {
                
                setState({...state, city: e.target.value})
            },
            optional: true,
            options: City.getCitiesOfCountry(state.country)
        },
        {
            label: 'الرمز البريدي (اختياري)',
            type: 'text',
            width: '30%',
            optional: true,
            value: state.postal_code,
            change: (e) => {
                setState({...state, postal_code: e})
            },
        },
    ]

    const leftInputs = [
        {
            label: 'البريد الالكتروني',
            type: 'text',
            value:state.email,
            change: (e) => {
                setState({...state, email: e})
            },
            width: '100%',
            optional: false,
            dataValidate: 'برجاء ادخال البريد الالكتروني'
        },
        {
            label: 'الملاحظات (اختياري)',
            type: 'textarea',
            value: state.notes,
            change: (e) => {
                setState({...state, notes: e})
            },
            width: '100%',
            optional: true,
        }
    ]
    const btns = [
        {
            text: 'الغاء',
            color: '',
            icon: <CloseIcon />,
            onClick: () => history.push('/app/owner/customers/')
        },
        {
            text: 'حفظ',
            color: 'success',
            icon: <SaveIcon />,
            onClick: sendData
        }
    ]

    function sendData(){
        if(
            leftInputs.filter((e) => e.optional === false && !e.value).length > 0 ||
            rightInputs.filter((e) => e.optional === false && !e.value).length > 0
        )
        {
            setValidate(true)
            alert('برجاء ادخال بيانات صحيحة')
        }
        else {
            axiosInstance.put('users/CustomerDetails/' + customerId, {
                currency: 'eg',
                user:{
                    first_name: state.first_name,
                    middle_name: state.middle_name,
                    last_name: state.last_name,
                    country: state.country,
                    city: state.city,
                    address: state.address,
                    email:state.email,
                    postal_code: state.postal_code,
                    country: state.country,
                    notes: state.notes,
                    phone: state.phone,
                    telephone: state.telephone
                }
            }).then((res) => {
                setErr({statusCode : res.status})
                document.getElementsByClassName('statusPanel')[0].style.setProperty(
                    'display', 'block'
                )
                document.getElementsByClassName('statusPanel')[0].style.setProperty(
                    'background', res.status === 200 ||res.status === 204 ? 'green' : 'red'
                )
            }).catch((err) => setErr({statusCode: err.response.data}))
        }

    }

    useEffect(() => {
        axiosInstance.get('users/CustomerDetails/' + parseInt(customerId)).then((res) => {
            setState({
                currency: 'eg',
                email: res.data.user.email,
                first_name: res.data.user.first_name,
                middle_name: res.data.user.middle_name,
                last_name: res.data.user.last_name,
                telephone: res.data.user.telephone,
                phone: res.data.user.phone,
                country: res.data.user.country  ,
                city: res.data.user.city,
                postal_code: res.data.user.postal_code,
                notes: res.data.user.notes,
                address: res.data.user.address
            })
        })
    }, [])
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <PageHeaderTwo
            sendData={sendData}
            leftOnly
            btns={btns}/>
            <div className="panel w-100 statusPanel">
                <div className="flex__start">
                    {err.statusCode === 200 ||err.statusCode === 204  ? 
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
            <InputsGroup 
            validate={validate}
            leftInputs={leftInputs} 
            state={state}
            rightInputs={rightInputs}
            rightText="بيانات العميل"
            leftText="بيانات الحساب" />
        </motion.div>
    )
}

export default EditCustomer
