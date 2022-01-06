import React, {useState} from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axiosInstance from '../../axios';
import { Button, Divider } from '@mui/material'
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const SelectionSearch = ({link, placeholder, onSelect, label, type, onSelectTax, create, modalHead, position, cat}) => {
    const [results, setResults] = useState([])
    const [obj, setObj] = useState({})
    const [showMenu, setShowMenu] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true)
    const [selectedResult, setSelected] = useState('')
    const [err, setErr] = useState({
        statusCode: '',
    })

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const sendObj = () => {
        axiosInstance.post(link, obj).then((res) => {
            handleClose()
        })
    }

    const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 24,
    p: 4,
    };

    return (
        <>
        <span className="label" style={{ marginLeft: 10 }}>{label}</span>
        <Button style={{ color: 'black', position: position ? position : '', left: 0 }} className={`${type === 'outlined' ? 'select__button' : ''}`} variant={type} onClick={() => {
            if(results.length === 0){
            axiosInstance.get(link).then((res) => {
                setLoading(false)
                setResults(res.data)
            })} else if(create && results.length > 0){
                axiosInstance.get(link).then((res) => {
                    setLoading(false)
                    setResults(res.data)
                })
            }
            setShowMenu(!showMenu)
        }}>
            {
                !cat && <span>{selectedResult !== '' ? selectedResult : placeholder}</span>
            }
            
            <ArrowDropDownIcon />
        </Button>
        <ul className="dropdown-menu" style={{ display: showMenu ? 'block' : 'none' , width: 250 }}>
            {
                loading ?     
                <Box className="flex__center p-40">
                    <CircularProgress size={30} color="secondary" />
                </Box> : 
                <>
                {/* onClick(res.name, res.count, res.selling_price */}
                {
                    results.length > 0 ? 
                    <>
                    <input placeholder="بحث ..." className="inputText w-100" type="text" />
                    {results.map((res) => (
                        <li>
                            <button style={{ flexDirection: 'column', display: 'flex' }} onClick={() => {
                                if(onSelect){
                                    onSelect(res.id, res.name, res.count, res.selling_price, res.purchasing_price)
                                } else if (onSelectTax){
                                    onSelectTax(res.id, res.tax_name, res.tax_value, res.product_included)
                                }
                                setSelected(res.tax_name ? res.tax_name : res.name)
                                setShowMenu(false)
                                }}>
                                <span className="mb-5">{res.tax_name ? res.tax_name : res.name} {res.id && (`#${res.id}`)}</span>
                                {res.count && <span className="light__text mb-5">الكمية : {res.count}</span>}
                                {res.selling_price && <span className="light__text">سعر البيع : {res.selling_price} ر.س</span>}
                                {res.purchasing_price && <span className="light__text">سعر الشراء : {res.purchasing_price} ر.س</span>}
                            </button>
                        </li>
                    ))}
                    
                    </>
                    :
                    <span className="flex__center p-40">عفوا لا يوجد نتائج</span>
                }
                {
                        create && 
                        (
                            <>
                        <Button color="secondary" onClick={() => {
                            handleOpen()
                            setShowMenu(false)
                        }} variant="contained" fullWidth><span>جديد</span></Button>
                        <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className="flex__center">
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
                                    <h4>{modalHead}</h4>
                                    <div className="flex__start mt-10">
                                        <table style={{ width: 400 }}>
                                            <thead style={{ background: "#eee" }}>
                                                <tr>
                                                    <th align="start" className="p-10" width="70%">الاسم</th>
                                                    <th width="30%" className="p-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                        <tr style={{borderBottom: '1px solid #000'}} className="p-10">
                                                            <td style={{ padding: '15px 0' }} ><input placeholder="الاسم" type="text" className="inputText w-100" onChange={(e) => {
                                                                setObj({name: e.target.value})
                                                            }} /></td>
                                                            <td align="center"><Button onClick={() => setObj()} style={{ background: '#eee', color: 'black' }}><DeleteIcon /> <span>مسح</span></Button></td>
                                                            <Divider className="w-100" />
                                                        </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    { console.log(obj) }
                                    <div className="w-100" style={{ background: '#eee' }}>
                                        <Button color="secondary" onClick={sendObj}><span>حفظ</span></Button>
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                        </>
                        )
                    }

                </>
            }
            
        </ul>
        </>
    )
}

export default SelectionSearch
