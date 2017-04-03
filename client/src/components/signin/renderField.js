import React from 'react'

const renderField = (props) => {

    if(props.falsePassword!=null){
        props.meta.error = props.falsePassword;
    }
    return(
        <div>
            <label>{props.label}</label>
            <div>
                <input {...props.input} placeholder={props.label} type={props.type}/>
                {props.meta.touched && props.meta.error && <span>{props.meta.error}</span>}
            </div>
        </div>
    )};

export default renderField;