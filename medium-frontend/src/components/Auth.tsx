import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { LoginInput, SignupInput } from "@nshnt777/medium-common-module";
import { Button, Input, PasswordInput } from './Input'
import axios from 'axios';
import env from 'dotenv';
env.config();

const BACKEND_URL = process.env.BACKEND_URL;

function AuthHeader({ type }: { type: "signup" | "login" }) {

    let otherPage = null;
    let link = null;
    if (type === "signup") {
        otherPage = "Already have an account? "
        link = <Link to={"/login"} className="pl-2 underline" >Log In</Link>
    }
    else if (type === "login") {
        otherPage = "Don't have an account? "
        link = <Link to={"/signup"} className="pl-2 underline" >Sign Up</Link>
    }

    return (
        <>
            <h1 className="text-4xl font-bold">{type === "signup" ? "Create an account" : "Log in"}</h1>

            <p className="text-slate-500 text-base">
                {otherPage}
                {link}
            </p>

        </>
    )
}


export function SignUpAuth() {
    const [signupInput, setSignupInput] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    function handleChange(field: string, e: ChangeEvent<HTMLInputElement>) {
        setSignupInput((prevVal) => {
            return {
                ...prevVal,
                [field]: e.target.value
            }
        });
    }

    async function signIn(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                ...signupInput
            });

            const jwt = response.data.JWT_token;

            localStorage.setItem('token', jwt);

            navigate('/blogs');

        }
        catch (error: any) {
            if (error.response) {
                console.log("Error status:", error.response.status);
                console.log("Error:", error.response.data);
                alert(error.response.data.error)
            } else if (error.request) {
                console.log("No response received:", error.request);
                alert(error.message);
            } else {
                console.log("Error setting up the request:", error.message);
                alert(error.message);
            }
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col text-center max-w-1/2 text-xl ">

            <AuthHeader type="signup" />

            <div className="flex flex-col gap-1 justify-center items-center lg:m-10 px-20 min-w-fit">
                <form>

                <Input 
                    label={"Username"} 
                    type={"text"} 
                    placeholder={"Enter your username"} 
                    onChange={(e) => {
                        handleChange("name", e);
                    }} 
                />

                <Input 
                    label={"Email"} 
                    type={"email"} 
                    placeholder={"abc@example.com"} 
                    onChange={(e) => {
                        handleChange("email", e)
                    }} 
                />

                {/* <Input label="Password" type="password" placeholder="" /> */}

                <PasswordInput 
                    onChange={(e) => {
                        handleChange("password", e);
                    }} 
                />

                <Button 
                    type="signup" 
                    onClick={(e)=>{
                        signIn(e);
                    }} 
                />
                </form>
            </div>
        </div>
    )
}


export function LogInAuth() {
    const [loginInput, setLoginInput] = useState<LoginInput>({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    function handleChange(field: string, e: ChangeEvent<HTMLInputElement>) {
        setLoginInput((prevVal) => {
            return {
                ...prevVal,
                [field]: e.target.value
            }
        });
    }

    async function login(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`, {
                ...loginInput
            });

            const jwt = response.data.JWT_token;
            console.log(jwt);
            localStorage.setItem('token', jwt);

            navigate('/blogs');

        }
        catch (error: any) {
            if (error.response) {
                console.log("Error status:", error.response.status);
                console.log("Error:", error.response.data);
                alert(error.response.data.error)
            } else if (error.request) {
                console.log("No response received:", error.request);
                alert(error.message);
            } else {
                console.log("Error setting up the request:", error.message);
                alert(error.message);
            }
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col text-center max-w-1/2 text-xl ">

            <AuthHeader type="login" />

            <div className="flex flex-col gap-1 justify-center items-center lg:m-10 px-20 min-w-fit">

                <form>
                <Input 
                    label={"Email"} 
                    type={"email"} 
                    placeholder={"abc@example.com"} 
                    onChange={(e) => {
                        handleChange("email", e)
                    }} 
                />

                {/* <Input label="Password" type="password" placeholder="" /> */}

                <PasswordInput 
                    onChange={(e) => {
                        handleChange("password", e);
                    }} 
                />

                <Button 
                    type="login" 
                    onClick={(e)=>{
                        login(e);
                    }} 
                />
                </form>
            </div>
        </div>
    )
}
