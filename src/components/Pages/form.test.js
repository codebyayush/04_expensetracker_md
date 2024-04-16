import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";
import store from "../../Store";
import { Provider } from "react-redux";

describe("testing form page", () => {
 
  test("renders expense form component", () => {
    render(
      <Provider store={store}>
        <ExpenseForm expensesArr={[]} />
      </Provider>
    );
  });

  test("renders expense tracker title", () => {
    render(
      <Provider store={store}>
        <ExpenseForm expensesArr={[]} />
      </Provider>
    );
    const titleElement = screen.getByText("Expense Tracker");
    expect(titleElement).toBeInTheDocument();
  });

  test("displays input fields for amount", () => {
    render(
      <Provider store={store}>
        <ExpenseForm expensesArr={[]} />
      </Provider>
    );

    const amountInput = screen.getByLabelText("Spent Amount");
    expect(amountInput).toBeInTheDocument();
  });

  test("displays input fields for description", () => {
    render(
      <Provider store={store}>
        <ExpenseForm expensesArr={[]} />
      </Provider>
    );

    const descInput = screen.getByLabelText("Description");
    expect(descInput).toBeInTheDocument();
  });

  test("displays input field for category", () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const catInput = screen.getByLabelText("Category");
    expect(catInput).toBeInTheDocument();
  });

  test('renders "Add Expense" button when editButtonToggle is false', () => {
    const editButtonToggle = false;

    const { getByText } = render(
      <Provider store={store}>
        <ExpenseForm editButtonToggle={editButtonToggle} />
      </Provider>
    );

    const addExpenseButton = getByText("Add Expense");
    expect(addExpenseButton).toBeInTheDocument();
  });
  
});
