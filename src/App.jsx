import { useContext, useEffect } from "react";
import ItemContext from "./Store/ItemContext";
import Home from "./components/Pages/Home";
import LoginPage from "./components/Pages/Login";

function App() {
  const ctx = useContext(ItemContext);

  return (
        <>
<<<<<<< main
          {!ctx.isLoggedIn && <LoginPage />}
          {ctx.isLoggedIn && <Home/>}
=======
        <div className={`h-full ${darkModeToggle ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>
        
          {!isLoggedIn && <LoginPage />}
          {isLoggedIn && <Home/>}
        </div>``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
>>>>>>> local
        </>
  );
}

export default App;