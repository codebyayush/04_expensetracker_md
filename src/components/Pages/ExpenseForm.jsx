import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store";

const ExpenseForm = () => {

  const dispatch = useDispatch();
  const expensesArr = useSelector(state => state.expenses.expenseCart)
  const totalAmount = useSelector(state => state.expenses.totalAmount);

  const amountRef = useRef();
  const descRef = useRef();
  const catRef = useRef();
  const [editButtonToggle, setEditButton] = useState(false);

  console.log("expense on mounting",expensesArr)

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
          `https://expense-tracker-481f2-default-rtdb.firebaseio.com/:cartItems.json`
        );
  
        if (resp.ok) {
          const data = await resp.json();
          console.log("data", data);
  
          for (const [key, values] of Object.entries(data)) {
            const id = key;
            values.id = id;
            dispatch(expenseActions.addExpense(values))
          }

        } else {
          const data = resp.json();
          console.log("ERROR FETCHING", data.error.message);
        }

        dispatch(expenseActions.totalExpense());

  }
    fetchData()
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredAmount = amountRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredCategory = catRef.current.value;

    if (enteredAmount === "" || enteredDesc === "" || enteredCategory === "") {
      return;
    } else {
      const key = Math.random();

      const resp = await fetch(
        `https://expense-tracker-481f2-default-rtdb.firebaseio.com/:cartItems.json`,
        {
          method: "POST",
          body: JSON.stringify({
            key: key,
            amount: enteredAmount,
            desc: enteredDesc,
            category: enteredCategory,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        const id = data.name;
        console.log("id data", id);
        const newdata = {
          id: `${id}`,
          key: key,
          amount: enteredAmount,
          desc: enteredDesc,
          category: enteredCategory,
        };
        
        dispatch(expenseActions.addExpense(newdata))
        dispatch(expenseActions.totalExpense());
      } else {
        const error = await resp.json();
        console.log("ERROR ADDING", error);
      }
    }

    amountRef.current.value = "";
    descRef.current.value = "";
    catRef.current.value = "";
  };

  const putRequestHandler = async (e) => {
    e.preventDefault();

    const enteredAmount = amountRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredCategory = catRef.current.value;

    const id = localStorage.getItem("editId");
    const key = Math.random();

    const newObj = {
      key: key,
      amount: enteredAmount,
      desc: enteredDesc,
      category: enteredCategory,
    };

    const resp = await fetch(
      `https://expense-tracker-481f2-default-rtdb.firebaseio.com/:cartItems/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(newObj),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resp.ok) {
      const data = await resp.json();
      console.log("EDITED SUCCESSFULLY", data);
      setEditButton(false);
      const newdata = {
        id: `${id}`,
        key: key,
        amount: enteredAmount,
        desc: enteredDesc,
        category: enteredCategory,
      };
      dispatch(expenseActions.addExpense(newdata))
      dispatch(expenseActions.totalExpense());
    } else {
      const error = await resp.json();
      console.log("ERROR ", error);
      setEditButton(false);
    }

    localStorage.removeItem("editId");

    amountRef.current.value = "";
    descRef.current.value = "";
    catRef.current.value = "";
  };

  const editHandler = (amount, desc, category, id) => {
    dispatch(expenseActions.removeExpense(id))

    amountRef.current.value = amount;
    descRef.current.value = desc;
    catRef.current.value = category;

    setEditButton(true);
    dispatch(expenseActions.totalExpense());


    localStorage.setItem("editId", id);
  };

  const deleteHandler = async (id) => {
    const resp = await fetch(
      `https://expense-tracker-481f2-default-rtdb.firebaseio.com/:cartItems/${id}.json`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resp.ok) {
      console.log("EXPENSE SUCCESSFULLY DELETED");
      dispatch(expenseActions.removeExpense(id));
      dispatch(expenseActions.totalExpense());
    } else {
      const error = resp.json();
      console.log("Delete request failed", error);
    }
  };

  return (
    <>
    <div className=" flex justify-end">
      <div className=" m-1  w-2/3 border border-black">
        <h1 className="m-2 italic text-center font-medium text-3xl mr-80 text-purple-700 ">
          Expense Tracker
        </h1>
        <form onSubmit={submitHandler}>
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
              required
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
              required
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
              required
            >
              <option value="food">Food</option>
              <option value="fuel">Fuel</option>
              <option value="grocery">Grocery</option>
              <option value="other">Other</option>
            </select>
          </div>
          {!editButtonToggle && (
            <button
              type="submit"
              className="mt-3 w-2/3 border border-red-400 p-1 bg-red-400 text-white rounded-md font-medium"
            >
              Add Expense
            </button>
          )}
        </form>
        {editButtonToggle && (
          <button
            onClick={putRequestHandler}
            className="mt-3 w-2/3 border border-red-400 p-1 bg-red-400 text-white rounded-md font-medium"
          >
            Edit Expense
          </button>
        )}
        <hr className="w-2/3 border mt-3 border-gray-500" />
        <div>
          {expensesArr.map((item) => {
            return (
              <>
                <div className="flex justify-between mr-96">
                  <div className="m-3 ">
                    <h1 className="flex font-medium">
                      Amount: &nbsp;
                      <p className="text-red-500">{item.amount}</p>
                    </h1>

                    <h1 className="flex font-medium">
                      Description: &nbsp;
                      <p className="text-red-500">{item.desc}</p>
                    </h1>
                    <h1 className="flex font-medium">
                      Category: &nbsp;
                      <p className="text-red-500">{item.category}</p>
                    </h1>
                  </div>
                  <div className="mt-4 mb-2 -mr-7">
                    <button
                      onClick={() =>
                        editHandler(
                          item.amount,
                          item.desc,
                          item.category,
                          item.id
                        )
                      }
                      className=" p-2 rounded-md text-white bg-red-400 w-20 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteHandler(item.id)}
                      className=" p-2 rounded-md text-white bg-red-700 ms-1 w-20 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <hr className="w-2/3 border border-gray-500" />
              </>
            );
          })}
        </div>
        <div className="flex justify-between">
          {totalAmount >= 10000 && <button className="text-lg italic text-white font-medium p-2 bg-purple-700 rounded-md m-1">Activate Premium</button>}
          <h1 className="text-2xl font-medium italic mt-2 mb-2 ms-2 mr-96">Expense Total: {totalAmount}</h1>
        </div>
      </div>
    </div>
    </>
  );
};

export default ExpenseForm;