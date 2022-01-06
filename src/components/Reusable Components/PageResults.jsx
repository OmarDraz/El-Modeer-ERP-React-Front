import React, { useState } from 'react'
import { Checkbox, IconButton, Divider, Button } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessibleIcon from '@mui/icons-material/Accessible';
import PaymentIcon from '@mui/icons-material/Payment';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import TimerIcon from '@mui/icons-material/Timer';
import InventoryIcon from '@mui/icons-material/Inventory';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../axios';
import DeleteModal from './DeleteModal';

const Checkbx = (props) => {
    return (
            <Checkbox type="checkbox" onClick={props.handleCheckChieldElement} color="secondary" id={props.id} checked={props.isChecked} />
        )
}

export const ListItem = (props) => {
    const [openRowMenu, setRowMenuOpened] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const handleRowDropdown = () => {
        setRowMenuOpened(!openRowMenu)
    }
    
    const history = useHistory()
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
    return (
        <li className="list-group">
            <table width="100%">
                <tbody>
                    <tr className="flex__between">
                        {props.checkAllowed && <td style={{ padding: 0 }} width="11%"><Checkbx handleCheckChieldElement={props.handleCheckChieldElement} id={props.id} isChecked={props.isChecked} /></td>}
                        <Link className="w-100 flex__between hover"  style={{ textDecoration: 'none', pointerEvents: props.linkable ? 'fill' : 'none', color: 'black' }} to={`/app/owner/sales/invoices/view/${props.id}`}>
                        
                        {props.appointmentName ? 
                        <td width="45%" className="list-item">
                            {props.date && <span className="flex__start"><CalendarTodayIcon style={{ marginLeft: 5 }} fontSize="small" /><p className="customer_invoice">{props.day}</p> &nbsp; {props.date}</span>}
                            {props.appointmentName && (
                            <span className="flex__start light__text">
                                <TimerIcon fontSize="small" />
                                &nbsp; {props.duration} &nbsp;
                                <span>دقيقة</span>
                            </span>
                            )}
                        </td> : <td width="45%" className="list-item">
                        <span className="light__text"> {props.id && `#${props.id}`} {props.date && `- ${props.date}`} </span>
                        
                        <span className="customer_invoice"> {props.customer && `${props.customer} #${props.customer_id}`} {!props.requistionType && props.inventory && `${props.inventory}`} {props.listName && props.listName} </span>
                        {(props.supplierName && props.supplier_id) && <span className="customer_invoice">{props.supplierName} #{props.supplier_id}</span> }
                        {props.expense && <span className="customer_invoice">{props.expense}</span>}
                        {props.employeeName && <span className="flex__start light__text"><AccessibleIcon /> بواسطة : {props.employeeName}</span>}
                        {props.requistionType && <span className="flex__start light__text"><MoveToInboxIcon/> {props.requistionType} {props.inventory}</span>}
                        {props.productCount && <span className="flex__start light__text">عدد المنتجات {props.productCount}</span>}
                        {props.employeeName && props.purchaseType ? 
                        <div className="flex__start light__text">
                            <div className="flex__start">
                                <AccessibleIcon fontSize="small"/>
                                <span style={{ marginLeft: 10 }}>{props.employeeName}</span>
                            </div>
                            <div className="flex__start">
                                <PaymentIcon fontSize="small"/> 
                                <span>{props.purchaseType}</span>
                            </div>
                        </div> : ''}
                        {props.customer_phone && 
                        (<span className="flex__start light__text">
                            <PhoneInTalkIcon fontSize="small" />
                            {props.customer_phone}
                        </span>)}
                        {props.customer_email && 
                        (<span className="flex__start light__text">
                            <EmailIcon fontSize="small" />
                            {props.customer_email}
                        </span>)}
                        {props.customer_address && 
                        (<span className="flex__start light__text">
                            <RoomIcon fontSize="small" />
                            {props.customer_address}
                        </span>)}
                        {props.address && 
                        (<span className="flex__start light__text">
                            <RoomIcon fontSize="small" />
                            {props.address}
                        </span>)}
                        
                        </td>}
                        </Link>
                        


                        { props.secondCol && props.secondCol(props.last_action, props.last_action_date, props.appointmentName, props.customer, props.customer_phone, props.customer_email, props.customer_id, props.purchasing_price, props.selling_price )}
                                    
                                    
                        <td width={`${props.isTriple === false ? '60%' : '100%' }`} className="bill-details flex__between">
                            <div className="grid-item flex__center">
                                <span style={{ fontWeight: 'bold', margin: 5 }}> {props.price && `${props.price} ر.س`}</span>
                                {props.statusOne || props.statusTwo ? <><span className="status" style={{ background: statusGreen.includes(props.statusOne) ? 'green' : 'red' }}>{props.statusOne}</span>
                                {props.statusTwo && (<span className="status" style={{ background: statusGreen.includes(props.statusTwo)  ? 'green' : 'red' }}>{props.statusTwo}</span>)}</> : ''}
                                {props.available && <span className="flex__start light__text" style={{ marginTop: 5 }}><InventoryIcon fontSize="small" />&nbsp;{props.available}&nbsp;متاح</span>}
                                {props.appointmentName && <span>
                                <Button onClick={() => {
                                    axiosInstance.put(`appointments/UpdateStatus/${parseInt(props.id)}`, {status: 'dismissed'}).then((res) => {
                                        let array = [...props.results]
                                        array[props.ky] = {...array[props.ky], statusOne: 'تم صرف النظر'}
                                        props.setResults(array)
                                    })
                                }} color="warning" variant="text"><CloseIcon fontSize="small" /><span>صرف النظر</span>
                                </Button>&nbsp; | &nbsp;
                                <Button color="success" onClick={() => {
                                    axiosInstance.put(`appointments/UpdateStatus/${parseInt(props.id)}`, {status: 'done'}).then((res) => {
                                        let array = [...props.results]
                                        array[props.ky] = {...array[props.ky], statusOne: 'حجز'}
                                        props.setResults(array)

                                    })
                                }} variant="text"><CheckIcon fontSize="small" /><span>تم</span></Button></span>}
                            
                            </div>
                            <div>
                            <IconButton onClick={handleRowDropdown}>
                                <MoreHorizIcon />
                            </IconButton>
                            <ul className="dropdown-menu" style={{ display: openRowMenu ? 'block' : 'none', left: 10 }}>
                                <li>
                                    <button onClick={() => {
                                        handleOpen()
                                    }}>حذف</button>
                                </li>
                                <li>
                                    <button onClick={() => {
                                        history.push(props.editLink)
                                    }}>تعديل</button>
                                </li>
                            </ul>

                            <DeleteModal setResults={props.setResults} id={props.id ? props.id : props.customer_id} results={props.results} openModal={openModal} setOpenModal={setOpenModal} toBeDeletedName={props.customer ? props.customer : props.deleteName} toBeDeletedLink={props.deleteLink ? props.deleteLink : props.deleteOneLink} handleClose={handleClose} handleOpen={handleOpen} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Divider style={{ margin: '10px auto' }} />
        </li>
    )
}

const PageResults = ({results, secondCol, enableSecondCol, handleCheckChieldElement, checkAllowed, setResults, deleteOneLink, linkable}) => {
    
    return (
        <section>
            <h4 className="panel-heading">النتائج</h4>
            <div className="panel">
                {
                    results.length !== 0 ?                 
                    <ul>
                        {results.map((result, key) => (
                            <ListItem {...result} ky={key} setResults={setResults} deleteOneLink={`${deleteOneLink}${parseInt(result.customer_id)}`} results={results} secondCol={secondCol} isTriple={enableSecondCol} checkAllowed={checkAllowed} handleCheckChieldElement={handleCheckChieldElement}  />
                        ))}
                    </ul> : 
                    <div className="flex__center">
                        عفوا لا يوجد نتائج
                    </div>
                }

            </div>
        </section>
    )
}

export default PageResults
