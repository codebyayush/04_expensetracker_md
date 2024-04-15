import { render, screen } from '@testing-library/react';
import LoginPage from './Login';
import store from '../../Store';
import { Provider } from 'react-redux';



test("renders login page", () => {
    render(
        <Provider store={store}>
            <LoginPage/>
        </Provider>
    )
    
    const linkElement = screen.getByText(/email/i);
    expect(linkElement).toBeInTheDocument();

})