import React, { useContext, useRef, useState } from "react";
import ItemContext from "../../Store/ItemContext";

const loginPage = () => {
    const ctx = useContext(ItemContext)

  const [isLogin, setIslogin] = useState(true);
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;

    if (isLogin) {
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
        const data = await resp.json();
        console.log("Logged in successfully:", data);
        ctx.loginHandler(data.idToken);
      } else {
        const data = await resp.json();
        console.log("Error fetching data", data.error.message);
        alert("ERROR:", data.error.message);
      }
    } else {
      //create a new account
      const enteredConfirmPass = confirmPassRef.current.value;
      if (enteredPass !== enteredConfirmPass) {
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
          alert("USER ADDED:", data);
        } else {
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
          <h1 className=" text-center text-2xl font-semibold">
            {isLogin ? "Login" : "Sign up"}
          </h1>
          <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
            <div>
              <label
                for="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ref={emailRef}
                required
              />
            </div>

            <div>
              <label
                for="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ref={passRef}
                required
              />
            </div>

            {!isLogin ? (
              <div>
                <label
                  for="validatepassword"
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
              {isLogin ? "Login" : "Create Account"}
            </button>
            <button onClick={() => setIslogin((prevState) => !prevState)}>
              <a
                href="#"
                className="text-center text-sm text-indigo-600 hover:underline"
              >
                {isLogin
                  ? "Create a new account"
                  : "Login with existing account"}
              </a>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default loginPage;
