import React, {useState} from 'react'
import InputsGroup from '../../components/Reusable Components/InputsGroup'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo';
import { useHistory } from 'react-router';
import moment from 'moment';
import { motion } from 'framer-motion';


const AddStocktakings = () => {
    const date = new Date();
    const today = moment(date).format('yyyy-MM-DD')
    const [validate, setValidate] = useState(false);
    const [state, setState] = useState({
        id: '0001',
        date: today,
        inventory: '',
        notes: ''
    })

    const history = useHistory()

    const rightInputs = [
        {
            label: 'رقم الكود',
            type: 'text',
            value:state.id,
            width: '100%',
            change: (e) => {
                setState({...state, id: e})
            },
            optional: false,
            dataValidate: 'برجاء ادخال رقم الكود'
        },
        {
            label: 'تاريخ إضافة الجرد',
            type: 'date',
            change: (e) => {
                setState({...state, date: e})
            },
            value: state.date,
            width: '100%',
            dataValidate: 'برجاء تحديد تاريخ إضافة الجرد',
            optional: false
        },
        {
            label: 'المستودع',
            type: 'selection',
            width: '100%',
            value:state.inventory,
            change: (e) => {
                setState({...state, inventory: e})
            },
            optional: false,
            dataValidate: 'برجاء اختيار المستودع',
            options: [
                {
                    name: 'اختر مستودع'
                },
                {
                    name: 'مستودع 1',
                    code: 'primary1'
                },
                {
                    name: 'مستودع 2',
                    code: 'secondary2'
                }
            ]
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
    const btns = [
        {
            text: 'الغاء',
            color: '',
            icon: <CloseIcon />,
            onClick: () => history.push('/app/owner/inventory/stocktakings/')
        },
        {
            text: 'حفظ',
            color: 'success',
            icon: <SaveIcon />,
            onClick: sendData
        }
    ]

    function sendData(){
        if(
            leftInputs.filter((e) => e.optional === false && !e.value).length > 0 ||
            rightInputs.filter((e) => e.optional === false && !e.value).length > 0
        )
        {
            setValidate(true)
            console.log(leftInputs.filter((e) => e.optional === false))
            alert('برجاء ادخال بيانات صحيحة')
        }
        else {
            console.log("send data")
        }

    }
    return (
        <div>
            <PageHeaderTwo
            sendData={sendData}
            leftOnly
            btns={btns}/>
            <InputsGroup 
            validate={validate}
            leftInputs={leftInputs} 
            rightInputs={rightInputs}
            rightText="بيانات الجرد"
            leftText="بيانات إضافية" />
        </div>
    )
}

export default AddStocktakings
