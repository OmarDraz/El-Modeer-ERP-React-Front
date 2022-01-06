import React, {useState, useEffect} from 'react'
import moment from 'moment';
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo';
import InputsGroup from '../../components/Reusable Components/InputsGroup';
import TextEditor from '../../components/Reusable Components/TextEditor';
import { motion } from 'framer-motion';
import TermsDetails from '../../components/Reusable Components/TermsDetails';
import { Checkbox, IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SelectionSearch from '../../components/Reusable Components/SelectionSearch';
import axios from 'axios'
import Cookies from 'js-cookie'
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import { useHistory } from 'react-router-dom';

export const Row = ({ky, terms, setTerms, validate}) => {
    const [count_before, setBefore] = useState(0)

    const onSelectProduct = (id, name, amount, price) => {
        let newArr = [...terms]
        if(amount !== 0){
        newArr[ky] = {...newArr[ky], amount: amount, price: price, item: name, product: id, count_after: 0}
        setTerms(newArr)
        setBefore(amount)
        } else {
            alert('لا يوجد كمية من هذا المنتج')
        }
        
    }

    const onSelectTax1 = (id, tax_name, tax_value, product_included) => {
        let newArr = [...terms]
        newArr[ky] = {...newArr[ky], tax1: id, tax1_name: tax_name, tax1_value: tax_value, product_included1: product_included}
        setTerms(newArr)
    }

    const onSelectTax2 = (id, tax_name, tax_value, product_included) => {
        let newArr = [...terms]
        newArr[ky] = {...newArr[ky], tax2: id, tax2_name: tax_name, tax2_value: tax_value, product_included2: product_included}
        setTerms(newArr)
    }

    return (
        <>
        <td width="10%">
                    <SelectionSearch link="sales/allProductsList" type="" onSelect={onSelectProduct} placeholder="اختر البند" />
                    {validate && !terms[ky].item ? <span className="errorLabel">مطلوب*</span> : ''}
                </td>
                <td width="10%">
                    <input type="text" style={{ outline: 'none', border: 'none' }} onChange={(e) => {
                        let newArr = [...terms]
                        newArr[ky] = {...newArr[ky], price: parseInt(e.target.value)}
                        setTerms(newArr)
                    }} value={terms[ky].price === 0 || isNaN(terms[ky].price) === true ? '' : terms[ky].price} placeholder="سعر الوحدة" />
                    {validate && !terms[ky].price ? <span className="errorLabel">مطلوب*</span> : ''}
                </td>
                <td width="10%">
                    <input type="text" onChange={(e) => {
                        let newArr = [...terms]
                        newArr[ky] = {...newArr[ky], amount: parseInt(e.target.value), count_after: count_before - parseInt(e.target.value)}
                        setTerms(newArr)
                    }}  value={terms[ky].amount === 0 || isNaN(terms[ky].amount) === true ? '' : terms[ky].amount} style={{ outline: 'none', border: 'none' }} placeholder="الكمية" />
                    {validate && !terms[ky].amount ? <span className="errorLabel">مطلوب*</span> : ''}
                    <span className="light__text">المخزون : {terms[ky].count_after}</span>
                </td>
                <td width="10%">
                    <SelectionSearch link="users/Tax" type="" onSelectTax={onSelectTax1} placeholder="اختر الضريبة" />
                </td>
                <td width="10%">
                    <SelectionSearch link="users/Tax" type="" onSelectTax={onSelectTax2} placeholder="اختر الضريبة" />
                </td>
                <td width="10%" style={{ background: 'rgb(235 235 235)' }}>
                    {
                        terms[ky].price * terms[ky].amount + (terms[ky].product_included1 === 'exclusive' && ((terms[ky].tax1_value) / 100) !==1 ? (terms[ky].tax1_value / 100) * terms[ky].price * terms[ky].amount : 0) + (terms[ky].product_included2 === 'exclusive' && ((terms[ky].tax2_value) / 100) !==1 ? (terms[ky].tax2_value / 100) * terms[ky].price * terms[ky].amount : 0)
                    }
                </td>
                <td width="2%" align="center">
                    <IconButton onClick={() => setTerms(terms.filter((term, i) => i !== ky))}>
                        <CancelIcon color="warning" />
                    </IconButton>
                </td>
        </>
    )
}

const CreateInvoice = () => {
    const date = new Date();
    const today = moment(date).format('yyyy-MM-DD')

    const [state, setState] = useState({
        customer: '',
        id: '0001',
        date: today,
        warehouse: 1,
        paid: 0,
        payment_method: 'cash',
        payment_terms: '',
        notes: '',
        sales_officer: ''
    })

    const history = useHistory()

    const [products, setProducts] = useState([])

    const [terms, setTerms] = useState([
        {
            item: '',
            price: 0,
            amount: 0,
            tax1: undefined,
            tax2: undefined,
            total: 0,
            product: 0
        }
    ])

    const [discount, setDiscount] = useState({
        discount: 0,
        discount_type: ''
    })


    const [shipping, setShipping] = useState({
        shipping_fees: 0,
        shipping_details: 'auto'
    })

    const [attachment, setAttachments] = useState([])

    const [taxes, setTaxes] = useState([])

    const handleAttachements = (e) => {
        setAttachments( {attachment: e.target.files[0]})
    }

    const headers = [
        'البند',
        'سعر',
        'الكمية',
        'الضريبة 1',
        'الضريبة 2',
        'الاجمالي',
        ''
    ]

    function getTotal() {
        let grandTotal = 0;
        const rowTotals = terms.map(row => row.amount *  row.price + (row.product_included1 === 'exclusive' && ((row.tax1_value) / 100) !==1 ? (row.tax1_value / 100) * row.price * row.amount : 0) + (row.product_included2 === 'exclusive' && ((row.tax2_value) / 100) !==1 ? (row.tax2_value / 100) * row.price * row.amount : 0));
        if (rowTotals.length > 0) {
          grandTotal = rowTotals.reduce((acc, val) => acc + val);
        }
        return grandTotal;
      }

    const renderTerms = (key, validate) => {
        return(
            <>
                <Row ky={key} terms={terms} setProducts={setProducts} products={products}taxes={taxes} setTaxes={setTaxes} setTerms={setTerms} validate={validate} />
            </>
        )
    }

    const [rightInputs, setRightInputs] = useState([])
    const [leftInputs, setLeftInputs] = useState([])
    const [validate, setValidate] = useState(false);
    const [err, setErr] = useState({
        statusCode: '',
    })

    const selectWarehouse = (e) => setState({...state, warehouse: parseInt(e)})
    useEffect(() => {
        setRightInputs([
            {
                label: 'العميل',
                type: 'searchSelection',
                placeholder: 'اختر عميل',
                width: '100%',
                value: state.customer,
                onSelect: (e) => {
                    setState({...state, customer: e})
                },
                link: 'sales/allCustomersList',
                to: '/app/owner/customers/add',
                dataValidate: 'برجاء اختيار العميل',
                optional: false
            },
            {
                label: 'مسؤول مبيعات',
                type: 'searchSelection',
                placeholder: 'اختر المسؤول',
                width: '100%',
                value: state.sales_officer,
                onSelect: (e) => {
                    setState({...state, sales_officer: e})
                },
                link: 'users/Employees',
                dataValidate: 'برجاء اختيار مسئول المبيعات',
                optional: false
            },
        ])
    
        setLeftInputs([

            {
                label: 'تاريخ الاصدار',
                type: 'date',
                change: (e) => {
                    setState({...state, date: e})
                },
                value: state.date,
                width: '100%',
                dataValidate: 'برجاء تحديد تاريخ اصدار الفاتورة',
                optional: false
            },
            {
                label: 'شروط الدفع (ايام)',
                type: 'text',
                value: state.payment_terms,
                change: (e) => {
                    setState({...state, payment_terms: e})
                },
                width: '30%',
                dataValidate: 'برجاء تحديد شروط الدفع ',
                optional: false
            },
        ])
    
    }, [state]) 

    function termsAdjust(){
        let array = []
        terms.forEach((term) => array.push({ quantity: parseInt(term.amount), unit_price: parseInt(term.price), count_after: parseInt(term.count_after), product: parseInt(term.product), tax1: parseInt(term.tax1), tax2: parseInt(term.tax2), }))
        return array;
    }
    function sendData(){
        if(
            leftInputs.filter((e) => e.value === '' && e.optional === false).length > 0 ||
            rightInputs.filter((e) => e.value === '' && e.optional === false).length > 0 || 
            terms.length === 0 || 
            terms.filter((e) => e.item === '' && !e.amount && !e.price).length > 0 ||
            state.warehouse === '' ||
            state.customer === ''
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
            const URL = 'http://api.maha-beauty.com/sales/create'
            let formData = new FormData();
            formData.append('customer', parseInt(state.customer))
            formData.append('warehouse', parseInt(state.warehouse))
            formData.append('discount', parseInt(discount.discount))
            formData.append('discount_type', discount.discount_type)
            formData.append('paid', parseInt(state.paid))
            formData.append('date', state.date)
            formData.append('shipping_fees', shipping.shipping_fees)
            formData.append('shipping_details', shipping.shipping_details)
            formData.append('notes', state.notes)
            formData.append('payment_method', state.payment_method)
            formData.append('payment_terms', parseInt(state.payment_terms))
            formData.append('payment_no', parseInt(state.payment_no))
            formData.append('total', (discount.discount !== 0 || shipping.shipping_fees !== 0) ? shipping.shipping_fees + getTotal() - (discount.discount_type === 'percentage' ? getTotal() - discount.discount : discount.discount) : getTotal())
            formData.append('sales_officer', parseInt(state.sales_officer))
            formData.append('SaleInvoice_products', JSON.stringify(termsAdjust()))
            attachment.attachment && formData.append('attachment', attachment.attachment)
            axios.post(URL, formData, config).then((res) => {
                setErr({statusCode : res.status})
                document.getElementsByClassName('statusPanel')[0].style.setProperty(
                    'display', 'block'
                )
                document.getElementsByClassName('statusPanel')[0].style.setProperty(
                    'background', res.status === 201 ? 'green' : 'red'
                )
            }).catch((err) => {
                setErr({statusCode : err.response.status})
            })

        }
    }

    function sendDataPrint(){
        if(
            leftInputs.filter((e) => e.value === '' && e.optional === false).length > 0 ||
            rightInputs.filter((e) => e.value === '' && e.optional === false).length > 0 || 
            terms.length === 0 || 
            terms.filter((e) => e.item === '' && !e.amount && !e.price).length > 0 ||
            state.warehouse === '' ||
            state.customer === ''
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
            const URL = 'http://api.maha-beauty.com/sales/create'
            let formData = new FormData();
            formData.append('customer', parseInt(state.customer))
            formData.append('warehouse', parseInt(state.warehouse))
            formData.append('discount', parseInt(discount.discount))
            formData.append('discount_type', discount.discount_type)
            formData.append('paid', parseInt(state.paid))
            formData.append('date', state.date)
            formData.append('shipping_fees', shipping.shipping_fees)
            formData.append('shipping_details', shipping.shipping_details)
            formData.append('notes', state.notes)
            formData.append('payment_method', state.payment_method)
            formData.append('payment_terms', parseInt(state.payment_terms))
            formData.append('payment_no', parseInt(state.payment_no))
            formData.append('total', (discount.discount !== 0 || shipping.shipping_fees !== 0) ? shipping.shipping_fees + getTotal() - (discount.discount_type === 'percentage' ? getTotal() - discount.discount : discount.discount) : getTotal())
            formData.append('sales_officer', parseInt(state.sales_officer))
            formData.append('SaleInvoice_products', JSON.stringify(termsAdjust()))
            attachment.attachment && formData.append('attachment', attachment.attachment)
            axios.post(URL, formData, config).then((res) => {
                history.push(`/app/owner/sales/invoices/view/${res.data.id}`)
            }).catch((err) => {
                setErr({statusCode : err.response.status})
            })

        }

    }

    const btns = [
        {
            text: 'حفظ دون طباعة',
            color: 'success',
            icon: <SaveIcon />,
            onClick: sendData
        },
        {
            text: 'حفظ و طباعة',
            color: 'primary',
            icon:  <PrintIcon />,
            onClick: sendDataPrint
        }
    ]

    return (
        <motion.div  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <PageHeaderTwo 
            setValidate={setValidate}
            leftOnly
            btns={btns}
            />
            <div className="panel w-100 statusPanel">
                <div className="flex__start">
                    {err.statusCode === 201 ? 
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
            rightText="العميل"
            leftText="بيانات الفاتورة"
            state={state}
            />
            <TermsDetails
            validate={validate}
            terms={terms}
            setTerms={setTerms}
            renderTerms={renderTerms}
            headers={headers}
            total={getTotal}
            optionsPanel
            discount={discount}
            setDiscount={setDiscount}
            setShipping={setShipping}
            shipping={shipping}
            setState={setState}
            create
            state={state}
            handleAttachements={handleAttachements}
            setAttachements={setAttachments}
            attachements={attachment}
            selectWarehouse={selectWarehouse}
            />
            <TextEditor
            state={state}
            setState={setState}
            />
            <div className="flex__start">
                <Checkbox color="secondary" onChange={(e) => setState({...state, paid: e.target.checked ? 1 : 0})} />
                <h4>مدفوع بالفعل</h4>
            </div>
            {
                state.paid ? (
                    <>
                        <div className="labeled__button mt-10">
                <label className="label">رقم المعرف</label>
                <input type="number" className="inputText" value={state.payment_no} onChange={(e) => setState({...state, payment_no: parseInt(e.target.value)})} />
            </div>
            <select onChange={(e) => setState({...state, payment_method: e.target.value ? e.target.value : 'cash'})} className="inputText mt-5">
                <option>وسيلة الدفع</option>
                <option value="cash">نقدي</option>
                <option value="cheque">شيك</option>
                <option value="bank transfer">تحويل بنكي</option>
                <option value="paytabs">بيتابس</option>
            </select>
                    </>
                ) : ''
            }
            
        </motion.div>
    )
}

export default CreateInvoice
