import axios from "axios";
import { get } from "http";
import { atom, selector } from "recoil";

const userSelector = selector({
    key: 'userSelctor',
    get: async ({get})=>{
        const authToken = localStorage.getItem("token");

        if(authToken){
            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const resp = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
                headers: {
                  Authorization: authToken
                }
            });

            const userData = resp.data;

            return userData;
        }
    }
})

const userAtom = atom({
        key: 'userAtom',
        default: userSelector
})

export default userAtom;