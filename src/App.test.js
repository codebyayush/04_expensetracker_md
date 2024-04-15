import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/index.js';

    test('renders app page', () => {
        render(
          <Provider store={store}>
            <App />
          </Provider>
        );
        const linkElement = screen.getByText(/welcome/i);
        expect(linkElement).toBeInTheDocument();
      });

