import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material'
import { useSelector } from 'react-redux';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';


const SearchSection = ({searchSection, searchInputs}) => {
    const [searchCriteria, setCriteria] = useState()

    const screenSize = useSelector(state => state.mobileReducer)
    return (
        <section style={{ display: !screenSize ? 'block' : searchSection ? 'block' : 'none' }}>
            <h4 className="panel-heading">بحث</h4>
            <div className="panel flex__between" style={{ flexDirection: screenSize ? 'column' : 'row' }}>
                <div style={{ display: 'flex', flexDirection: screenSize ? 'column' : 'row' }}>
                    {/* <div className="labeled__button">
                        <label className="label">العميل</label>
                        <Button className="select__button" variant="outlined">
                            <span>أي عميل</span>
                            <ArrowDropDownIcon />
                        </Button>
                    </div>
                    <div className="labeled__button">
                        <label className="label">رقم الفاتورة</label>
                        <input className="inputText" type="text" placeholder="كل الفواتير" onChange={(e) => setCriteria({...searchCriteria, invoiceId: e.target.value})} />
                    </div> */}
                    {searchInputs.map((input) => 
                    <div className="labeled__button">
                    <label className="label">{input.label}</label>
                    {input.type === 'dropdown' && (
                        <Button className="select__button" variant="outlined">
                            <span>{input.placeholder}</span>
                            <ArrowDropDownIcon />
                        </Button>)}
                    {input.type === 'text' && (
                        <input className="inputText" type="text" placeholder={input.placeholder} onChange={(e) => setCriteria({...searchCriteria, invoiceId: e.target.value})} />
                    )}
                    </div>)}
                </div>
                <div style={{ display: 'flex', flexDirection: screenSize ? 'column' : 'row', alignItems: 'center' }}>
                <Button variant="contained" color="success" style={{ marginLeft: screenSize ? '' : 10, marginBottom: screenSize ? 10 : 0}}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>{<SearchIcon style={{ marginLeft: 5 }} />}  بحث </span>
                </Button>
                <Button variant="contained" style={{ background: '#eee', color: 'black' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>{<YoutubeSearchedForIcon style={{ marginLeft: 5 }} />} إلغاء الفلتر </span>
                </Button>
                </div>
            </div>
        </section>
    )
}

export default SearchSection
