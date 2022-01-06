import React, {useState, useEffect} from 'react'
import moment from 'moment';
import PageHeaderTwo from '../../components/Reusable Components/PageHeaderTwo';
import InputsGroup from '../../components/Reusable Components/InputsGroup';
import TextEditor from '../../components/Reusable Components/TextEditor';
import TermsDetails from '../../components/Reusable Components/TermsDetails';


const AddEstimate = () => {
    const date = new Date();
    const today = moment(date).format('yyyy-MM-DD')

    const [state, setState] = useState({
        client: '',
        id: '0001',
        date: today
    })

    const [rightInputs, setRightInputs] = useState([])
    const [leftInputs, setLeftInputs] = useState([])
    const [validate, setValidate] = useState(false);

    useEffect(() => {
        setRightInputs([
            {
                label: 'العميل',
                type: 'searchSelection',
                placeholder: 'اختر عميل',
                width: '100%',
                value: state.client,
                click: () => {
                    setState({...state, client: "j"})
                },
                dataValidate: 'برجاء اختيار العميل',
                optional: false
            },
        ])
    
        setLeftInputs([
            {
                label: 'رقم عرض الاسعار',
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
                label: 'تاريخ عرض الاسعار',
                type: 'date',
                change: (e) => {
                    setState({...state, date: e})
                },
                value: state.date,
                width: '100%',
                dataValidate: 'برجاء تحديد تاريخ الفاتورة',
                optional: false
            }
        ])
    
    }, [state]) 
    function sendData(){
        if(
            leftInputs.filter((e) => e.value === '' && e.optional === false).length > 0 ||
            rightInputs.filter((e) => e.value === '' && e.optional === false).length > 0
        )
        {
            setValidate(true)
            alert('برجاء ادخال بيانات صحيحة')
        }
        else {
            console.log("send data")
        }

    }

    return (
        <>
            <PageHeaderTwo 
            setValidate={setValidate}
            sendData={sendData}
            />
            <InputsGroup
            validate={validate} 
            rightInputs={rightInputs} 
            leftInputs={leftInputs}
            rightText="العميل"
            leftText="بيانات الفاتورة"
            state={state}
            />
            <TermsDetails/>
            <TextEditor/>
        </>
    )
}

export default AddEstimate
