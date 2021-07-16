import React from "react";
import s from "./FormControls.module.css"



export const Textarea = ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error
    return <div className={s.formControl +' '+ (hasError?s.error:' ')}>
        <div >
            <textarea {...input} {...props}/>
        </div>
        {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
}

export const Input = ({input,meta,...props}) => {
    let hasError = meta.touched && meta.error
    return <div className={s.formControl +' '+ (hasError?s.error:' ')}>
        <div >
            <input {...input} {...props}/>
        </div>
        {meta.touched && meta.error && <span>{meta.error}</span>}
    </div>
}