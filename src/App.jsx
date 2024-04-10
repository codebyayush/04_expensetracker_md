import { useContext } from "react";
import ItemContext from "./Store/ItemContext";
import Home from "./components/Pages/Home";
import LoginPage from "./components/Pages/Login";

function App() {
  const ctx = useContext(ItemContext);

  return (
        <>
          {!ctx.isLoggedIn && <LoginPage />}
          {ctx.isLoggedIn && <Home/>}
        </>
  );
}

export default App;