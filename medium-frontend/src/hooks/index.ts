import axios from "axios";
import { useEffect, useState } from "react";
import env from 'dotenv';
env.config();

const BACKEND_URL = process.env.BACKEND_URL;

export interface Blog{
    id: string,
    title: string,
    content: string,
    published: Date,
    author: {
        name: string
    }
}

export function useBlogs(){
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        })
        .catch((error)=>{
            console.log("Could not fetch data");
            console.error(error.response.data.error);
            alert(error.response.data.error)
        })
    }, []);

    return {loading, blogs}
}

export function useSingleBlog({id} : {id: string | undefined}){
    const [loading, setLoading] = useState(true);
    const [singleBlog, setSingleBlog] = useState<Blog>({
        id: "",
        title: "",
        content: "",
        published: new Date(),
        author: {name: ""},
        
    });

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
        .then((response)=>{
            setSingleBlog(response.data.blog);
            setLoading(false);
        })
        .catch((error)=>{
            console.log("Could not fetch data");
            console.log(error.response.data);
        })
    }, [id]);

    return {loading, singleBlog}
}