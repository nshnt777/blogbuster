import {SignUpAuth} from "../components/Auth";
import WelcomeMsg from "../components/WelcomeMsg";

export default function Signup(){
    return(
        <>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:block">
                <WelcomeMsg type={"signup"}/>
            </div>
            <div>
                <SignUpAuth />
            </div>
        </div>
        </>
    )
}