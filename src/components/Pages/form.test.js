import { render, screen } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";
import store from "../../Store";
import { Provider } from "react-redux";

describe("testing form page", () => {
  test("renders expense tracker title", () => {
    render(
      <Provider store={store}>
        <ExpenseForm expensesArr={[]} />
      </Provider>
    );
    const titleElement = screen.getByText("Expense Tracker");
    expect(titleElement).toBeInTheDocument();
  });

  test("displays input fields for amount, description, and category", () => {
    render(
      <Provider store={store}>
        <ExpenseForm expensesArr={[]} />
      </Provider>
    );
    const amountInput = screen.getByLabelText("Spent Amount");
    const descInput = screen.getByLabelText("Description");
    const categorySelect = screen.getByLabelText("Category");
    expect(amountInput).toBeInTheDocument();
    expect(descInput).toBeInTheDocument();
    expect(categorySelect).toBeInTheDocument();
  });
  
});
