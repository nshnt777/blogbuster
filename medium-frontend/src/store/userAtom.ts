import { atom } from "recoil";

const userAtom = atom({
        key: 'userAtom',
        default: {
            email: "",
            name: ""
        }
})

export default userAtom;