import React, {useState, useEffect} from 'react'
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo';
import InputsGroup from '../../components/Reusable Components/InputsGroup';
import TermsDetails from '../../components/Reusable Components/TermsDetails';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import SelectionSearch from '../../components/Reusable Components/SelectionSearch';
import { useHistory } from 'react-router';
import axiosInstance from '../../axios';
import { motion } from 'framer-motion';


export const Row = ({ky, terms, products, setTerms, validate}) => {
    const selectProduct = (id, name, amount, price) => {
        let newArr = [...terms]
        newArr[ky] = {...newArr[ky], price: price, item: name, stockBefore: amount, product: id }
        setTerms(newArr)
    }
    return (
        <>
        <td width="10%">
                    <SelectionSearch link="sales/allProductsList" onSelect={selectProduct} placeholder="اختر البند" />
                    {validate && !terms[ky].item ? <span className="errorLabel">مطلوب*</span> : ''}
                </td>
                <td width="10%">
                    <input type="text" style={{ outline: 'none', border: 'none' }} onChange={(e) => {
                        let newArr = [...terms]
                        newArr[ky] = {...newArr[ky], price: parseInt(e.target.value), total: parseInt(e.target.value) * terms[ky].amount}
                        setTerms(newArr)
                    }} value={terms[ky].price === 0 || isNaN(terms[ky].price) === true ? '' : terms[ky].price} placeholder="سعر الوحدة" />
                    {validate && !terms[ky].price ? <span className="errorLabel">مطلوب*</span> : ''}
                </td>
                <td width="10%">
                    <input type="text" onChange={(e) => {
                        let newArr = [...terms]
                        newArr[ky] = {...newArr[ky], amount: parseInt(e.target.value), total: newArr[ky].price * parseInt(e.target.value), stockAfter: terms[ky].stockBefore - parseInt(e.target.value)}
                        setTerms(newArr)
                    }}  value={terms[ky].amount === 0 || isNaN(terms[ky].amount) === true ? '' : terms[ky].amount} style={{ outline: 'none', border: 'none' }} placeholder="الكمية" />
                    {validate && !terms[ky].amount ? <span className="errorLabel">مطلوب*</span> : ''}
                </td>
                <td width="10%">
                    {
                        isNaN(terms[ky].stockBefore) ? 0 : <span>{terms[ky].stockBefore}</span>
                    }
                </td>
                <td width="10%">
                    {
                        isNaN(terms[ky].stockAfter) ? 0 : <span>{terms[ky].stockAfter}</span>
                    }
                </td>
                <td width="10%" style={{ background: 'rgb(235 235 235)' }}>
                    {isNaN(terms[ky].total) === true ? 0 : terms[ky].total}
                </td>
                <td width="2%" align="center">
                    <IconButton onClick={() => setTerms(terms.filter((term, i) => i !== ky))}>
                        <CancelIcon color="warning" />
                    </IconButton>
                </td>
        </>
    )
}

const AddOutRequisition = () => {
    const history = useHistory()

    const [state, setState] = useState({
        warehouse: '',
        notes: ''
    })

    const [terms, setTerms] = useState([
        {
            item: '',
            price: 0,
            amount: 0,
            stockBefore: '',
            stockAfter: '',
            total: 0
        }
    ])

    const [err, setErr] = useState({
        statusCode: '',
    })

    const headers = [
        'البند',
        'سعر',
        'الكمية',
        'رصيد المخزن قبل',
        'رصيد المخزن بعد',
        'الاجمالي',
        ''
    ]

    const getTotal = () => {
        let total = terms.map(item => item.total).reduce((prev, curr) => prev + curr, 0)
        if(isNaN(total)){
            return 0
        } else {
            return total
        }
    }
    const renderTerms = (key, validate) => {
        return(
            <>
                <Row ky={key} terms={terms} setTerms={setTerms} validate={validate} />
            </>
        )
    }

    const [validate, setValidate] = useState(false);

    const rightInputs = [
        {
            label: 'المستودع',
            type: 'searchSelection',
            placeholder: 'اختر المستودع',
            width: '100%',
            value: state.warehouse,
            onSelect: (e) => {
                setState({...state, warehouse: parseInt(e)})
            },
            link: 'sales/allWarehousesList',
            to: '/',
            dataValidate: 'برجاء اختيار المستودع',
            optional: false
        },
    ]

    const leftInputs = [
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

    function termsAdjust(){
        let array = []
        terms.forEach((term) => array.push({ quantity: parseInt(term.amount), unit_price: parseInt(term.price), count_after: parseInt(term.stockAfter), product: parseInt(term.product)}))
        return array;
    }

    function sendData(){
        if(
            leftInputs.filter((e) => e.value === '' && e.optional === false).length > 0 ||
            rightInputs.filter((e) => e.value === '' && e.optional === false).length > 0 || 
            terms.length === 0 || 
            terms.filter((e) => e.item === '' && !e.amount && !e.price).length > 0
        )
        {
            setValidate(true)
            alert('برجاء ادخال بيانات صحيحة')
        }
        else {
            axiosInstance.post('store/CreateOutPermission', {
                warehouse: parseInt(state.warehouse),
                notes: state.notes,
                AddPermissions_Products: termsAdjust()
            }).then((res) => {                 
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
            onClick: sendData
        },
        {
            text: 'الغاء',
            color: '',
            icon: <CloseIcon />,
            onClick: () => history.push('/app/owner/inventory/requistions/choose')
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
            <InputsGroup
            validate={validate} 
            rightInputs={rightInputs} 
            leftInputs={leftInputs}
            rightText="الاذن"
            leftText="بيانات إضافية"
            state={state}
            />
            <TermsDetails
            validate={validate}
            terms={terms}
            setTerms={setTerms}
            renderTerms={renderTerms}
            headers={headers}
            create
            total={getTotal}
            />
        </motion.div>
    )
}

export default AddOutRequisition
