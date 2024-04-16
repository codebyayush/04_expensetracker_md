import React, { useRef, useState } from "react";
import SpinnerLoader from "../SpinnerLoader";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store";

const LoginPage = () => {

  const dispatch = useDispatch();

  const loginHandler = (token) => {
      dispatch(authActions.login(token))
  }

  const [isLogin, setIslogin] = useState(true);
  const [passChange, setPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const createAccountHandler = () => {
    setIslogin((prevState) => !prevState);
    setPass(false);
  };

  const togglePassChange = () => {
    setIslogin((prevState) => !prevState);
    setPass((prevState) => !prevState);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;

    if (isLogin) {
      setIsLoading(true)
      const enteredPass = passRef.current.value;
      //login to the existing account
      const resp = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJO3nf1rN9288u3VAFDm0kC3eqhRSqPKc",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (resp.ok) {
        localStorage.setItem('email', enteredEmail);
        const data = await resp.json();
        console.log("Logged in successfully:", data);
        loginHandler(data.idToken);
        setIsLoading(false)
      } else {
        setIsLoading(false)
        const data = await resp.json();
        console.log("Error fetching data", data.error.message);
        alert("ERROR:", data.error.message);
      }
    } else if (!isLogin && passChange) {
      //send verification link
      setIsLoading(true)
      const resp = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCJO3nf1rN9288u3VAFDm0kC3eqhRSqPKc", {
          method: "POST", 
          body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: enteredEmail,
          }),
          headers: {"Content-Type": "application/json"}
      })

      if(resp.ok){
        const data = await resp.json();
        console.log('verification link sent to: ', data.email);
        setIsLoading(false)
        alert('VERIFICATION LINK SENT')
      }else{
          setIsLoading(false);
          const error = await resp.json();
          console.log('error sending reset link..', error);
      }
    } else {
      //create a new account
      setIsLoading(true)
      const enteredPass = passRef.current.value;
      const enteredConfirmPass = confirmPassRef.current.value;
      if (enteredPass !== enteredConfirmPass) {
        setIsLoading(false);
        return alert("Password must be same...");
      } else {
        const resp = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJO3nf1rN9288u3VAFDm0kC3eqhRSqPKc",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPass,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (resp.ok) {
          const data = await resp.json();
          console.log("user added successfully:", data);
          setIsLoading(false)
          alert("USER ADDED:", data);
        } else {
          setIsLoading(false)
          const data = resp.json();
          alert("Failed to add user", data);
        }
      }
    }
  };

  return (
    <>
      <div className="flex justify-center align-content-center mt-28">
        <div className=" bg-slate-100 p-8 rounded-lg shadow-md w-96 border border-gray-400">
          {!isLoading && <>
          <h1 className=" text-center text-2xl font-semibold">
            {isLogin ? "Login" : passChange ? "" : "Sign up"}
          </h1>
          <form data-testid="form" className="flex flex-col space-y-4" onSubmit={submitHandler}>
            <div>
              <label
                htmlhtmlFor="email"
                className="block text-sm font-medium text-gray-700"
                id="mail"
              >
                Email address
              </label>

              <input
                type="email"
                name="email"
                id="email"
                aria-labelledby="mail"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ref={emailRef}
                required
              />
            </div>

            {!passChange && (
              <div>
                <label
                  htmlhtmlFor="password"
                  id="pass"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  aria-labelledby="pass"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  ref={passRef}
                  required
                />
              </div>
            )}

            {!isLogin && !passChange ? (
              <div>
                <label
                  htmlFor="validatepassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="validatepassword"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  ref={confirmPassRef}
                  required
                />
              </div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="mt-4 w-full bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {isLogin && !passChange
                ? "Login"
                : passChange && !isLogin
                ? "Send Verification Link"
                : "Create Account"}
            </button>
            {isLogin && !passChange ? (
              <button onClick={togglePassChange}>
                <a
                  href="#"
                  className=" text-center text-base text-indigo-600 hover:underline"
                >
                  Forgot Password?
                </a>
              </button>
            ) : (
              ""
            )}
            <button onClick={createAccountHandler}>
              <a
                href="#"
                className="text-center text-base text-indigo-600 hover:underline"
              >
                {isLogin && !passChange
                  ? "Create a new account"
                  : "Login with existing account"}
              </a>
            </button>
          </form>
            </>}
            {isLoading && <SpinnerLoader/>}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
