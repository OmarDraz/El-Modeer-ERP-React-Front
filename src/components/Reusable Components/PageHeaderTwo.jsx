import React from 'react';
import { Button } from '@mui/material';

const PageHeaderTwo = (props) => {
    return (
            <div className={`panel ${props.leftOnly ? 'flex__center' : 'flex__between'}`}>
                {
                    props.rightText ? props.rightText() : ''
                }
                {
                props.preview ? 
                <Button variant="contained" color="secondary">
                    <span>
                        معايـنـة
                    </span>
                </Button> : ''
                }
                
                <div>
                    {
                        props.btns.map((e) => (
                            <Button color={e.color} variant="contained" hidden={e.hidden} onClick={e.onClick ? e.onClick : ''} style={{  background: !e.color ? '#eee' : '', color: !e.color ? 'black' : '', marginLeft: 10 }}>
                                <span>
                                    {e.text}
                                </span>
                                {e.icon}
                            </Button>
                        ))
                    }
                </div>
            </div>
    )
}

export default PageHeaderTwo