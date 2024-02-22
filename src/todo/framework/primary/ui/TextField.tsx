'use client'
import React, {useState} from "react";
import {Title} from "@/todo/domain/title/Title";
import {Description} from "@/todo/domain/description/Description";
import {ErrorMessage} from "@/todo/framework/primary/ui/ErrorMessage";

type TextFieldProps = { name: string, id: string, label: string, required?: boolean };


const validations: { [key: string]: (v: string) => void } = {
    title: (value: string) => new Title(value),
    description: (value: string) => new Description(value),

}

export const TextField = ({name, id, label, required = false}: TextFieldProps) => {
    const [value, setValue] = useState("")
    const [error, setError] = useState("")

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const validation = validations[id];
        const newValue = event.target.value;
        try {
            setValue(newValue)
            validation(newValue)
            setError("")
        } catch (e: any) {
            setError(e.message)
        }

    };
    return <div className={"flex flex-col"}>
        <label htmlFor={id}>{label}</label>
        <input onChange={onChange} value={value} type="text" id={id} name={name} required={required}/>
        <ErrorMessage error={error}/>
    </div>;
};