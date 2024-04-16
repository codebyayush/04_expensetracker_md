import { render, screen, fireEvent } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import store from "../../Store";
import { Provider } from "react-redux";


describe("renders profile form page", () => {
    test("render cancel and logout", () => {
        render(
            <Provider store={store}>
                <ProfileForm/>
            </Provider>
        )

        const linkElement = screen.getByText("Cancel & logout", {exact: true});
        expect(linkElement).toBeInTheDocument
    })

    test("render form detail", () => {
        const {getByText, getByLabelText} = render(
            <Provider store={store}>
                <ProfileForm/>
            </Provider>
        )
  
        // Check if important elements are present
        const nameLabel = getByLabelText('Full name:');
        const urlLabel = getByLabelText('Profile photo url:');
        const updateButton = getByText('Update');
        const verifyEmailButton = getByText('Verify Email');
      
        expect(nameLabel).toBeInTheDocument();
        expect(urlLabel).toBeInTheDocument();
        expect(updateButton).toBeInTheDocument();
        expect(verifyEmailButton).toBeInTheDocument();
    })

    test("render component or not", () => {
        render(
            <Provider store={store}>
                <ProfileForm/>
            </Provider>
        )
    })
    
    test('render update button', () => {
        const { getByText } =  render(
            <Provider store={store}>
                <ProfileForm/>
            </Provider>
        )
        
        const updateElement  = screen.getByText('Update');
        expect(updateElement).toBeInTheDocument();
      });
})