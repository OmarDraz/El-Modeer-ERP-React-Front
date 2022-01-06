import React, { useState } from 'react'
import { Button, Tabs, Tab, IconButton } from '@mui/material'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import SelectionSearch from './SelectionSearch';


const Panel = (props) => (
    <div hidden={props.value !== props.index} style={{ marginTop: '10px', paddingBottom: '10px' }}>
        {props.value === props.index && <div>{props.children}</div>}
    </div>
)

const TermsDetails = ({children, create, terms, setTerms, headers, renderTerms, total, validate, optionsPanel, setAttachements, setDiscount, discount, warehouses, setState, attachmentName, setShipping, shipping, state, attachements, handleAttachements, selectWarehouse}) => {
    const screenSize = useSelector(state => state.mobileReducer)
    
    const [tabIndex, setTabIndex] = useState(0);

    const fileEntered = () => {
        if(attachmentName.split('.').pop() === 'jpg' || attachmentName.split('.').pop() === 'png' || attachmentName.split('.').pop() === 'jpeg'){
            return <img width="400px" className style={{ margin: 'auto' }} alt="attachment" src={`https://mo-erp.herokuapp.com${attachmentName}`} />
        } else {
            return <a href={`https://mo-erp.herokuapp.com${attachmentName}`} className="mt-10" download>{attachmentName}</a>
        }
    }

    const onTabClicked = (event, index) => {
        setTabIndex(index)
    }
    return (
        <>
                    {
                        (validate === true && terms.length === 0) ? <label className="errorLabel">يلزم وجود بند واحد على الأقل*</label> : ''
                    }
            <div className="mt-5" style={{ overflowX: 'scroll' }}>
                <table width="100%">
                    <thead className="panel-heading">
                        <tr>
                            {
                                headers.map(e => <td style={{ padding: 5 }}>{e}</td>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            terms.map((term, key) => 
                            <tr style={{ background: 'white' }}>
                            {renderTerms(key, validate, term.before, term.nowAmount)}
                        </tr>)
                        }
                    </tbody>
                </table>
                {
                    create ? 
                    <div className="flex__between" style={{ width: '100%' }}>
                    <Button style={{ marginBottom: 10 }} onClick={() => setTerms([...terms, {
                        item: '',
                        price: '',
                        amount: '',
                        tax1: undefined,
                        tax2: undefined,
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
                                {total() - ( discount && discount.discount && discount.discount_type ? (discount.discount_type === "Amount" ? discount.discount : total() * (discount.discount / 100)) : 0) + (shipping ? shipping.shipping_fees : 0)} ر.س
                            </span>
                        </div>
                    
                    </div>
                    
                </div> : children
                }
                
            </div>

            {
                optionsPanel && 
            <div className="panel">
                <Tabs textColor="secondary" indicatorColor="secondary" value={tabIndex} onChange={onTabClicked}>
                    <Tab label={<span>الخصم</span>}></Tab>
                    <Tab label={<span>بيانات التوصيل</span>}></Tab>
                    <Tab label={<span>إرفاق مستندات</span>}></Tab>
                </Tabs>
                <Panel value={tabIndex} index={0}>
                    <div className="flex__column">
                        <label style={{ marginBottom: 10, fontSize: 14, }}>الخصم</label>
                        <div>
                            <input value={discount.discount} type="number" onChange={(e) => setDiscount({...discount, discount: !parseInt(e.target.value) ? 0 : parseInt(e.target.value)})} style={{ width: 100, marginLeft: 10 }} className="inputText" />
                            <select value={discount.discount_type} onChange={(e) => setDiscount({...discount, discount_type: e.target.value})} style={{ padding: 10, borderRadius: 5 }}>
                                <option>القيمة</option>
                                <option value="percentage">مئوية %</option>
                                <option value="Amount">بالمبلغ</option>
                            </select>
                        </div>
                    </div>
                </Panel>
                <Panel value={tabIndex} index={1}>
                    <div style={{ display: 'flex', flexDirection: screenSize ? 'column' : 'row' }}>
                        <div className="labeled__button">
                            <label className="label">بيانات التوصيل</label>
                            <select value={shipping.shipping_details} onChange={(e) => setShipping({...shipping, shipping_details: e.target.value})} className="inputText">
                                <option value="auto">آلي</option>
                                <option value="don't show">لا تظهر</option>
                            </select>
                        </div>
                        <div className="labeled__button">
                            <label className="label">مصاريف التوصيل</label>
                            <input value={shipping.shipping_fees} onChange={(e) => setShipping({...shipping, shipping_fees: parseInt(e.target.value)})} className="inputText" type="text" placeholder="" />
                        </div>
                        {/* <div className="labeled__button">
                            <label className="label">المستودع</label>
                            <select value={state.warehouse} onChange={(e) => setState({...state, warehouse: parseInt(e.target.value)})} className="inputText">
                                {warehouses.length > 0 ? warehouses.map((w) => <option value={w.id}>{w.name}</option>) : <option>لا يوجد مستودعات</option>}
                            </select>
                            {warehouses.length === 0 && <span className="errorLabel">برجاء إضافة مستودع <Button variant="text" component={Link} to="">من هنا</Button></span>}
                        </div> */}
                        <div className="labeled__button">
                            <SelectionSearch label="المستودع" link="sales/allWarehousesList" type="outlined" onSelect={selectWarehouse} />
                            {state.warehouse === '' && <span className="errorLabel">برجاء إضافة مستودع <Button variant="text" component={Link} to="">من هنا</Button></span>}
                        </div>
                    </div>
                </Panel>
                <Panel value={tabIndex} index={2}>
                    <div className="flex__center">
                <Button
                    variant="contained"
                    component="label"
                    color="secondary"
                    style={{
                        marginTop: 10
                    }}
                    fullWidth
                    >
                    <span>
                    تحميل ملف
                    </span>
                    <input
                        hidden
                        type="file"
                        onChange={handleAttachements}
                    />
                </Button>
                {
                    attachements.attachment &&  
                    <div className="flex__between">
                        <span>{attachements.attachment.name}</span>
                        <IconButton onClick={() => setAttachements('')}>
                            <CancelIcon color="warning" />
                        </IconButton>
                    </div>
                }
                {
                    <>
                    <h4 className="light__text mt-10">المرفق الحالي : </h4>
                    {attachmentName && fileEntered()}
                    </>
                }
                </div>
                </Panel>
            </div>
            }
            
        </>
    )
}

export default TermsDetails
