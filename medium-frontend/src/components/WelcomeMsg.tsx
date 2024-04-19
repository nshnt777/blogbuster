export default function WelcomeMsg({type} : {type: "signup" | "login"}){
    return(
        <div className="bg-black h-screen flex justify-center items-center flex-col text-white text-center max-w-1/2 text-2xl">
            <div className="w-fit p-5">
                <h1 className="text-4xl font-bold">
                    {type === "signup"? "Hello, friend": "Welcome Back!"}
                </h1>
                <p>{type === "signup"? "Enter your details to start your blogging journey with us": "To keep your journey going, please login with your credentials!"}</p>

            </div>
        </div>
    )
}