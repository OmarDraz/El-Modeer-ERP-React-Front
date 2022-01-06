import React, { useEffect } from 'react'
import SelectionSearch from './SelectionSearch'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import RotateRightIcon from '@mui/icons-material/RotateRight';

const InputsGroup = ({rightInputs, leftInputs, state, rightText, leftText, validate, setTags, tags}) => {

    useEffect(() => {

    })
    const panel = (type, label, placeholder, value, change, options, dataValidate, onSelect, optional, link, to, create, onKey) => {
        if(type === 'searchSelection'){
            return (
                <>
                <SelectionSearch placeholder={placeholder} type="outlined" link={link} create={create} onSelect={onSelect} label={label} />
                {!create && (
                <Button component={Link} to={to} variant="contained" color="secondary" style={{ marginRight: 10 }}>
                    <span>جديد</span>
                </Button>)}
                
                {
                     (validate === true && optional === false && value=== '') ? <label className="errorLabel mr-10">{`${dataValidate}*`}</label> : ''
                }
                </>
            )
        } else if (type === 'selection') {
            return (
                <div className="labeled__button">
                    <label className="label">{label}</label>
                    <select value={value} className="inputText" style={{ width: '100%' }} onChange={change}>
                        {options.map((e) => <option selected={ e.name === value } value={e.isoCode ? e.isoCode : e.name}>{e.name} ({e.isoCode ? e.isoCode :e.countryCode})</option>)}
                    </select>
                    {
                        (validate === true && optional === false && value=== '') ? <label className="errorLabel mr-10">{dataValidate}*</label> : ''
                    }
                </div>
            )
        } else if (type === 'date' || type === 'text'){
            return (
                <div className="labeled__button">
                    <label className="label" style={{ marginLeft: 10 }}>{label}</label>
                    <input placeholder={placeholder} className="inputText" style={{ width: '100%', borderRadius: 4 }} type={type} rows="10" value={value} onChange={(e) => change(e.target.value)} />
                    {
                        (validate === true && optional === false && value=== '') ? <label className="errorLabel mr-10 mt-10">{dataValidate}*</label> : ''
                    }
                </div>
            )  
        } else if (type === 'textarea'){
            return(
            <div className="labeled__button">
                <label className="label" style={{ marginLeft: 10 }}>{label}</label>
                <textarea placeholder={placeholder} className="inputText" rows="10" style={{ width: '100%', height: 100 }} value={value} onChange={(e) => change(e.target.value) }/>
                {
                    (validate === true && optional === false && value=== '') ? <label className="errorLabel mr-10 mt-10">{dataValidate}*</label> : ''
                }
            </div>
            )
        }else if (type === 'barcode'){
            return(
                <div className="labeled__button">
                    <label className="label" style={{ marginLeft: 10 }}>{label}</label>
                    <div className="barcode flex__between">
                        <div className="light__text" style={{ letterSpacing: 0.3 }}>{value ? value : placeholder}</div>
                        <button onClick={change} style={{ height: 35, outline: 'none', border: '4px solid transparent', borderRadius: '4px 0px 0px 4px', cursor: 'pointer' }}><RotateRightIcon /></button>
                    </div>
                </div>
            )
        } else if (type === 'tags'){
            return (
                <div className="labeled__button">
                    <label className="label">{label}</label>
                    <div style={{ height: 'auto', flexWrap: 'wrap', position: 'relative' }} className="p-10 inputText w-100 tagsContainer flex__start">
                        {tags.map((tag) => <span className="mr-5 tagItem">{tag.category_name}<button onClick={() => setTags(tags.filter((t => tag.name !== t.name)))} className="removeBtn mr-5">x</button></span>)}
                        <input type="text" className="mr-5" style={{ border: 'none', outline: 'none' }} placeholder={placeholder} onKeyUp={(e) => {
                            if(e.key === 'Enter'){
                            setTags([...tags, {category_name: e.target.value, category_id: 0}])
                            e.target.value = ''
                        }
                        }} />
                        <SelectionSearch cat position="absolute" link="store/getCreateCategory" onSelect={(id, name) => setTags([...tags, {category_id: id, category_name: name}])}/>
                    </div>

                </div>
            )
        }
        
    }

    return (
        <div className="row">
                <div className="col-6 col-sm-12">
                <h4 className="panel-heading">{rightText}</h4>
                    <div className="panel flex__column">
                        <div className="row">
                        {
                            rightInputs.map(({type, label, placeholder, width, value, change, options, dataValidate, onSelect, optional, link, to, create, onKey}) => 
                                <div className={width === '100%' ? 'col-12' : width === '30%' ? 'col-4 col-sm-12' : 'col-6 col-sm-12'} style={{ marginBottom: 10 }} >
                                    {panel(type, label, placeholder, value, change, options, dataValidate, onSelect, optional, link, to, create, onKey)}
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
                <div className="col-6 col-sm-12">
                <h4 className="panel-heading">{leftText}</h4>
                    <div className="panel flex__column">
                        <div className="row">
                        {
                            leftInputs.map(({type, label, placeholder, width, value, change, options, dataValidate, onSelect, optional, link, to, create, onKey}) => 
                                <div className={width === '100%' ? 'col-12' : width === '30%' ? 'col-4 col-sm-12' : 'col-6 col-sm-12'} style={{ marginBottom: 10 }} >
                                    {panel(type, label, placeholder, value, change, options, dataValidate, onSelect, optional, link, to, create, onKey)}
                                </div>
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default InputsGroup
