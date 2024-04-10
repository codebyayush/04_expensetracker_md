import React, { useState } from 'react'
import ItemContext from './ItemContext';

const ContextStore = ({children}) => {
    const initialToken = localStorage.getItem("token")
    const [token, setToken] = useState(initialToken);

    let userIsLoggedIn = !!token

    const isLoginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token)
        setTimeout(() => {
            localStorage.removeItem("token");
          }, 5 * 60 * 1000);
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem("token");
    }

    const context = {
            isLoggedIn: userIsLoggedIn,
            loginHandler: isLoginHandler,
            logoutHandler: logoutHandler
    }

  return (
        <ItemContext.Provider value={context}>
                {children}
        </ItemContext.Provider>
  )
}

export default ContextStore;