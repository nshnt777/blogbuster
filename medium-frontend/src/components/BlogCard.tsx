import { Link } from "react-router-dom";
import { Blog } from "../hooks";

// export interface BlogCardProps{
//     authorName : string,
//     title: string,
//     content: string,
//     publishedDate: Date,
//     id: string
// }

export default function BlogCard({ author, title, content, published, id } : Blog){
    const wordCount = content.length/5;
    const timeToRead = Math.ceil(wordCount/250);
    return(
        <div className="border-b-2 pb-4 border-slate-100 mt-5 w-full cursor-pointer">

            <Link to={`/blog/${id}`}>
            <div className="flex flex-row items-center gap-1 text-sm">
                <div className="flex justify-center items-center">
                    <Avatar name={author.name} />
                </div>
                <div className="text-gray-800 ml-1">
                    {author.name}
                </div>
                <div className="text-gray-700 text-xs">
                &middot; {published.toDateString()}
                </div>
            </div>

            <div className="font-bold text-xl text-black">
                {title}
            </div>
            <div className=" text-base font-light">
                {content.slice(0,100) + "..."}
            </div>

            <div className=" text-sm text-slate-500 pt-2">
                {/* time to read:- 
                    5 chars per word ==> 1 cahr = 1/5 words
                        content.length()/5 = word count
                    250 words per minute ==> 1 minute -> 1/250 words
                    word count/250 == time to read
                    take GIF of this
                */}

                {timeToRead} min read
            </div>
            </Link>

        </div>
    )
}

export function Avatar({name} : {name: string}){
    return(

        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-500 rounded-full text-center">
            <span className="font-extralight text-sm text-white">{name[0].toUpperCase()}</span>
        </div>

    )
}