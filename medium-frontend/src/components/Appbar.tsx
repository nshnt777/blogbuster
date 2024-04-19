import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


export function Appbar() {
    return (
        <div className="border-b-2 flex justify-between px-10 py-2 shadow-md bg-black w-full">
            <Link to={'/blogs'} className="flex justify-center items-center h-fukk text-white text-xl font-bold cursor-pointer">
                Blogbuster
            </Link>


            <div className="flex flex-cols justify-center items-center">
                <Link to={'/publish'}>
                    <button type="button" className="text-white bg-green-600 hover:bg-green-700 hover:text-slate-300 focus:outline-none focus:ring-1 focus:ring-green-600 font-medium rounded-full text-sm px-3 py-1.5 text-center mr-5 flex flex-col justify-center items-center ">
                        New Blog
                    </button>
                </Link>

                <UserProfile name="Nishant" email="ns@gmail.com"/>
            </div>
        </div>
    )
}

function UserProfile({name, email} : {name: string, email: string}){
    const [dropdown, setDropdown] = useState(false);

    function toggleDropdown(){
        setDropdown((prevVal)=>{
            return !prevVal;
        });
    }
    
    return(
        <div className="relative border-none">

            <div className="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-full text-center cursor-pointer" onClick={toggleDropdown}>
                <span className="font-normal text-xl text-black">{name[0]}</span>
            </div>

            {dropdown ? <DropDownMenu name={name} email={email} /> : null}
            
        </div>
    )
}

function DropDownMenu({name, email} : {name: string, email: string}){

    const navigate = useNavigate();

    function signOut(){
        const ans = confirm("Are you sure you want to sign out?");

        if(ans === true){
            localStorage.removeItem('token');
            navigate('/login');
        }
        else{

        }
    }

    return(
        <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0">
                <div className="px-4 py-3 text-sm text-gray-900">
                    <div>{name}</div>
                    <div className="font-medium truncate">{email}</div>
                </div>

                <ul className="py-2 text-sm text-gray-700" aria-labelledby="avatarButton">
                    <li>
                        <Link to="/blogs" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
                    </li>
                    <li>
                        <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                    </li>
                    <li>
                        <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Your blogs</Link>
                    </li>
                </ul>

                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={signOut}>
                    Sign out
                </div>
        </div>
    )
}