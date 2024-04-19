import {LogInAuth} from "../components/Auth";
import WelcomeMsg from "../components/WelcomeMsg";

export default function Login(){
    return(
        <>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
                <LogInAuth />
            </div>
            <div className="hidden md:block">
                <WelcomeMsg type={"login"}/>
            </div>
        </div>
        </>
    )
}