import React from 'react';
import { ErrorMessage,useField } from 'formik';

export default function InputField({label,...props}) {
    const [field,meta]=useField(props);
    return (
        <div className='pos__form mb-1'>
            <label className="pos__form--label" htmlFor={field.name}>{label}</label>
            <input 
                className={`form-control pos__form--input ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
                required
            />
            <ErrorMessage component="div" name={field.name} className="pos__form--error"/>
        </div>
    )
}
