import { createContext, useContext } from "react"
import useLogin from "../hooks/useLogin"

const UserContext = createContext()

function UserProvider({children}) {
    const value = useLogin();
    console.log(value,'val');

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}

export const useUserContext = ()=>{
   return useContext(UserContext)
}

export default UserProvider