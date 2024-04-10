import React from 'react';

const ItemContext = React.createContext({
    isLoggedIn: false,
    loginHandler: (token) => {},
    logoutHandler: () => {},
    
})  

export default ItemContext;