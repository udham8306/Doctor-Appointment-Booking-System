import { createContext } from "react";
import { useState } from "react";
export const DoctorContext = createContext();

const DoctorContextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken,setDtoken] = useState("");

    const value = {
         dToken,setDtoken,backendUrl
    }

    return (
        <DoctorContext.Provider value = {value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;