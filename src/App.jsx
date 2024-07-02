import React from "react";
import Home from "./components/Pages/Home";
import LoginPage from "./components/Pages/Login";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const darkModeToggle = useSelector((state) => state.premium.darkModeToggle);
  return (

    <>
      <div
        className={`h-full ${
          darkModeToggle ? "bg-gray-800 text-white" : "bg-gray-100"
        }`}
      >
        {!isLoggedIn && <LoginPage />}
        {isLoggedIn && <Home />}
      </div>
    </>

  );
}

export default App;
