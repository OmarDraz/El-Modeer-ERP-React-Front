import React, {useState, useEffect} from 'react'
import moment from 'moment';
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo';
import InputsGroup from '../../components/Reusable Components/InputsGroup';
import TextEditor from '../../components/Reusable Components/TextEditor';
import TermsDetails from '../../components/Reusable Components/TermsDetails';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material'
import PrintIcon from '@mui/icons-material/Print';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SelectionSearch from '../../components/Reusable Components/SelectionSearch';
import axios from 'axios'
import Cookies from 'js-cookie'
import { useHistory, useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import { Button } from '@mui/material';

export const Row = ({ky, terms, setTerms, validate, before, amount}) => {

    const onSelectProduct = (id, name, amount, price) => {
        let newArr = [...terms]
        if(amount !== 0){
        newArr[ky] = {...newArr[ky], amount: amount, price: price, item: name, product: id, count_after: 0}
        setTerms(newArr)
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
                    <SelectionSearch link="sales/allProductsList" type="" onSelect={onSelectProduct} placeholder={terms[ky].item} />
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
                        newArr[ky] = {...newArr[ky], amount: parseInt(e.target.value)}
                        setTerms(newArr)
                    }}  value={terms[ky].amount === 0 || isNaN(terms[ky].amount) === true ? '' : terms[ky].amount} style={{ outline: 'none', border: 'none' }} placeholder="الكمية" />
                    {validate && !terms[ky].amount ? <span className="errorLabel">مطلوب*</span> : ''}
                </td>
                <td width="10%">
                    <SelectionSearch link="users/Tax" type="" onSelectTax={onSelectTax1} placeholder={terms[ky].tax_name1 ? terms[ky].tax_name1 : 'اختر الضريبة'} />
                </td>
                <td width="10%">
                    <SelectionSearch link="users/Tax" type="" onSelectTax={onSelectTax2} placeholder={terms[ky].tax_name2 ? terms[ky].tax_name2 : 'اختر الضريبة'} />
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

const EditInvoice = () => {
    const date = new Date();
    const today = moment(date).format('yyyy-MM-DD')
    const { invoiceId } = useParams()

    const [state, setState] = useState({
        customer: '',
        id: '0001',
        date: today,
        warehouse: 1,
        payment_method: 'cash',
        payment_terms: '',
        notes: '',
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

    const [attachment, setAttachment] = useState({})
    const [attachmentName, setAttachmentName] = useState('')

    const [taxes, setTaxes] = useState([])

    const handleAttachements = (e) => {
        setAttachment({attachment: e.target.files[0]})
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

    const renderTerms = (key, validate, before, amount) => {
        return(
            <>
                <Row ky={key} terms={terms} before={before} amount={amount} setProducts={setProducts} products={products}taxes={taxes} setTaxes={setTaxes} setTerms={setTerms} validate={validate} />
            </>
        )
    }

    const [validate, setValidate] = useState(false);
    const [err, setErr] = useState({
        statusCode: '',
    })

    const rightInputs = [
        {
            label: 'العميل',
            type: 'searchSelection',
            placeholder: state.customer_name,
            width: '100%',
            value: state.customer,
            onSelect: (e) => {
                setState({...state, customer: parseInt(e)})
            },
            link: 'sales/allCustomersList',
            to: '/app/owner/customers/add',
            dataValidate: 'برجاء اختيار العميل',
            optional: false
        },
        {
            label: 'مسؤول المبيعات',
            type: 'searchSelection',
            placeholder: state.sales_officer_name,
            width: '100%',
            value: state.sales_officer,
            onSelect: (e) => {
                setState({...state, sales_officer: parseInt(e)})
            },
            link: 'users/Employees',
            dataValidate: 'برجاء اختيار مسئول المبيعات',
            optional: false
        },
    ]

    const leftInputs = [
        {
            label: 'رقم الفاتورة',
            type: 'text',
            value: state.id,
            change: (e) => {
                setState({...state, id: e})
            },
            width: '100%',
            dataValidate: 'برجاء تحديد رقم الفاتورة',
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
    ]

    const selectWarehouse = (e) => setState({...state, warehouse: parseInt(e)})
    useEffect(() => {

        axiosInstance.get(`sales/update/${invoiceId}`).then((res) => {
            let products = []
            res.data.SaleInvoice_products.forEach((product) => products.push({
                item: product.product_name,
                id: product.id,
                price: product.unit_price,
                amount: product.quantity,
                product: product.product,
                tax1: product.tax1,
                tax2: product.tax2,
                tax_name1: product.tax1_name,
                tax_name2: product.tax2_name,

            }))
            setTerms(products)
            setState( {
                customer: res.data.customer,
                customer_name: res.data.customer_name,
                date: res.data.date,
                warehouse: res.data.warehouse,
                warehouse_name: res.data.warehouse_name,
                payment_terms: res.data.payment_terms,
                notes: res.data.notes,
                sales_officer: res.data.sales_officer,
                sales_officer_name: res.data.sales_officer_name,
                payment_no: res.data.payment_no
            })
            res.data.attachment && setAttachmentName(res.data.attachment)
            setShipping( {
                shipping_fees: res.data.shipping_fees,
                shipping_details: res.data.shipping_details
            })
            setDiscount( {
                discount: res.data.discount,
                discount_type: res.data.discount_type
            })
            setTaxes()
        })
        
    }, [invoiceId, setTerms, setState, setShipping, setDiscount ]) 

    function termsAdjust(){
        let array = []
        terms.forEach((term) => array.push({ id: parseInt(term.id), quantity: parseInt(term.amount), unit_price: parseInt(term.price), count_after: parseInt(term.count_after), product: parseInt(term.product), tax1: parseInt(term.tax1), tax2: parseInt(term.tax2), }))
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
            const URL = `http://api.maha-beauty.com/sales/update/${parseInt(invoiceId)}`
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
            formData.append('total', (discount.discount !== 0 || shipping.shipping_fees !== 0) ? shipping.shipping_fees + getTotal() - (discount.discount_type === 'percentage' ? getTotal() - discount.discount : discount.discount) : getTotal())
            formData.append('sales_officer', parseInt(state.sales_officer))
            formData.append('SaleInvoice_products', JSON.stringify(termsAdjust()))
            attachment.attachment && formData.append('attachment', attachment.attachment)
            axios.put(URL, formData, config).then((res) => {
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
            const URL = `http://api.maha-beauty.com/sales/update/${invoiceId}`
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
            formData.append('total', (discount.discount !== 0 || shipping.shipping_fees !== 0) ? shipping.shipping_fees + getTotal() - (discount.discount_type === 'percentage' ? getTotal() - discount.discount : discount.discount) : getTotal())
            formData.append('sales_officer', parseInt(state.sales_officer))
            formData.append('SaleInvoice_products', JSON.stringify(termsAdjust()))
            attachment.attachment && formData.append('attachment', attachment.attachment)
            axios.put(URL, formData, config).then((res) => {
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
            sendData={sendData}
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
            attachmentName={attachmentName}
            state={state}
            handleAttachements={handleAttachements}
            setAttachements={setAttachment}
            attachements={attachment}
            selectWarehouse={selectWarehouse}
            >
                            <div className="flex__between" style={{ width: '100%' }}>
                    <Button style={{ marginBottom: 10 }} onClick={() => setTerms([...terms, {
                        item: '',
                        price: '',
                        amount: '',
                        tax1: undefined,
                        tax2: undefined,
                        id: 0
                    }])} variant="contained" color="secondary"><span> + إضافة بند</span></Button>
                    <div className="flex__column">
                    {
                        (discount && discount.discount !== 0 && discount.discount_type !== '') &&
                        <>
                        <div className="flex__between mt-5" style={{ background: 'rgb(235 235 235)', padding: 20 }}>
                            <span style={{ marginLeft: 10 }}>الخصم</span>
                            :
                            <span style={{ marginRight: 10 }}>
                                {discount.discount} {discount.discount_type === 'percentage' ? '%' : 'ر.س'}
                            </span>
                        </div>
                        </>
                    }
                    {
                        (shipping && shipping.shipping_fees !== 0) &&
                        <>
                        <div className="flex__between mt-5" style={{ background: 'rgb(235 235 235)', padding: 20 }}>
                            <span style={{ marginLeft: 10 }}>مصاريف التوصيل</span>
                            :
                            <span style={{ marginRight: 10 }}>
                                {shipping.shipping_fees} ر.س
                            </span>
                        </div>

                        </>
                    }
                        <div className="flex__between mt-5" style={{ background: 'rgb(235 235 235)', padding: 20 }}>
                            <span style={{ marginLeft: 10 }}>الاجمالي</span>
                            :
                            <span style={{ marginRight: 10 }}>
                                {getTotal() - ( discount && discount.discount ? (discount.discount_type === "Amount" ? discount.discount : getTotal() * (discount.discount / 100)) : 0) + (shipping ? shipping.shipping_fees : 0)} ر.س
                            </span>
                        </div>
                    
                    </div>
                    
                </div>
            </TermsDetails>

            <TextEditor
            state={state}
            setState={setState}
            />
            {/* <div className="flex__start">
                <Checkbox checked={state.paid} color="secondary" onChange={(e) => setState({...state, paid: e.target.checked ? 1 : 0})} />
                <h4>مدفوع بالفعل</h4>
            </div> */}
            <div className="labeled__button mt-10">
                <label className="label">رقم المعرف</label>
                <input readOnly type="number" className="inputText" value={state.payment_no} onChange={(e) => setState({...state, payment_no: parseInt(e.target.value)})} />
            </div>
            <select value={state.payment_method} onChange={(e) => setState({...state, payment_method: e.target.value ? e.target.value : 'cash'})} className="inputText mt-5">
                <option>وسيلة الدفع</option>
                <option value="cash">نقدي</option>
                <option value="cheque">شيك</option>
                <option value="bank transfer">تحويل بنكي</option>
                <option value="paytabs">بيتابس</option>
            </select>
        </motion.div>
    )
}

export default EditInvoice
