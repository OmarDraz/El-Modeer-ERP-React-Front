import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import SearchIcon from '@mui/icons-material/Search';
import { Checkbox, Button, IconButton } from '@mui/material'
import SearchSection from './SearchSection';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PageHeader = ({handleAllChecked, allChecked, searchInputs, search, headerBtns, checkAllowed, leftOnly, setResults, results, actions, selected, deleting}) => {
    const [openActionsMenu, setOpened] = useState(false)
    const [searchSection, setSearchSectionOpened] = useState(false)


    let screenSize = useSelector(state => state.mobileReducer)
    const handleActionsDropdown = () => {
        setOpened(!openActionsMenu)
    }

    const handleSearchSection = () => {
        setSearchSectionOpened(!searchSection)
    }

    return (
        <>
        <div className={`panel ${leftOnly ? 'flex__center' : 'flex__between'}`}>
            {checkAllowed && 
            <div className="flex__start">
                    <Checkbox color="secondary" style={{ marginLeft: 10 }} onChange={handleAllChecked} checked={allChecked} />
                    <div className="do__action">
                        {screenSize ? 
                        <IconButton onClick={handleActionsDropdown} color="secondary">
                            <HomeRepairServiceIcon />
                            <ArrowDropDownIcon />
                        </IconButton> :
                        <Button onClick={handleActionsDropdown} variant="contained" color="secondary">
                            <span style={{ display: 'flex', alignItems: 'center' }}>الإجراءات{<ArrowDropDownIcon />}</span>
                        </Button> }
                        
                        <ul className="dropdown-menu" style={{ display: openActionsMenu ? 'block' : 'none' }}>
                            {
                                actions.map(action => 
                            <li>
                                <button onClick={() => action.operation(selected)}>{action.label}</button>
                            </li>)
                            }

                        </ul>
                    </div>
                </div>}
                
                <div>
                    {screenSize ? 
                    <>
                    <IconButton onClick={handleSearchSection} color="primary">
                        <SearchIcon />
                    </IconButton>
                    {headerBtns.map((e) => 
                    <IconButton component={Link} to={e.to}>
                        {e.icon}
                    </IconButton>)}
                    </>
                    : 
                    <>
                            {
                                headerBtns.map((e) => 
                                <Button component={Link} onClick={e.onClick ? e.onClick : ''} to={e.to} variant="contained" color={e.color} style={{  background: !e.color ? '#eee' : '', color: !e.color ? 'black' : '', marginLeft: 10 }}>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>{e.icon} {e.text} </span>
                                </Button>)
                            }
                    </>
                    }                  
                </div>
            </div>
            {search && <SearchSection searchSection={searchSection} searchInputs={searchInputs} />}
            </>
    )
}

export default PageHeader
