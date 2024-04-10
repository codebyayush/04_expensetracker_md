import React from 'react';

const ItemContext = React.createContext({
    isLoggedIn: false,
    loginHandler: () => {}
})  

export default ItemContext;