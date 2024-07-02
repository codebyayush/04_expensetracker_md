import React, { useRef, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { IoGlobeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store";


const ProfileForm = (props) => {

  const dispatch = useDispatch();
  const darkModeToggle = useSelector((state) => state.premium.darkModeToggle);


  const logoutHandler = () => {
      dispatch(authActions.logOut())
  }

  const nameRef = useRef();
  const urlRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const resp = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCJO3nf1rN9288u3VAFDm0kC3eqhRSqPKc",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        console.log("fetched data", data);

        const userArr = data.users;

        userArr.map((item) => {
          nameRef.current.value = item.displayName;
          urlRef.current.value = item.photoUrl;
        });

        props.handleProfile(true);
      } else {
        const data = await resp.json();
        console.error("ERROR FETCHING DATA", data);
      }
    };
    fetchData();
  }, []);

  const verifyEmailHandler = async () => {
    const token = localStorage.getItem("token");

    try {
      const resp = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCJO3nf1rN9288u3VAFDm0kC3eqhRSqPKc",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      
      if (resp.ok) {
        const data = await resp.json();
        console.log("VERIFICATION MAIL SENT TO: ", data.email);
        alert("VERIFICATION MAIL SENT");
      } else {
        const data = await resp.json();
        console.log("FAILED TO SENT CODE", data.error.message);
      }
    } catch (error) {
        console.error("ERROR SENDING MAIL:", error)
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredUrl = urlRef.current.value;

    const token = localStorage.getItem("token");

    const resp = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCJO3nf1rN9288u3VAFDm0kC3eqhRSqPKc",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          displayName: enteredName,
          photoUrl: enteredUrl,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resp.ok) {
      const data = await resp.json();
      console.log("profile updated: ", data);
    } else {
      const data = await resp.json();
      console.log("ERROR: ", data);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <div className=" mt-10 w-2/3 mr-4">
          <div className="m-2 flex justify-between text-xl font-medium">
            <h1>Contact Details</h1>
            <button
              className=" border border-red-300 rounded-md p-1 font-medium "
              onClick={logoutHandler}
            >
              Cancel & logout
            </button>
          </div>
          <div className="mt-5">
            <form onSubmit={submitHandler}>
              <div className="flex">
                <FaGithub className="size-7" />
                <div className="flex-1 flex items-center">
                  <label
                    htmlFor="name"
                    className={`${darkModeToggle ? "font-medium text-white-700" : "font-medium text-gray-700"}`}
                  >
                    Full name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    data-testid="namebox"
                    placeholder="Enter full name"
                    className={`${darkModeToggle ? "flex-1 bg-gray-800 border border-gray-500 rounded-md ml-2 p-1" : "flex-1 bg-white border border-gray-500 rounded-md ml-2 p-1"}`}
                    ref={nameRef}
                    required
                  />
                </div>

                <IoGlobeSharp className="size-7" />
                <div className="flex-1 flex items-center">
              <label htmlFor="url" className={`${darkModeToggle ? "font-medium text-white-700" : "font-medium text-gray-700"}`}>
                    Profile photo url:
                  </label>
                  <input
                    type="text"
                    name="url"
                    id="url"
                    placeholder="Enter photo url"
                    className={`${darkModeToggle ? "flex-1 bg-gray-800 border border-gray-500 rounded-md ml-2 p-1" : "flex-1 bg-white border border-gray-500 rounded-md ml-2 p-1"}`}
                    ref={urlRef}
                    required
                  />
                </div>
              </div>
              <button
                data-testid="submit"
                type="submit"
                className="mt-5 m-1 bg-red-500 text-white border border-red-500 rounded-md p-1 font-medium "
              >
                Update
              </button>
              <button
                onClick={verifyEmailHandler}
                className="italic me-4 border border-red-400 ms-4 rounded-md p-1 bg-red-400 font-medium text-white"
              >
                Verify Email
              </button>
            </form>
          </div>

          <hr className="border border-gray-400 mt-3"/>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;