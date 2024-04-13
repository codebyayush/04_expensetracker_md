import Home from "./components/Pages/Home";
import LoginPage from "./components/Pages/Login";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
        <>
          {!isLoggedIn && <LoginPage />}
          {isLoggedIn && <Home/>}
        </>
  );
}

export default App;