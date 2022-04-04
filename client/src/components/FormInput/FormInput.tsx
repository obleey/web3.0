import React from 'react';

interface Props  {
    placeholder: string;
    name: string;
    type: string;
    value?: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;

}

const FormInput: React.FC<Props> = ({placeholder, name, type,value, handleChange}) => {
    return (
        <input placeholder={placeholder} type={type} step="0.0001" value={value} onChange={(e)=>handleChange(e, name)} className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"/>

    );
};

export default FormInput;
