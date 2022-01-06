import React, {useState, useEffect} from 'react'
import InputsGroup from '../../components/Reusable Components/InputsGroup'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo';
import { useHistory } from 'react-router';
import { motion } from 'framer-motion';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axiosInstance from '../../axios';
import { Country, City }  from 'country-state-city';

const AddSupplier = () => {
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
            country: 'SA',
            notes: ''
    })

    const history = useHistory()

    const rightInputs = [
        {
            label: 'الاسم التجاري',
            type: 'text',
            width: '100%',
            value:state.business_name,
            change: (e) => {
                setState({...state, business_name: e })
            },
            optional: false,
            dataValidate: 'برجاء ادخال الاسم التجاري'
        },
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
            label: 'عنوان الشارع (اختياري)',
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
                setState({...state, country: e.target.value})
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
        {
            label: 'سجل تجاري (اختياري)',
            type: 'text',
            width: '50%',
            value:state.commercial_record,
            change: (e) => {
                setState({...state, commercial_record: e })
            },
            optional: true,
        },
        {
            label: 'بطاقة ضريبية',
            type: 'text',
            value:state.Tax_id,
            change: (e) => {
                setState({...state, Tax_id: e})
            },
            width: '50%',
            optional: true,
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
            axiosInstance.post('users/SupplierCreate', {
                Tax_id: state.Tax_id,
                business_name: state.business_name,
                commercial_record: state.commercial_record,
                user:{
                    type: 'supplier',
                    first_name: state.first_name,
                    middle_name: state.middle_name,
                    last_name: state.last_name,
                    country: state.country,
                    city: state.city,
                    address: state.address,
                    email:state.email,
                    postal_code: state.postal_code,
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
                    'background', res.status === 200 ? 'green' : 'red'
                )
                
            }).catch((err) => setErr({statusCode: err.response.data}))
        }

    }

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
            <InputsGroup 
            validate={validate}
            leftInputs={leftInputs} 
            state={state}
            rightInputs={rightInputs}
            rightText="بيانات المورد"
            leftText="بيانات الحساب" />
        </motion.div>
    )
}

export default AddSupplier
