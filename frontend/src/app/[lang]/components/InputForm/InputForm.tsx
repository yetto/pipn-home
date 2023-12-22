"use client";
import { TextField } from '@radix-ui/themes';
import { useCallback, useEffect, useState } from 'react';
import cn from "clsx"
import s from "./InputForm.module.css"

interface InputFormProps {
    name: string;
    error: any;
    register: any;
    type?: string;
    placeholder: string;
    getValues?: any;
    className?: string;
}

const InputForm = ({ name, error, register, type, placeholder, getValues,className }: InputFormProps) => {
    const [validation, setValidation] = useState<any>(undefined)

    const getValidation = useCallback((error:any) => {
        const value = getValues(name)
        if(error?.[name]?.message){
            return "error"
        }else if(!error?.[name]?.message && value){
            return "success"
        }
        return undefined
    }, [])

    const rootClassName = cn(className, {
        [s.error]: validation === "error",
        [s.success]: validation === "success"
    })

    useEffect(() => {
       const validation = getValidation(error)
       setValidation(validation)
    }, [getValidation, error])

    return (
        <div className={s.root}>
            <TextField.Input
                type={type}
                placeholder={placeholder}
                className={cn(s.inputContainer, rootClassName)}
                {...register(name)}
            />
            {error && <p className="text-sm text-red-500">{error?.[name]?.message}</p>}
        </div>
    );
}

export default InputForm;