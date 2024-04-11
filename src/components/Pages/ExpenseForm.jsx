import React, { useRef, useState } from "react";

const ExpenseForm = () => {
  const amountRef = useRef();
  const descRef = useRef();
  const catRef = useRef();
  const [expenseCart, setExpense] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredCategory = catRef.current.value;

    if (enteredAmount === "" || enteredDesc === "" || enteredCategory === "") {
      return;
    } else {
      const expenseObj = {
        amount: enteredAmount,
        desc: enteredDesc,
        category: enteredCategory,
      };

      setExpense((prevState) => [...prevState, expenseObj]);
    }

        amountRef.current.value = "",
      descRef.current.value = "",
      catRef.current.value = "";
  };

  return (
    <div className=" flex justify-end">
      <div className=" m-1  w-2/3">
        <h1 className="m-2 italic text-center font-medium text-3xl mr-80 text-purple-700 ">
          Expense Tracker
        </h1>
        <form className="m-2" onSubmit={submitHandler}>
          <div className="">
            <label htmlFor="money" className="font-medium">
              Spent Amount
            </label>
            <br />
            <input
              type="number"
              id="money"
              className="w-2/3 border border-gray-400 rounded-md p-1"
              ref={amountRef}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="desc" className="font-medium">
              Description
            </label>
            <br />
            <textarea
              type="text"
              id="desc"
              className="w-2/3 border border-gray-400 rounded-md p-1"
              ref={descRef}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <br />
            <select
              name="category"
              id="category"
              className="w-2/3 border border-gray-400 rounded-md"
              ref={catRef}
            >
              <option value="food">Food</option>
              <option value="fuel">Fuel</option>
              <option value="grocery">Grocery</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-3 w-2/3 border border-red-400 p-1 bg-red-400 text-white rounded-md font-medium"
          >
            Add Expense
          </button>
          <hr className="w-2/3 border mt-3 border-gray-500" />
        </form>
        <div>
          {expenseCart.map((item) => {
            return (
              <>
                <div className="m-3">
                  <h1 className="flex font-medium">
                    Amount: &nbsp;<p className="text-red-500">{item.amount}</p>
                  </h1>
                  
                  <h1 className="flex font-medium">
                    Description: &nbsp;<p className="text-red-500">{item.desc}</p>
                  </h1>
                  <h1 className="flex font-medium">
                    Category: &nbsp;<p className="text-red-500">{item.category}</p>
                  </h1>
                    <hr className="w-2/3 border mt-3 border-gray-500" />      
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
