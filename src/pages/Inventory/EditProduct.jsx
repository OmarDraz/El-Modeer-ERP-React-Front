import { Checkbox } from '@mui/material'
import React, {useEffect, useState} from 'react'
import axiosInstance from '../../axios'
import InputsGroup from '../../components/Reusable Components/InputsGroup'
import SelectionSearch from '../../components/Reusable Components/SelectionSearch'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router';
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo'
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';

const EditProduct = () => {
    const [state, setState] = useState({
        name: '',
        notes: '',
        description: '',
        purchasing_price: '',
        selling_price: '',
        supplier: 0,
        brand: '',
        mini_selling_price: 1,
        mini_count: 1,
        deactivate: 0
    })
    const [Product_count, setProduct_count] = useState({
        count: '',
        warehouse: ''
    })
    const [rightInputs, setRightInputs] = useState([])
    const [leftInputs, setLeftInputs] = useState([])
    const [tags, setTags] = useState([])
    const [validate, setValidate] = useState(false);
    const [editable, setEditable] = useState(false);
    const [err, setErr] = useState({
        statusCode: '',
    })

    const history = useHistory()

    const { productId } = useParams();

    const btns = [
        {
            text: 'الغاء',
            color: '',
            icon: <CloseIcon />,
            onClick: () => history.push('/app/owner/inventory/products/')
        },
        {
            text: 'حفظ',
            color: 'success',
            icon: <SaveIcon />,
            onClick: sendData
        }
    ]

        useEffect(() => {
            if(!editable){
            axiosInstance.get(`store/UpdateProduct/${productId}`).then((res) => {
                setState({
                    name: res.data.name,
                    description: res.data.description,
                    notes: res.data.notes,
                    purchasing_price: res.data.purchasing_price,
                    selling_price: res.data.selling_price,
                    supplier: res.data.supplier,
                    mini_count: res.data.mini_count,
                    mini_selling_price: res.data.mini_selling_price,
                    brand: res.data.brand,
                    deactivate: res.data.deactivate
                })
                setProduct_count({
                    count: res.data.Product_count[0].count,
                    warehouse: res.data.Product_count[0].warehouse
                })
                setTags(res.data.Category)
                setEditable(true)
            })
        }
            setRightInputs([
                {
                    label: 'الاسم',
                    type: 'text',
                    placeholder: 'ادخل الاسم',
                    width: '50%',
                    value: state.name,
                    change: (e) => {
                        setState({...state, name: e})
                    },
                    dataValidate: 'برجاء ادخال اسم المنتج',
                    optional: false
                },
                // {
                //     label: 'SKU',
                //     type: 'text',
                //     placeholder: 'ادخل الكمية',
                //     width: '50%',
                //     value: Product_count.count,
                //     change: (e) => {
                //         setProduct_count({...Product_count, count: e})
                //     },
                //     dataValidate: 'برجاء ادخال اسم المنتج',
                //     optional: false
                // },

                {
                    label: 'الوصف (اختياري)',
                    type: 'textarea',
                    value: state.notes,
                    change: (e) => {
                        setState({...state, description: e})
                    },
                    width: '100%',
                    optional: true,
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
                },
                {
                    label: 'المورد',
                    type: 'searchSelection',
                    placeholder: 'اختر المورد',
                    width: '100%',
                    value: state.supplier,
                    onSelect: (e) => {
                        setState({...state, supplier: e})
                    },
                    link: 'purchases/allSupplierList',
                    to: '/app/owner/purchases/suppliers/add',
                    dataValidate: 'برجاء اختيار المورد',
                    optional: false
                },
                {
                    label: 'تصنيف',
                    type: 'tags',
                    placeholder: 'اكتب القيمة وانقر على ادخال',
                    optional: true,
                    width: '100%'
                }
            ])
        
            setLeftInputs([
                {
                    label: 'سعر الشراء',
                    type: 'text',
                    value: state.purchasing_price,
                    change: (e) => {
                        setState({...state, purchasing_price: parseInt(e)})
                    },
                    width: '50%',
                    dataValidate: 'برجاء تحديد سعر الشراء',
                    optional: false
                },
                {
                    label: 'سعر البيع',
                    type: 'text',
                    value: state.selling_price,
                    change: (e) => {
                        setState({...state, selling_price: parseInt(e)})
                    },
                    width: '50%',
                    dataValidate: 'برجاء تحديد سعر البيع ',
                    optional: false
                },
                {
                    label: 'اقل سعر بيع',
                    type: 'text',
                    value: state.mini_selling_price,
                    change: (e) => {
                        setState({...state, mini_selling_price: parseInt(e)})
                    },
                    width: '50%',
                    dataValidate: 'برجاء ادخال اقل سعر للبيع',
                    optional: false
                },
                {
                    label: 'اقل كمية للبيع',
                    type: 'text',
                    value: state.mini_count,
                    change: (e) => {
                        setState({...state, mini_count: parseInt(e)})
                    },
                    width: '50%',
                    dataValidate: 'برجاء ادخال اقل كمية للبيع',
                    optional: false
                },
            ])
        
        }, [state, Product_count, productId, editable]) 
        const selectWarehouse = (e) => {
            setProduct_count({...Product_count, warehouse: e})
        }

        function sendData(){
            if(
                leftInputs.filter((e) => e.optional === false && !e.value).length > 0 ||
                rightInputs.filter((e) => e.optional === false && !e.value).length > 0 ||
                Product_count.count === '' ||
                Product_count.warehouse === ''
            )
            {
                setValidate(true)
                alert('برجاء ادخال بيانات صحيحة')
            }
            else {
                axiosInstance.put(`store/UpdateProduct/${productId}`, {
                    Category: [],
                    Product_count: [Product_count],
                    ...state
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
                    <span>تم حفظ التعديلات بنجاح</span> 
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
            tags={tags}
            setTags={setTags}
            state={state}
            />
            <div>
                <h4 className="panel-heading">إدارة المخزون</h4>
                <div className='panel'>
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-4 col-sm-12 flex__column mb-10">
                                    <SelectionSearch label="المستودع" placeholder="اختر المستودع" link="sales/allWarehousesList" type="outlined" onSelect={selectWarehouse} />
                                    {(validate === true && Product_count.warehouse === '') ? <label className="errorLabel mt-10">برجاء تحديد المستودع*</label> : ''}
                                </div>
                                <div className="col-4 col-sm-12 flex__column">
                                    <label className="label">الكمية المدخلة</label>
                                    <input value={Product_count.count} type="number" className="inputText" onChange={(e) => setProduct_count({...Product_count, count: parseInt(e.target.value)})} />
                                    {(validate === true && Product_count.count === '') ? <label className="errorLabel mt-10">برجاء تحديد الكمية المدخلة*</label> : ''}
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-12 flex__start">
                            <Checkbox checked={state.deactivate} color="secondary" onChange={(e) => setState({...state, deactivate: e.target.checked ? 1 : 0})} />
                            <h4>علم هنا اذا كنت تريد تعطيله</h4>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default EditProduct
