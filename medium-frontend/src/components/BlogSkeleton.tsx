export function BlogSkeleton() {
    return (

        <div role="status" className="space-y-2.5 animate-pulse w-full h-full grid grid-cols-9">
            <div className="col-span-7">
                <div className="w-full">
                    {/* title */}
                    <div className="h-10 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className="my-4">
                    {/* Date */}
                    <div className="h-4 w-40 bg-gray-200 rounded-full mb-2.5"></div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                    <ContentSkeleton />
                    <ContentSkeleton />
                    <ContentSkeleton />
                </div>

                <div className="mt-10">
                    {/* id */}
                </div>
            </div>

        </div>

    )
}

function ContentSkeleton() {
    return (
        <>

            {/* content */}
            <div className="flex items-center">
                <div className="h-4 bg-gray-200 rounded-full w-32"></div>
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-24"></div>
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full ">
                <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-full"></div>
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full max-w-[630px]">
                <div className="h-4 bg-gray-300 rounded-full w-full"></div>
                <div className="h-4 ms-2 bg-gray-200 rounded-full w-80"></div>
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full ">
                <div className="h-4 ms-2 bg-gray-200 rounded-full w-full"></div>
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-full"></div>
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full">
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-32"></div>
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-24"></div>
                <div className="h-4 ms-2 bg-gray-200 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[360px]">
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-full"></div>
                <div className="h-4 ms-2 bg-gray-200 rounded-full w-80"></div>
                <div className="h-4 ms-2 bg-gray-300 rounded-full w-full"></div>
            </div>
        </>
    )
}