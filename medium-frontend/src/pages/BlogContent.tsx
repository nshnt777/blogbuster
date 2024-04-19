import { Avatar } from "../components/BlogCard";
import { Blog } from "../hooks";


export function BlogContent({id, title, content, published, author} : Blog) {
    return (
        <div className="flex justify-center items-center mt-12">
            <div className="grid grid-cols-12 w-full max-w-screen-2xl h-screen px-16 divide-x-2 gap-5">
                <div className="col-span-9">
                    <h1 className="text-4xl font-extrabold">{title} </h1>
                    <p className="text-slate-500 my-2 text-sm font-medium"> Posted on {published.toDateString()}</p>

                    <p className="pt-2 text-slate-850">{content}</p>

                    <div className="mt-10">
                        <sub>id: {id}</sub>
                    </div>
                </div>
                

                <div className="col-span-3 box-border pl-5">
                    <div className="font-medium mb-2 text-slate-700">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-3 flex flex-col justify-center">
                            <Avatar name={author.name} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {author.name}
                            </div>
                            <div className="text-slate-500 text-sm">
                                Random catchphrase about the author's ability to catch the user's attention
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}