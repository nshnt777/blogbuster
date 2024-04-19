import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useSingleBlog } from "../hooks"
import { BlogContent } from "./BlogContent";
import { BlogSkeleton } from "../components/BlogSkeleton";

//use atomFamilies/selectorFamilies
export function Blog(){
    const {id} = useParams();

    const {loading, singleBlog} = useSingleBlog({id: id});

    if(loading){
        return(
            <div>
                <Appbar />

                <div className="flex flex-col justify-center items-center mt-5 ml-8 p-10">
                    <BlogSkeleton />
                </div>

            </div>
        )
    }

    return(
        <div>
            <Appbar />

            <BlogContent 
                id={singleBlog.id}
                title={singleBlog.title}
                content={singleBlog.content}
                published={new Date(singleBlog.published)}
                author={singleBlog.author }
            />
            
        </div>
    )
} 