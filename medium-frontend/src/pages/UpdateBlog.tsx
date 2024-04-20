import { ChangeEvent, useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


export function UpdateBlog(){
    const [post, setPost] = useState({
        title: "",
        content: ""
    });

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id || ""}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const blog = response.data.blog;
            setPost({
                title: blog.title,
                content: blog.content
            });
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [])

    function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, field: string){
        setPost((prevVal)=>{
            return{
                ...prevVal,
                [field]: e.target.value
            }
        })
    }

    async function updateBlog(){
        // console.log(post)
        try {
            const resp = await axios.put(`${BACKEND_URL}/api/v1/blog/update`, {
                id: id || "",
                title: post.title,
                content: post.content
            } , {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });

            const json = resp.data;
            console.log(json);
            navigate(`/blog/${json.post}`)
        } catch (error: any) {
            if (error.response) {
                console.log("Error status:", error.response.status);
                console.log("Error:", error.response.data.error);
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

    return(
        <div>
            <Appbar />

            <div className="flex size-screen justify-center items-center ">
                <div className="flex flex-col gap-2 mt-10 w-9/12">
                    {/* title */}
                    <input type="text" placeholder="Title" className="block border-l-2 focus:outline-none p-3 text-4xl font-bold w-full basis-9/12" value={post.title}
                        onChange={(e)=>{
                            handleChange(e, "title")
                        }}
                    />

                    {/* content */}
                    <textarea rows={10} className="block p-3 text-md w-full focus:outline-none basis-9/12" placeholder="Write your thoughts here..." value={post.content}
                        onChange={(e)=>{
                            handleChange(e, "content")
                        }}
                    />

                    <button type="button" className="text-white bg-green-600 hover:bg-green-700 hover:text-slate-300 focus:outline-none focus:ring-1 focus:ring-green-600 font-medium rounded-full text-sm px-3 py-1.5 text-center mr-5 flex flex-col justify-center items-center w-1/4" onClick={updateBlog}>
                        Update
                    </button>
                </div>

            </div>
        </div>
    )
}