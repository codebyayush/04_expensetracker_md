import { render, screen } from '@testing-library/react';
import LoginPage from './Login';
import store from '../../Store';
import { Provider } from 'react-redux';


describe("renders login page", () => {

    test("renders login page", () => {
        render(
            <Provider store={store}>
                <LoginPage/>
            </Provider>
        )
    
        const linkElement = screen.getByText(/email/i);
        expect(linkElement).toBeInTheDocument();
    
    })

    test("renders login for create account", () => {
        //Arrange
        render(
            <Provider store={store}>
                <LoginPage/>
            </Provider>
        )
        //Assert
        const passwordElement = screen.getByText(/create/i, {exact: false});
        expect(passwordElement).toBeInTheDocument();
    })

    test('renders login button with correct text', () => {
        //Arrange
        render(
            <Provider store={store}>
                <LoginPage/>
            </Provider>
        )  

        //Assert
        const loginButton = screen.getByRole('button', { name: 'Login' });
        expect(loginButton).toBeInTheDocument();
    })  

})

