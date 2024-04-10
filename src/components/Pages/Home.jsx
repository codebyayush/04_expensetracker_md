import React, { useState } from "react";
import ProfileForm from "./ProfileForm";

const Home = (props) => {
  const [toggleProfileForm, setToggleProfileForm] = useState(false);
  const [completeProfile, setProfile] = useState(false);

  const onClickHandler = () => {
    setToggleProfileForm((prevState) => !prevState);
  };

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
        <h1 className=" font-medium self-center">
          Winners never quit. Quitters never win.
        </h1>
        <p className=" border-gray-400 bg-gray-200 p-1 rounded-3xl">
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
      </div>
      <hr className="border border-gray-600" />
      {toggleProfileForm && <ProfileForm handleProfile={() => profileHandler()}/>}
    </>
  );
};

export default Home;
