import { render, screen } from "@testing-library/react";
import Home from "./Home";
import store from "../../Store";
import { Provider } from "react-redux";

describe("renders home elements", () => {
  test("renders motivational quote", () => {
    render(
      <Provider store={store}>
        <Home darkModeToggle={false} />
      </Provider>
    );
    const quoteElement = screen.getByText(
      "Winners never quit. Quitters never win."
    );
    expect(quoteElement).toBeInTheDocument();
  });

  test("renders incomplete profile message if completeProfile is false", () => {
    render(
      <Provider store={store}>
        <Home darkModeToggle={false} completeProfile={false} />
      </Provider>
    );
    const incompleteProfileMessage = screen.getByText(
      "Your profile is incomplete."
    );
    expect(incompleteProfileMessage).toBeInTheDocument();
  });

  test('does not render "Dark Mode" button if darkButton is false', () => {
    render(
      <Provider store={store}>
        <Home darkModeToggle={false} darkButton={false} />
      </Provider>
    );
    const darkModeButton = screen.queryByText("Dark Mode");
    expect(darkModeButton).not.toBeInTheDocument();
  });

  test('does not render "Dark Mode" button if darkButton is false', () => {
    render(
      <Provider store={store}>
        <Home darkModeToggle={false} darkButton={false} />
      </Provider>
    );
    const darkModeButton = screen.queryByText("Dark Mode");
    expect(darkModeButton).not.toBeInTheDocument();
  });
});
