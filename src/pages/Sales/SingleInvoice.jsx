import React, { useState, useEffect, useRef } from 'react'
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useHistory } from 'react-router';
import { Tabs, Tab } from '@mui/material'
import { useReactToPrint } from 'react-to-print';
import { motion } from 'framer-motion';
import axiosInstance from '../../axios';
import PrintIcon from '@mui/icons-material/Print';
import PaymentIcon from '@mui/icons-material/Payment';
import { useParams } from 'react-router-dom';
import RecordHistory from '../../components/Reusable Components/RecordHistory';
import { ListItem } from '../../components/Reusable Components/PageResults';

const Panel = (props) => (
    <div hidden={props.value !== props.index} style={{ marginTop: '10px', padding: '10px', border: '1px solid rgb(195, 195, 195)' }}>
        {props.value === props.index && <div>{props.children}</div>}
    </div>
)

const PrintedInvoice = React.forwardRef((props, ref) => {
    return(
        <motion.div className="invoice__container" >
            <html>
            <body ref={ref} className="invoice__body" dir="rtl">
                <div className="w-100">
                <h3 className="text__center">فاتورة</h3>
                <p className="text__center mt-20">
                    {props.address}
                </p>
                <div className="flex__column mt-20">
                    <span className=" mb-10">
                        <span className="customer_invoice">العميل : </span>
                        <span>#{props.customer} {props.customer_name}</span>
                    </span>
                    <span className=" mb-10">
                        <span className="customer_invoice">رقم الفاتورة : </span>
                        <span>{props.id}</span>
                    </span>
                    <span className=" mb-10">
                        <span className="customer_invoice">تاريخ الفاتورة : </span>
                        <span>{props.date}</span>
                    </span>
                    <table className="w-100 mb-10 mt-20">
                        <tbody>
                            <thead>
                                <tr>
                                    <th style={{ padding: 5 }} width="" bgcolor="#e5e5e5"   className="col-4" id="label_field1">البند</th>
                                    <th style={{ padding: 5 }} width="80" bgcolor="#e5e5e5" className="col-7" id="label_unit_price">سعر</th>        
                                    <th style={{ padding: 5 }} width="80" bgcolor="#e5e5e5" className="col-6" id="label_quantity">الكمية</th>
                                    <th style={{ padding: 5 }} width="80" bgcolor="#e5e5e5" className="col-9" id="label_subtotal">الإجمالي</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.terms.map((res) =>                                 
                                <tr bgcolor="#f8f8f8">
                                    <td style={{ padding: 5 }} class="col-1">{res.item}</td>
                                    <td style={{ padding: 5 }} class="col-7">{res.price}</td>
                                    <td style={{ padding: 5 }} class="col-6">{res.amount}</td>
                                    <td style={{ padding: 5 }} class="col-9">{res.price}</td>
                                </tr>)}

                            </tbody>
                        </tbody>
                    </table>
                    <table className="w-100 mb-10">
                        <tbody >
                            <thead className=" mb-10" bgcolor="#e5e5e5">
                                <tr>
                                    <td style={{ padding: 5 }} width="75%" align="start">مدفوع</td>
                                    <td style={{ padding: 5 }} width="80">{props.amount_of_paid} ر.س</td>
                                </tr>
                            </thead>
                            <thead className=" mb-10" bgcolor="#e5e5e5">
                                <tr>
                                    <td style={{ padding: 5 }} width="75%" align="start">المبلغ المستحق</td>
                                    <td style={{ padding: 5 }} width="80">{props.total - props.amount_of_paid} ر.س</td>
                                </tr>
                            </thead>
                            {props.discount !==0 && (
                                <thead className=" mb-10" bgcolor="#e5e5e5" >
                                    <tr>
                                        <td style={{ padding: 5 }} width="75%" align="start">الخصم</td>
                                        <td style={{ padding: 5 }} width="80">{props.discount} {props.discount_type === 'percentage' ? '%' : 'ر.س'}</td>
                                    </tr>
                                </thead>
                            )}
                            {props.shipping_fees !==0 && (
                                <thead className=" mb-10" bgcolor="#e5e5e5">
                                    <tr>
                                        <td style={{ padding: 5 }} width="75%" align="start">التوصيل</td>
                                        <td style={{ padding: 5 }} width="80">{props.shipping_fees} ر.س</td>
                                    </tr>
                                </thead>
                            )}
                            {props.terms.map((term) => (
                                term.tax1 || term.tax2 ?
                                <>
                                <thead className=" mb-10" bgcolor="#cccbcb" style={{ fontWeight: 'bold'}}>
                                    <tr>
                                        <td style={{ padding: 5 }} width="75%" align="start">{term.tax_name1}</td>
                                        <td style={{ padding: 5 }} width="80">{props.tax1}</td>
                                    </tr>
                                </thead>
                                <thead className=" mb-10" bgcolor="#cccbcb" style={{ fontWeight: 'bold'}}>
                                <tr>
                                    <td style={{ padding: 5 }} width="75%" align="start">{term.tax_name2}</td>
                                    <td style={{ padding: 5 }} width="80">{props.tax2}</td>
                                </tr>
                                </thead>
                                </>  : ''
                            ))}
                            <thead className=" mb-10" bgcolor="#cccbcb" style={{ fontWeight: 'bold'}}>
                                <tr>
                                    <td style={{ padding: 5 }} width="75%" align="start">الاجمالي</td>
                                    <td style={{ padding: 5 }} width="80">{props.total} ر.س</td>
                                </tr>
                            </thead>                     
                            <hr/>
                        </tbody>
                    </table>
                    <p>
                        {props.notes}
                    </p>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>

            </div>
            </body>
            </html>

        </motion.div>

    )
})

