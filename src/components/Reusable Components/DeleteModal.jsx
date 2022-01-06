import { Modal } from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from '../../axios';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Box } from '@mui/material';

const DeleteModal = ({toBeDeletedName, toBeDeletedLink, openModal, handleClose, setResults, results, id}) => {
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

        const [err, setErr] = useState({statusCode: ''})
        const [ loading, setLoading ] = useState(true)
    return (
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
                <h3>هل انت متأكد من أنكد تريد حذف {toBeDeletedName} ?</h3>
                <div className="flex__between mt-10">
                    <Button style={{ marginLeft: 5 }} variant="contained" color="success" onClick={handleClose}><span>لا</span></Button>
                    <Button variant="contained" color="warning" onClick={() => 
                    loading ?
                    axiosInstance.delete(toBeDeletedLink).then((res) =>      
                    {
                        setLoading(false)
                        handleClose()
                        setResults(results.filter((r) => (r.id ? r.id : r.customer_id) !== id))
                    }

                ).catch((error) => alert(`لا يمكنك حذف ${toBeDeletedName} لارتباطه بحقول اخرى`)) : handleClose()}><span>تعم</span></Button>
                </div>
            </div>
            </Box>
        </Modal>
    )
}

export default DeleteModal
