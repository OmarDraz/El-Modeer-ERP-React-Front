import React, { useState } from 'react'
import PageHeader from './PageHeader'
import PageResults from './PageResults'
import { useSelector } from 'react-redux';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import axiosInstance from '../../axios';

const DataTables = ({results, enableSecondCol, setResults, headerBtns, searchInputs, deleteAllLink, deleteOneLink, linkable }) => {
    const [checked, setIsChecked] = useState(false);
    const [allChecked, setAllChecked] = useState(false)
    const [selected, setSelected] = useState([]);

    
    let screenSize = useSelector(state => state.mobileReducer)
    function secondCol (last_action, last_action_date, appointmentName, customer, customer_phone, customer_email, customer_id, purchasing_price, selling_price) {
        if (screenSize){
            if (enableSecondCol) {
                if(last_action && last_action_date) {
                    return (
                        <td width="100%" className="list-item" >
                            <span style={{  color: '#444'}}>{last_action}</span>
                            <span style={{ display: 'flex', alignItems: 'center' }} className="light__text">
                                {<ScheduleIcon style={{ fontSize: screenSize ? 10 : 14, }} />} 
                                <p style={{ marginRight: 5 }}>{last_action_date}</p>
                            </span>
                        </td>
                    )
                }
                if (purchasing_price){
                    return (
                        <td width="45%" className="list-item">
                            <div className="grid-item flex__center">
                                {purchasing_price && <span className="flex__start" style={{ marginBottom: 10 }}><ShoppingCartIcon color="primary" fontSize="small"/>&nbsp; {purchasing_price}&nbsp;ر.س</span>}
                                {selling_price && <span className="flex__start"><SellIcon color="primary" fontSize="small"/>&nbsp; {selling_price}&nbsp;ر.س</span>}
                            </div>
                        </td>
                    )
                }
            }
        } 
        
        else if (appointmentName){
            return (
                <td width="45%" className="list-item">
                    <span className="customer_invoice">{customer} #{customer_id}</span>
                    {customer_phone && 
                        <span className="flex__start light__text">
                            <PhoneInTalkIcon fontSize="small" />
                            {customer_phone}
                        </span>}
                        {customer_email && 
                        <span className="flex__start light__text">
                            <EmailIcon fontSize="small" />
                            {customer_email}
                        </span>}
                                    
                </td>)
        }
        else if (purchasing_price){
            return (
                        <td width="45%" className="list-item">
                            <div className="grid-item flex__center">
                                {purchasing_price && <span className="flex__start" style={{ marginBottom: 10 }}><ShoppingCartIcon color="primary" fontSize="small"/>&nbsp; {purchasing_price}&nbsp;ر.س</span>}
                                {selling_price && <span className="flex__start"><SellIcon color="primary" fontSize="small"/>&nbsp; {selling_price}&nbsp;ر.س</span>}
                            </div>
                        </td>
            )
            
        }
        else if(last_action && last_action_date) {
            return (
                <td width="100%" className="list-item" >
                    <span style={{  color: '#444'}}>{last_action}</span>
                    <span style={{ display: 'flex', alignItems: 'center' }} className="light__text">
                        {<ScheduleIcon style={{ fontSize: screenSize ? 10 : 14, }} />} 
                        <p style={{ marginRight: 5 }}>{last_action_date}</p>
                    </span>
                </td>
            )
        }
        else{
            return ('')
        }
    }

    const handleCheckChieldElement = (e) => {
        let allResults = results;
        allResults.forEach(result => {
        if (result.id === parseInt(e.target.id))
            result.isChecked = e.target.checked;
        });
        setResults(allResults)
        setIsChecked(!checked)
        setSelected([...selected, parseInt(e.target.id)])
        if(!e.target.checked){
            setSelected(selected.filter(r => e.target.id !== r))
        }
        if(results.filter(result => result.isChecked === false).length > 0){
            setAllChecked(false)
        } else {
            setAllChecked(true)
        }
    }

    const handleAllChecked = (e) => {
        let allResults = results;
        allResults.forEach(result => result.isChecked = e.target.checked)
        setResults(allResults)
        setAllChecked(!allChecked)
        setSelected(allResults.filter(result => result.isChecked === true).map(r => r.id))
    }

    const handleMultiDelete = () => {
        axiosInstance.delete(deleteAllLink, selected)
        setResults(results.filter(e => !selected.includes(e.id)))
        
    }

    const actions = [
        {
            label: 'حذف',
            operation: handleMultiDelete
        }
    ]


    return (
        <>

                <PageHeader
                handleAllChecked={handleAllChecked}
                allChecked={allChecked}
                results={results}
                headerBtns={headerBtns}
                searchInputs={searchInputs}
                setResults={setResults}
                search={false}
                selected={selected}
                actions={actions}
                checkAllowed={true}
                />
                <PageResults 
                results={results}
                secondCol={secondCol}
                setResults={setResults}
                selected={selected}
                deleteOneLink={deleteOneLink}
                linkable
                enableSecondCol={enableSecondCol}
                checkAllowed={true}
                handleCheckChieldElement={handleCheckChieldElement}
                />

            
        </>
    )
    
}

export default DataTables