const SingleInvoice = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const componentRef = useRef()

    
    const [state, setState] = useState({

    })

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

    const {invoiceId} = useParams();

    const handlePrint = useReactToPrint({
        content : () => componentRef.current,
        copyStyles: true
    })

    const onTabClicked = (event, index) => {
        setTabIndex(index)
    }

    const getMethod = (status) => {
        if(status === 'cheque'){
            return 'شيك'
        } else if (status === 'cash'){
            return 'كاش'
        } else if (status === 'bank transfer'){
            return 'تحويل بنكي'
        } else if (status === 'paytabs'){
            return 'بيتابس'
        }
    }

    const getStatus = (status) => {
        if(status === 'incomplete'){
            return 'غير مكتمل'
        } else if (status === 'complete'){
            return 'مكتمل'
        } else if(status === 'pending'){
            return 'معلق'
        } else if(status === 'failed'){
            return 'فشل'
        }
    }

    const [recordHistory, setRecordHistory] = useState()
    const [invoiceStore, setInvoiceStore] = useState([])
    const [invoicePayments, setInvoicePayments] = useState([])
    useEffect(() => {
            axiosInstance.get('sales/RecordHistory/' + parseInt(invoiceId)).then((res) => setRecordHistory(res.data))
            axiosInstance.get('sales/InvoicePayments/' + parseInt(invoiceId)).then((res) => {
                let array = []
                res.data.SalePayments.forEach((p) => array.push({
                    price: p.Amount,
                    date: p.Date,
                    id: p.id,
                    purchaseType: getMethod(p.method),
                    employeeName: p.employee_name,
                    statusOne: getStatus(p.status),
                    deleteLink: `sales/PaymentDetails/${p.id}`,
                    deleteName: `${`هذا المدفوع`}`,
                    editLink: `/app/owner/sales/invoices/edit-payment/${p.id}/invoice/${invoiceId}`
                }))
                setInvoicePayments(array)
            })
            axiosInstance.get('sales/InvoiceStore/Invoice=' + parseInt(invoiceId)).then((res) => {
                setInvoiceStore(res.data)
            })
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
                    payment_no: res.data.payment_no,
                    id: res.data.id,
                    total: res.data.total,
                    amount_of_paid: res.data.amount_of_paid,
                    statusOne: res.data.paid ? 'مدفوعة' : 'غير مدفوعة',
                    shipping_fees: res.data.shipping_fees,
                    shipping_details: res.data.shipping_details,
                    discount: res.data.discount,
                    discount_type: res.data.discount_type,
                    address: res.data.address
                })
            })
            

    }, [invoiceId])
    const history = useHistory();
    
    const btns = [
        {
            text: 'إضافة عملية دفع',
            color: 'success',
            icon: <PaymentIcon />,
            hidden: state.paid ? true : false,
            onClick: () => history.push(`/app/owner/sales/invoices/add-payment/${state.id}`)
        },
        {
            text: 'طباعة الفاتورة',
            color: 'primary',
            icon: <PrintIcon />,
            onClick: handlePrint
        },
        {
            text: 'رجوع',
            color: '',
            icon: <ArrowBackIosNewIcon fontSize="small" />,
            onClick: () => history.push('/app/owner/sales/invoices-management/')
        },
    ]

    const statusGreen = [
        'مدفوعة',
        'حولت لفاتورة',
        'حجز',
        'في المخزون',
        'تمت الموافقة',
        'تمت التسوية',
        'نشط',
        'مستلم'
    ]

    const rightText = () => {
        return (
            <div className="flex__column" style={{ width: 200 }}>
                <span className="flex__between">
                    <span className="customer_invoice">
                        الفاتورة : #{state.id}
                    </span>
                    <span className="status" style={{ background: statusGreen.includes(state.statusOne) ? 'green' : 'red', width: 80 }}>
                        {state.statusOne}
                    </span>
                </span>
                <span className="light__text mt-5">عميل : #{state.customer_name}</span>
            </div>
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} exit={{ opacity: 0 }}>
            <PageHeaderTwo 
            preview = {false}
            rightText={rightText}
            btns={btns}
            />
            <div className="panel">
                <Tabs textColor="secondary" indicatorColor="secondary" value={tabIndex} onChange={onTabClicked}>
                    <Tab label={<span>الفاتورة</span>}></Tab>
                    <Tab label={<span>سجل النشاطات</span>}></Tab>
                    <Tab label={<span>المخزون</span>}></Tab>
                    <Tab label={<span>المدفوعات</span>}></Tab>
                </Tabs>
                <Panel value={tabIndex} index={0}>
                    <PrintedInvoice ref={componentRef} {...state} terms={terms}/>
                </Panel>
                <Panel value={tabIndex} index={1}>
                    <RecordHistory records={recordHistory} />
                </Panel>
                <Panel value={tabIndex} index={2}>
                    <div className="panel w-100">
                    <table>
                        <thead className="w-100 panel-heading">
                            <tr className='w-100'>
                                <td align="start" style={{ padding: 5 }} width="50%" >اسم المنتج</td>
                                <td align="start" style={{ padding: 5 }} width="50%">الكمية</td>
                                <td align="end" style={{ padding: 5 }} width="80">رصيد المخزون</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoiceStore.map((res) =>                             
                                <tr className='w-100' bgcolor="#eee">
                                    <td style={{ padding: 5 }}>{res.name}</td>
                                    <td style={{ padding: 5 }}>{res.quantity}</td>
                                    <td style={{ padding: 5 }}>{res.count_after}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                    </div>
                </Panel>
                <Panel value={tabIndex} index={3}>
                    <ul>
                        {
                            invoicePayments.map((res) => <ListItem {...res} results={invoicePayments} setResults={setInvoicePayments} checkAllowed={false} />)
                        }
                    </ul>
                </Panel>
            </div>
        </motion.div>
    )
}

export default SingleInvoice
