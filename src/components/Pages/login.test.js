import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./Login";
import store from "../../Store";
import { Provider } from "react-redux";

describe("renders login page", () => {
  test("renders login page", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    const linkElement = screen.getByText(/email/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders login for create account", () => {
    //Arrange
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    //Assert
    const passwordElement = screen.getByText(/create a new account/i, { exact: false });
    expect(passwordElement).toBeInTheDocument();
  });

  test("renders login button with correct text", () => {
    //Arrange
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    //Assert
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();
  });

  test("checks if there is form", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const formCheck = screen.getByTestId("form");
    expect(formCheck).toBeInTheDocument();
  });

  test("validates password field is required during login", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    expect(screen.getByLabelText(/Password/i)).toBeRequired();
  });

  test("validates email field is required during login", () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeRequired();
  });

  test("button text changes on click", () => {
     const {getByText} = render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    // Initially "Create a new account"
    const button = getByText(/Create a new account/i);
    expect(button).toBeInTheDocument();

    // Simulate a click on the button
    fireEvent.click(button);

    // After the click "Login with existing account"
    const updatedButton = getByText(/Login with existing account/i);
    expect(updatedButton).toBeInTheDocument();
  });

});