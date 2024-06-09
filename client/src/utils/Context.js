import { createContext, useState } from "react";

export const Context = createContext();

const AppContext = ({children}) => {

    const [loginInfo, setLoginInfo] = useState({status: false});
    const [cart, setCart] = useState([]);
    
    return(
        <Context.Provider value={{
            loginInfo, setLoginInfo,
            cart, setCart
        }}>
            {children}
        </Context.Provider>
    )
}
export default AppContext;