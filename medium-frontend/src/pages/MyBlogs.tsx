import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { Blog } from "../hooks";
import { HomeSkeleton } from "../components/HomeSkeleton";

export default function MyBlogs(){
    const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    async function deletePost(id: string){
        const ans = confirm("Are you sure you want to delete this blog?");

        if(ans === false){
            return;
        }
        
        try{
            const resp = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })

            if(!resp.data.success){
                alert('Post could not be deleted!');
            }
            else{
                setLoading(true);
                const remainingBlogs = await axios.get(`${BACKEND_URL}/api/v1/blog/myblogs`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                setLoading(false);
                setMyBlogs(remainingBlogs.data.blogs);
                // alert(resp.data.message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        axios.get(`${BACKEND_URL}/api/v1/blog/myblogs`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const json = response.data;
            setMyBlogs(json.blogs);
            setLoading(false)
        })
        .catch((error)=>{
            console.log(error);
        })
    }, []);

    if(loading){
        return (
            <div>
                <Appbar />
                <div className="flex flex-col gap-5 justify-start items-center mt-5">
                    <HomeSkeleton />
                    <HomeSkeleton />
                    <HomeSkeleton />
                    <HomeSkeleton />
                    <HomeSkeleton />
                </div>

            </div>
        )
    }

    return(
        <div>
            <Appbar />
            <div className="flex flex-col justify-center items-center w-full mt-5">
                {myBlogs.map((blog)=>{
                    return(
                        <div key={blog.id} className="flex flex-row justify-between items-center w-9/12">
                            <BlogCard 
                                id={blog.id}
                                title={blog.title}
                                content={blog.content}
                                published= {new Date(blog.published)}
                                author={{name: blog.author.name}}
                            />
                            <button 
                                type="button" 
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                onClick={()=>{
                                    console.log("Updated")
                                }}>
                                    Update
                            </button>

                            <button 
                                type="button" 
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                onClick={()=>{
                                    deletePost(blog.id);
                                }}>
                                    Delete
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}