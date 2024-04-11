import React, { useContext, useState } from "react";
import ProfileForm from "./ProfileForm";
import ItemContext from "../../Store/ItemContext";
import ExpenseForm from "./ExpenseForm";

const Home = (props) => {
  const ctx = useContext(ItemContext);
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
        <h1 className=" font-medium self-center text-2xl">
          Winners never quit. Quitters never win.
        </h1>
        <div className="flex">
        <p className=" border-gray-400 bg-gray-200 p-1 rounded-3xl max-w-96">
          {!completeProfile && "Your profile is incomplete."}
          {completeProfile && (
            <>
              Your profile is <strong>64%</strong> completed. A complete profile
              has higher chances of landing a job.
            </>
          )}
          <button className="italic text-red-500 " onClick={onClickHandler}>
            <a href="#">Complete now</a>
          </button>
        </p>
          {}
          <button className="border border-purple-400 ms-5 p-1 rounded-md text-white font-medium italic bg-purple-400" onClick={expensePageHandler}>Expense</button>
          {ctx.isLoggedIn && (<button className="italic border rounded-lg p-2 font-medium mr-2 ms-5 text-white bg-red-400" onClick={ctx.logoutHandler}>logout</button>)}
        </div>
      </div>
      <hr className="border border-gray-600" />
      {toggleProfileForm && <ProfileForm handleProfile={() => profileHandler()}/>}
      {expenseToggle && <ExpenseForm/>}
    </>
  );
};

export default Home;
