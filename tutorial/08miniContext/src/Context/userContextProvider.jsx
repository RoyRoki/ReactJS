import React , {useState} from "react";

import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    const [user , setUserx] = useState(null)

    return (
        <UserContext.Provider  value={{user , setUserx}}>
           {children}       
        </UserContext.Provider>
    )
}


export default UserContextProvider
