import React from 'react'
import SellIcon from '@mui/icons-material/Sell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Icon } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
const RecordHistory = ({records}) => {

    const display = (records) => {

        return (
        records.map((res) => {
            if(res.type === 'create_sale'){
                return(
                    <div className="flex__column panel" style={{ height: '100px', lineHeight: '5px', letterSpacing: 1 }}>
                        <div className="flex__start">
                            <Icon fontSize='large' className="ml-5">
                            <AddCircleIcon color="secondary" fontSize='large'/>
                            </Icon>
                            <p>قام <span className="customer_invoice">{res.made_by}</span> بانشاء فاتورة رقم <span className="customer_invoice">{res.invoice_id}</span> للعميل <span className="customer_invoice">{res.customer_name} {res.customer_id}</span> قيمتها <span className="customer_invoice">{res.total}</span> وهي {res.paid ? <span style={{ color: 'green' }}>مدفوعة</span>:<span style={{ color: 'red' }}>غير مدفوعة</span>}</p>
                        </div>
                        <span className="flex__start light__text mt-5"><ScheduleIcon style={{ marginRight: 7,}} fontSize="small" /><p className="customer_invoice">{res.created_at}</p></span>
                    </div>
                )
            } else if(res.type === 'update_sale'){
                return(
                    <div className="flex__column panel" style={{ height: '100px', lineHeight: '5px', letterSpacing: 1 }}>
                        <div className="flex__start">
                        <Icon fontSize='large' className="ml-5">
                            <EditIcon color="secondary" fontSize='large'/>
                        </Icon>
                        <p>قام <span className="customer_invoice">{res.made_by}</span> بتعديل فاتورة رقم <span className="customer_invoice">{res.invoice_id}</span> للعميل <span className="customer_invoice">{res.customer_name} {res.customer_id}</span> قيمتها <span className="customer_invoice">{res.total}</span> وهي {res.paid ? <span style={{ color: 'green' }}>مدفوعة</span>:<span style={{ color: 'red' }}>غير مدفوعة</span>}</p>
                        </div>
                        <span className="flex__start light__text mt-5"><ScheduleIcon style={{ marginRight: 7,}} fontSize="small" /><p className="customer_invoice">{res.created_at}</p></span>
                    </div>
                ) 
            } else if(res.type === 'sold_product'){
                return(
                    <div className="flex__column panel" style={{ height: '100px', lineHeight: '5px', letterSpacing: 1 }}>
                        <div className="flex__start">
                        <Icon fontSize='large' className="ml-5">
                            <SellIcon color="secondary" fontSize='large'/>
                        </Icon>
                        <p>قام <span className="customer_invoice">{res.made_by}</span> ببيع منتج <span className="customer_invoice">{res.product_id} {res.product_name}</span> في الفاتورة <span className="customer_invoice">{res.invoice_id}</span> و قيمته <span className="customer_invoice">{res.unit_price}</span> بعدد <span className="customer_invoice">{res.items}</span> و اصبح المخزون الان <span className="customer_invoice">{res.store}</span></p>
                        </div>
                        <span className="flex__start light__text mt-5"><ScheduleIcon style={{ marginRight: 7,}} fontSize="small" /><p className="customer_invoice">{res.created_at}</p></span>
                    </div>
                ) 
            } else if(res.type === 'update_product_invoice'){
                return(
                    <div className="flex__column panel" style={{ height: '100px', lineHeight: '5px', letterSpacing: 1 }}>
                        <div className="flex__start">
                        <Icon fontSize='large' className="ml-5">
                            <EditIcon color="secondary" fontSize='large'/>
                        </Icon>
                        <p>قام <span className="customer_invoice">{res.made_by}</span> بتحديث منتج <span className="customer_invoice">{res.product_id} {res.product_name}</span> في الفاتورة <span className="customer_invoice">{res.invoice_id}</span> و قيمته <span className="customer_invoice">{res.unit_price}</span> بعدد <span className="customer_invoice">{res.items}</span> و اصبح المخزون الان <span className="customer_invoice">{res.store}</span></p>
                        </div>
                        <span className="flex__start light__text mt-5"><ScheduleIcon style={{ marginRight: 7,}} fontSize="small" /><p className="customer_invoice">{res.created_at}</p></span>
                    </div>
                ) 
            } else if(res.type === 'delete_product_invoice'){
                return(
                    <div className="flex__column panel" style={{ height: '100px', lineHeight: '5px', letterSpacing: 1 }}>
                        <div className="flex__start">
                        <Icon fontSize='large' className="ml-5">
                            <DeleteIcon color="secondary" fontSize='large'/>
                        </Icon>
                        <p>قام <span className="customer_invoice">{res.made_by}</span> بمسح منتج <span className="customer_invoice">{res.product_id} {res.product_name}</span> في الفاتورة <span className="customer_invoice">{res.invoice_id}</span> و قيمته <span className="customer_invoice">{res.unit_price}</span> بعدد <span className="customer_invoice">{res.items}</span> و اصبح المخزون الان <span className="customer_invoice">{res.store}</span></p>
                        </div>
                        <span className="flex__start light__text mt-5"><ScheduleIcon style={{ marginRight: 7,}} fontSize="small" /><p className="customer_invoice">{res.created_at}</p></span>
                    </div>
                )
            } else if(res.type === 'create_payment'){
                return(
                    <div className="flex__column panel" style={{ height: '100px', lineHeight: '5px', letterSpacing: 1 }}>
                        <div className="flex__start">
                        <Icon fontSize='large' className="ml-5">
                            <AddCircleIcon color="secondary" fontSize='large'/>
                        </Icon>
                        <p>قام <span className="customer_invoice">{res.made_by}</span> بإضافة عملية دفع<span className="customer_invoice">{res.payment_id}</span> في الفاتورة <span className="customer_invoice">{res.invoice_id}</span> و قيمته <span className="customer_invoice">{res.Amount}</span> بوسيلة دفع <span className="customer_invoice">{res.method}</span> و اصبح<span className="customer_invoice">{res.status}</span> و اصبحت حالة الفاتورة <span className="customer_invoice">{res.invoice_status}</span> وقيمتها {res.invoice_total}</p>
                        </div>
                        <span className="flex__start light__text mt-5"><ScheduleIcon style={{ marginRight: 7,}} fontSize="small" /><p className="customer_invoice">{res.created_at}</p></span>
                    </div>
                )
            } else if(res.type === 'update_payment'){
                return(
                    <div className="flex__column panel" style={{ height: '100px', lineHeight: '5px', letterSpacing: 1 }}>
                        <div className="flex__start">
                        <Icon fontSize='large' className="ml-5">
                            <EditIcon color="secondary" fontSize='large'/>
                        </Icon>
                        <p>قام <span className="customer_invoice">{res.made_by}</span> بتحديث عملية دفع<span className="customer_invoice">{res.payment_id}</span> في الفاتورة <span className="customer_invoice">{res.invoice_id}</span> و قيمته <span className="customer_invoice">{res.Amount}</span> بوسيلة دفع <span className="customer_invoice">{res.method}</span> و اصبح<span className="customer_invoice">{res.status}</span> و اصبحت حالة الفاتورة <span className="customer_invoice">{res.invoice_status}</span> وقيمتها {res.invoice_total}</p>
                        </div>
                        <span className="flex__start light__text mt-5"><ScheduleIcon style={{ marginRight: 7,}} fontSize="small" /><p className="customer_invoice">{res.created_at}</p></span>
                    </div>
                )
            }else if(res.type === 'update_payment'){
                return(
                    <div className="flex__column panel" style={{ height: '100px', lineHeight: '5px', letterSpacing: 1 }}>
                        <div className="flex__start">
                        <Icon fontSize='large' className="ml-5">
                            <DeleteIcon color="secondary" fontSize='large'/>
                        </Icon>
                        <p>قام <span className="customer_invoice">{res.made_by}</span> بمسح عملية دفع<span className="customer_invoice">{res.payment_id}</span> في الفاتورة <span className="customer_invoice">{res.invoice_id}</span> و قيمته <span className="customer_invoice">{res.Amount}</span> بوسيلة دفع <span className="customer_invoice">{res.method}</span> و اصبح<span className="customer_invoice">{res.status}</span> و اصبحت حالة الفاتورة <span className="customer_invoice">{res.invoice_status}</span> وقيمتها {res.invoice_total}</p>
                        </div>
                        <span className="flex__start light__text mt-5"><ScheduleIcon style={{ marginRight: 7,}} fontSize="small" /><p className="customer_invoice">{res.created_at}</p></span>
                    </div>
                )
            }
        })
        )
    }

    return (
        <div className="w-100 flex__column">
            {display(records)}
        </div>
    )
}

export default RecordHistory
