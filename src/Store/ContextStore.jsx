import React, { useState } from 'react'
import ItemContext from './ItemContext';

const ContextStore = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isLoginHandler = () => {
        setIsLoggedIn((prevState) => !prevState);
    }


    const context = {
            isLoggedIn: isLoggedIn,
            loginHandler: isLoginHandler
    }

  return (
        <ItemContext.Provider value={context}>
                {children}
        </ItemContext.Provider>
  )
}

export default ContextStore;