import { render, screen, fireEvent } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import store from "../../Store";
import { Provider } from "react-redux";
import { expect } from '@jest/globals'


describe("renders profile form page", () => {
  test("render cancel and logout", () => {
    render(
      <Provider store={store}>
        <ProfileForm />
      </Provider>
    );

    const linkElement = screen.getByText("Cancel & logout", { exact: true });
    expect(linkElement).toBeInTheDocument;
  });

  test("render form detail", () => {
    const { getByText, getByLabelText } = render(
      <Provider store={store}>
        <ProfileForm />
      </Provider>
    );

    // Check if important elements are present
    const nameLabel = getByLabelText("Full name:");
    const urlLabel = getByLabelText("Profile photo url:");
    const updateButton = getByText("Update");
    const verifyEmailButton = getByText("Verify Email");

    expect(nameLabel).toBeInTheDocument();
    expect(urlLabel).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
    expect(verifyEmailButton).toBeInTheDocument();
  });

  test("renders component", () => {
    render(
      <Provider store={store}>
        <ProfileForm />
      </Provider>
    );
  });

  test("render update button", () => {
    render(
      <Provider store={store}>
        <ProfileForm />
      </Provider>
    );

    const updateElement = screen.getByText("Update");
    expect(updateElement).toBeInTheDocument();
  });

  test("check placeholder", () => {
    render(
      <Provider store={store}>
        <ProfileForm />
      </Provider>
    );

    const inputPlaceHolder = screen.getByPlaceholderText(/enter photo url/i)
    const inputPlaceHolderName = screen.getByPlaceholderText(/enter full name/i)
    expect(inputPlaceHolder).toBeInTheDocument();
    expect(inputPlaceHolderName).toBeInTheDocument();
  })

  //toHaveAttribute
  test('check name attribute type', () => {
      render(
        <Provider store={store}>
          <ProfileForm/>
        </Provider>
      )

      const elementName = screen.getByTestId('namebox');
      expect(elementName).toHaveAttribute('type', 'text')
    })

  //fireEvent
  test('update (submit) button click', () => {
    //Arrange
    render(
      <Provider store={store}>
        <ProfileForm/>
      </Provider>
    )

    //Act
    const updateButton = screen.getByTestId('submit');
    fireEvent.click(updateButton);

    //Assert
    const inputField = screen.getByTestId('namebox');
    expect(inputField.value).toBe('');
  })
});
