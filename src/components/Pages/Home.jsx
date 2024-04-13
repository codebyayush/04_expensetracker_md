import React, { useContext, useState } from "react";
import ProfileForm from "./ProfileForm";
import ExpenseForm from "./ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions, expenseActions, premiumActions } from "../../Store";

const Home = () => {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const darkModeToggle = useSelector(state => state.premium.darkModeToggle);
  const darkButton = useSelector(state => state.premium.darkButtonOpenClose);

  const dispatch = useDispatch()

  const darkModeHandler = () => {
    dispatch(premiumActions.darkModeToggler())
  }

  const logoutHandler = () => {
      dispatch(authActions.logOut())
  }

  const [toggleProfileForm, setToggleProfileForm] = useState(false);
  const [completeProfile, setProfile] = useState(false);
  const [expenseToggle, setToggleExpense] = useState(false);

  const onClickHandler = () => {
    setToggleProfileForm((prevState) => !prevState);
  };

  const expensePageHandler = () => {
      setToggleExpense((prevState) => !prevState);
  }

  const profileHandler = (bool) => {
        if(bool){
            setProfile(false);
        }else{
            setProfile(true);
        }
  };

  return (
    <>
      <div className=" italic m-3 flex justify-between">
        <h1 className={!darkModeToggle ? " font-medium self-center text-2xl" : "text-white font-medium self-center text-2xl"}>
          Winners never quit. Quitters never win.
        </h1>
        <div className="flex mt-2">
        <p className={!darkModeToggle ? " border-gray-400 bg-gray-200 p-1 rounded-3xl max-w-96": "text-white border-gray-700 bg-gray-700 p-1 rounded-3xl max-w-96"}>
          {!completeProfile && "Your profile is incomplete."}
          {completeProfile && (
            <div className={!darkModeToggle ? "font-medium" : "font-medium text-white"}>
              Your profile is <strong>64%</strong> completed. A complete profile
              has higher chances of landing a job.
            </div>
          )}
          <button className="italic text-red-500 " onClick={onClickHandler}>
            <a href="#">Complete now</a>
          </button>
        </p>
{darkButton && <button className="border border-purple-400 ms-5 p-1 rounded-md text-white font-medium italic bg-purple-400" onClick={darkModeHandler}>Dark Mode</button>}
        
          <button className="border border-purple-400 ms-5 p-1 rounded-md text-white font-medium italic bg-purple-400" onClick={expensePageHandler}>Expense</button>
          {isLoggedIn && (<button className="italic border rounded-lg p-2 font-medium mr-2 ms-5 text-white bg-red-400" onClick={logoutHandler}>logout</button>)}
        </div>
      </div>
      <hr className={!darkModeToggle ? "border border-gray-600" : "border border-blue-300"} />
      {toggleProfileForm && <ProfileForm handleProfile={() => profileHandler()}/>}
      {expenseToggle && <ExpenseForm/>}
    </>
  );
};

export default Home;
