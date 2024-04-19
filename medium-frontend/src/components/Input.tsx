import {ChangeEvent, useState} from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

interface InputType {
    label: string,
    type: string,
    placeholder: string
    onChange: (e: ChangeEvent<HTMLInputElement>)=> void;
}

export function Input({ label, type, placeholder, onChange }: InputType) {
    return (
        <div className="mt-3 w-full relative">
            <label className="block text-left text-base font-bold ml-1">{label}</label>
            <input type={type} placeholder={placeholder} className="text-sm bg-slate-50 border border-gray-300 rounded block w-full p-2.5 my-1" onChange={onChange} />
        </div>
    )
}

export function PasswordInput({ onChange } : Pick<InputType, 'onChange'>) {
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }

    return (
        <div className="mt-3 w-full">
            <label className="block text-left text-base ml-1 font-bold">Password</label>
            <div className="relative">
                <input type={type} className="text-sm bg-slate-50 border border-gray-300 rounded block w-full p-2.5 my-1" onChange={onChange}/>
                <span className="flex justify-around items-center w-fit" onClick={handleToggle}>
                    <Icon className="absolute bottom-0 right-0 mb-3 mr-3 hover:cursor-pointer" icon={icon} size={25} />
                </span>
            </div>
            <div className='text-xs text-left m-0 text-slate-500'>
                *minimum 8 characters
            </div>
        </div>
    );
}

export function Button({type, onClick} : {type: "signup" | "login", onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void}){
    return(
        <button type="submit" className="block text-white bg-black hover:bg-slate-800 active:ring-2 active:outline-none active:ring-slate-300 font-medium rounded-lg text-base w-full mt-5 px-5 py-2.5 text-center" onClick={onClick}>
            {type === "signup" ? "Sign Up" : "Log in"}
        </button>
    )
}