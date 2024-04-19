export function HomeSkeleton(){
    return(

<div role="status" className="w-full max-w-2xl animate-pulse">
            {/* top component avatar + author + date */}
            <div className="flex flex-row gap-1 w-full justify-start items-center">
                <div className="flex justify-center items-center">
                    {/* avatar */}
                    <div className="h-6 w-6 bg-gray-200 rounded-full mb-3"></div>
                </div>
                <div className="ml-1">
                    {/* author */}
                    <div className="h-4 w-20 bg-gray-200 rounded-full mb-2.5"></div>
                    {/* <div className="h-2 w-full bg-gray-200 rounded-full mb-2.5"></div> */}
                </div>
                    {/* &middot; */}
                <div>
                    {/* date published */}
                    <div className="h-4 w-10 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>

            <div className="font-bold text-xl text-black">
                {/* title */}
                <div className="h-6 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
            </div>
            <div className=" text-base font-light">
                {/* content */}
                <div className="h-4 bg-gray-200 rounded-full max-w-[400px] mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded-full max-w-[500px] mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
            </div>

            <div className=" text-sm text-slate-500 pt-2">
                {/* time to read */}
                <div className="h-4 w-40 bg-gray-200 rounded-full max-w-[360px]"></div>
            </div>
    
    
    
    
    
    {/* <span className="sr-only">Loading...</span> */}
</div>


    )
}