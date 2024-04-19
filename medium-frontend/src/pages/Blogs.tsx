import { Appbar } from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { HomeSkeleton } from "../components/HomeSkeleton";
import { useBlogs } from "../hooks";

export default function Blogs() {

    const { loading, blogs } = useBlogs();

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

    return (
        <div>

            <Appbar />

            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center max-w-2xl px-3">
                    {blogs.map((blog) => {
                        return (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                author={blog.author}
                                title={blog.title}
                                content={blog.content}
                                published={new Date(blog.published)}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}